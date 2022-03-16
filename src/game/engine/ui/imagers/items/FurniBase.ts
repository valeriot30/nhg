import {
    IFurnidata
} from "../../../../core/objects/furni/IFurnidata"
import {
    ILayer
} from "../../../../core/objects/ILayer"
import {
    ISpritesheet
} from "../../../../core/objects/ISpritesheet"
import {
    fetchJsonAsync
} from "../../../../utils/DownloadManager"
import Engine from "../../../../Engine"
import Sprite from "../../../../utils/Sprite"
import * as PIXI from "pixi.js"
import { Dictionary } from "vue-router/types/router"

export default class FurniBase {
    private _data: IFurnidata
    private _spritesheetData: ISpritesheet | null
    private spritesheet: Promise<PIXI.Texture> | null
    private ready: boolean = false
    private loader: PIXI.Loader;

    constructor(data: IFurnidata) {

        this._data = data;
        this._spritesheetData = null;
        this.spritesheet = null;
        this.loader = new PIXI.Loader();
    }

    public init(): Promise<any> {

        return Promise.all([
            new Promise((res, rej) => {
                //console.log(this.data);
                fetchJsonAsync(Engine.getInstance().getConfig().proxyUrl + Engine.getInstance().getConfig().itemsResourcesUrl + this.data.name + '/' + this.data.name + '_spritesheet.json').then(data => {
                    this._spritesheetData = data as ISpritesheet
                    //console.log(this._spritesheetData);
                    res(data);
                }).catch(err => rej(err))

            })
        ])

    }

    public downloadSpritesheet(): Promise<PIXI.Texture> {

        let loader = new PIXI.Loader();
        let configUrl = Engine.getInstance().getConfig().proxyUrl + Engine.getInstance().getConfig().itemsResourcesUrl + this.data.name + '/' + this.data.name + '.png';

        loader.add(configUrl);

        if (this.spritesheet != undefined) {
            return Promise.resolve(this.spritesheet);
        }

        let texture: Promise<PIXI.Texture> = new Promise((resolve, reject) => {

            loader.load((loader: PIXI.Loader) => {
                let texture = PIXI.Texture.from(loader.resources[configUrl].data);
                resolve(texture);
            })
        })

        this.spritesheet = texture;


        return texture;

    }

    public updateSpriteFrom(sprite: PIXI.Sprite, layer: ILayer): PIXI.Sprite {

        if (layer) {
            if (layer.ink === 'ADD') {
                sprite.blendMode = PIXI.BLEND_MODES.ADD;
            }
        }

        return sprite;

    }

    public getAvailableDirections(): number[] {

        const directions: number[] = [];
        const rawDirections = this.directions;

        for (let direction in rawDirections) {
            directions.push((parseInt(direction) % rawDirections.length) * 2)
        }

        return directions;
    }


    public hasDirection(direction: number): boolean {
        direction = direction / 90 * 2
        return this.data.directions.indexOf(direction) >= 0
    }

    public hasAnimations(): boolean {
        return this.data.visualization.animations != null
    }

    public hasAnimation(animation: number): boolean {
        return this.hasAnimations() && this.data.visualization.animations![animation] != null
    }

    public hasAnimationForLayer(animation: number, layer: number): boolean {
        return this.hasAnimation(animation) && this.data.visualization.animations![animation].layers[layer] != null
    }

    public getAnimations(): string[] {
        return Object.keys(this.data.visualization.animations!)
    }

    public getFrameFromAsset(assetName: string): any {

        let frameName = this._spritesheetData!.frames[this.data.name + "_" + assetName + ".png"]

        if (frameName == undefined) {
            frameName = this._spritesheetData!.frames[assetName + ".png"]
        }

        return frameName;

    }

    public getSprite(texture: PIXI.Texture, framePart: any): PIXI.Sprite {
        texture = new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(framePart.frame.x + 0.5, framePart.frame.y - 1, framePart.frame.w + 1, framePart.frame.h + 1))
        let sprite = new PIXI.Sprite(texture);
        return sprite;
    }

    public getFrameFrom(animation: number, layer: number, frameCount: number): number {
        if (this.hasAnimationForLayer(animation, layer)) {
            let animationLayer = this.data.visualization.animations![animation].layers[layer];

            if (animationLayer.frameSequences == null || (animationLayer.frameSequences as []).length < 1) {
                return 0;
            }

            let frameRepeat = animationLayer.frameRepeat || 1;

            let frameIndex = Math.floor((frameCount % (Object.keys(animationLayer.frameSequences[0].frames).length * frameRepeat)) / frameRepeat);

            return animationLayer.frameSequences[0].frames[Object.keys(animationLayer.frameSequences[0].frames)[frameIndex]].id
        }

        return 0;
    }

    public hasColors(): boolean {
        return this.data.visualization.colors != null;
    }

    public hasColor(color: number): boolean {
        return this.hasColors() &&
            this.data.visualization.colors![color] != null;
    }

    public hasColorForLayer(color: number, layer: number): boolean {
        return this.hasColor(color) &&
            this.data.visualization.colors![color].layers[layer] != null;
    }

    public getColorFrom(color: number, layer: number): number {
        if (this.hasColorForLayer(color, layer)) {
            return this.data.visualization.colors![color].layers[layer].color;
        }

        return 0xFFFFFF;
    }

    public getColors(): string[] {
        return Object.keys(this.data.visualization.colors!);
    }

    private layerFromNumber(layer: number): string {
        return String.fromCharCode(layer + 97); // a
    }

    public assetNameFrom(size: number | string, layer: number, direction?: number, frame?: number): string {
        let layerChar = this.layerFromNumber(layer);

        if (size == 1) {
            return this.data.name + "_icon_" + layerChar
        }

        let assetName = this.data.name + "_" + size + "_" + layerChar;
        if (direction != null && frame != null) {
            assetName += "_" + direction + "_" + frame;
        }

        return assetName;
    }

    private hasAsset(assetName: string) {
        return this.data.assets[assetName] != null;
    }

    public hasLayers(): boolean {
        return this.data.visualization.layers != null;
    }

    public hasLayer(layer: number): boolean {
        return this.hasLayers() &&
            this.data.visualization.layers![layer] != null;
    }

    public hasVisualDirections(): boolean {
        return this.data.visualization.directions != null;
    }

    public hasVisualDirection(direction: number): boolean {
        return this.hasVisualDirections() &&
            this.data.visualization.directions![direction] != null;
    }

    public hasVisualDirectionLayer(direction: number, layer: number): boolean {
        if (this.hasVisualDirection(direction) && this.data.visualization.directions![direction]) {
            if (this.data.visualization.directions![direction].layers != null && this.data.visualization.directions![direction].layers[layer] != null) {
                return true
            }
        }

        return false
    }

    public isAssetFlipped(size: number | string, layer: number, direction?: number, frame?: number): boolean | null {
        let assetName = this.assetNameFrom(size, layer, direction, frame);

        if (this.hasAsset(assetName)) {
            let asset = this.data.assets[assetName]
            if (asset && asset.flipH != null) {
                return asset.flipH
            }
        }

        return null
    }

    public get LogicType() {
        return this.data.logicType;
    }

    public get visualizationType(): string {
        return this.data.visualizationType
    }

    public getSpriteSheetData() {
        return this._spritesheetData;
    }

    public get data() {
        return this._data;
    }
    public get layercount() {
        return this.data.visualization.layerCount;
    }

    public get angle(): number {
        return this.data.visualization.angle;
    }

    public get directions(): number[] {
        return this.data.directions.map((direction) => direction / 90 * 2)
    }
}