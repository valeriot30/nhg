import FurniBase from "./FurniBase"
import {
    fetchJsonAsync
} from "../../../../utils/DownloadManager"
import Engine from "../../../../Engine"
import {
    IFurnidata
} from "../../../../core/objects/furni/IFurnidata"
import {
    Furnidata
} from "./Furnidata"
import {
    FurniSprite
} from "./FurniSprite"

export default class FurniImager {

    public static DEFAULT_SIZE: number = 64;
    public static LOADING_ALPHA: number = 0.6;

    private ready: boolean
    private bases: {
        flooritem: {
            [id: string]: Promise<FurniBase>
        },
        wallitem: {
            [id: string]: Promise<FurniBase>
        }
    }
    private furnidata: Furnidata

    constructor() {
        this.ready = false;
        this.bases = {
            flooritem: {},
            wallitem: {}
        };
        this.furnidata = {
            roomitemtypes: {},
            wallitemtypes: {}
        };
    }

    public async init(): Promise<void> {
        await Promise.all(this.loadFiles())
    }

    private loadFiles(): Promise<void>[] {
        return [
            fetchJsonAsync(Engine.getInstance().getConfig().itemsResourcesUrl + "furnidata.json")
                .then(data => {
                    this.furnidata = data as Furnidata;
                    this.ready = true;
                })
                .catch(err => {
                    if (Engine.getInstance().getConfig().debug) {
                        Engine.getInstance().getLogger().error("Cannot load furnidata")
                    }
                    this.ready = false;
                }),
        ];
    }

    public findItemByName(itemName: string) {

        for (let itemId in this.furnidata.roomitemtypes) {
            const item = this.furnidata.roomitemtypes[itemId];
            //console.log(item);  
            if (item.className === itemName) {
                return {
                    item,
                    type: 'roomitemtypes'
                };
            }
        }

        for (let itemId in this.furnidata.wallitemtypes) {
            const item = this.furnidata.wallitemtypes[itemId];
            if (item.className === itemName) {
                return {
                    item,
                    type: 'wallitemtypes'
                };
            }
        }
        return null;
    }

    private loadFurniBase(type: ItemType, furniBaseName: string): Promise<FurniBase> {

        let rawItem = this.findItemByName(furniBaseName);

        if (rawItem == null) {
            return new Promise((_resolve, reject) => {
                reject('invalid furniBaseName ' + furniBaseName);
            });
        }

        const rawItemName = rawItem.item.className;

        const {
            itemName,
            colorId
        } = splitItemNameAndColor(rawItemName);

        if (this.bases[type][itemName] == null) {
            this.bases[type][itemName] = new Promise((resolve, _reject) => {
                //Load furni json
                this.fetchOffsetAsync(itemName).then((data) => {
                    const furniBase = new FurniBase(data as IFurnidata, itemName)
                    furniBase.init()
                    resolve(furniBase);
                })
            })
        }

        return this.bases[type][itemName]
    }

    public loadFurniSprite(type: ItemType, name: string): Promise<FurniSprite> {
        const {
            colorId
        } = splitItemNameAndColor(name);

        return new Promise((res, _rej) => {
            this.loadFurniBase(type, name).then((furnibase) => {
                //console.log(furnibase)
                const furniSprite = new FurniSprite(furnibase);
                res(furniSprite);
            })
        })
    }

    public loadFurniIcon(type: ItemType, name: string): Promise<FurniSprite> {
        const {
            colorId
        } = splitItemNameAndColor(name);

        return new Promise((res, _rej) => {
            this.loadFurniBase(type, name).then((furnibase) => {
                const furniSprite = new FurniSprite(furnibase, true)

                res(furniSprite);
            })
        })
    }


    private fetchOffsetAsync(uniqueName: string) {
        //console.log("downloading .." + Engine.getInstance().getConfig().proxyUrl + Engine.getInstance().getConfig().itemsResourcesUrl + uniqueName + '/' + uniqueName + '.json');
        return new Promise((resolve, reject) => {
            fetchJsonAsync(Engine.getInstance().getConfig().itemsResourcesUrl + uniqueName + '/' + uniqueName + '.json').then(data => {
                resolve(data);
            }).catch(err => reject(err));
        });
    }

    public get isReady(): boolean {
        return this.ready
    }

    public getFurnidata(): Furnidata {
        return this.furnidata
    }
}

export enum ItemType {
    FloorItem = 'flooritem', WallItem = 'wallitem'
}

export interface NameColorPair {
    itemName: string, colorId: number
}

export const splitItemNameAndColor = (itemName: string): NameColorPair => {
    let colorId = 0;
    if (itemName.includes("*")) {
        const longFurniName = itemName.split("*");
        itemName = longFurniName[0];
        colorId = parseInt(longFurniName[1]);
    }
    return {
        itemName,
        colorId
    }
}