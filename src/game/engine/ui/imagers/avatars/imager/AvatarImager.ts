import { BaseTexture, IPoint, Rectangle, Sprite, Texture } from "pixi.js";
import * as PIXI from "pixi.js"
import Avatar, { ActionId, FigurePart } from "../Avatar";
import { Direction } from "../Direction";
import AvatarImageData from "./AvatarImageData";
import AvatarSpriteComponent from "./AvatarSpriteComponent";
import { Action } from "./gamedata/AvatarActions";
import { Animation, AnimationFrame, BodyPart, OffsetDirection, OffsetFrame, Part } from "./gamedata/AvatarAnimatons";
import { Canvas, GeometryElement } from "./gamedata/AvatarGeometry";
import FigureData from "./gamedata/FigureData";
import { IPart } from "./IPart";
import { Asset, OffsetResource, Spritesheet } from "./AvatarResource";
import Engine from "../../../../../Engine";
import PartSets from "./AvatarPartSets";

export type FigureDataComponent = {
    index: number;
    id: number;
    colorable: boolean;
    color: string | null;
    type: string;
};

export type FigureDataPart = {
    components: FigureDataComponent[]
    hidden: string[]
}

export default class AvatarImager {

    private data: AvatarImageData;

    private geometryWidth: number = 0;
    private geometryHeight: number = 0;

    private loader: PIXI.Loader;

    private loaded: boolean = false;

    private parts: any;

    private textures: Map<string, Promise<PIXI.Texture>>

    constructor() {
        this.data = new AvatarImageData();
        this.loader = new PIXI.Loader();
        this.textures = new Map();
    }

    public async loadAvatar(avatar: Avatar) {

        this.decideGeometry(avatar);

        for(let part of avatar.Look) {
            //console.log(part)
            const figurePart = this.getFigureDataPart(part);
        
            if(!figurePart) {
                return;
            }

            //onsole.log(figurePart.components)

            const assets: Set<string> = this.getAssets(figurePart.components);
            
            for(let asset of assets) {
                await this.data.loadPart(asset);
            }
        }

    }

    private getAssets(fdParts: FigureDataComponent[] | undefined): Set<string> {
        const assets = new Set<string>()

        fdParts?.forEach(component => {

            let assetName = this.getAssetName(component)

            if (assetName)
                assets.add(assetName)
        })

        return assets
    }

    private getPartSet(type: string) {
        return this.data.avatarPartSets?.partSets.partSet.find(partSet => partSet.setType == type)
    }

    public drawAvatar(avatar: Avatar) {
        //console.log(avatar.Actions);
        const actions = this.getActionsByIds(avatar.Actions);
        //console.log(actions);

        let figurePartsComponents: FigureDataComponent[] = []
        let hiddenComponents: string[] = []

        for (let figurePart of avatar.Look) {
            let fdPart = this.getFigureDataPart(figurePart)

            if (!fdPart) continue

            for (let component of fdPart?.components) {
                figurePartsComponents.push(component)
            }

            for (let hiddenComponent of fdPart?.hidden) {
                hiddenComponents.push(hiddenComponent)
            }
        }

        figurePartsComponents.sort((a: FigureDataComponent, b: FigureDataComponent) => {

            let direction = this.isHeadPart(a.type, avatar) ? avatar.HeadDirection : avatar.BodyDirection
            //let action = this.getFigureComponentAction(a, actions)

            let order = this.getDrawParts("std", direction)

            if (order) {
                for (let position of order) {
                    if (position == a.type) return -1
                    if (position == b.type) return 1
                }
            }

            return 0
        })

        for (let component of figurePartsComponents) {

            if (hiddenComponents.includes(component.type)) continue

            let partSet = this.getPartSet(component.type)

            //const direction = this.isHeadPart(component.type) ? avatar.HeadDirection : avatar.BodyDirection;

            if (!partSet) continue

            let action = this.getFigureComponentAction(component, actions)
            let assetName = this.getAssetName(component)

            if (!action || !assetName) continue

            this.drawPart(component, action, avatar, assetName)
        }

        avatar.assemble();
    }
    private getFigureComponentAction(figureComponent: FigureDataComponent, actions: Action[]): Action | undefined {
        //console.log(actions);
        const action = actions.find((action) => {
            const activeParts = Object.values(this.getActivePartsForAction(action));

            const activePart = activeParts?.find((part) => {
                return part == figureComponent.type;
            });

            return activePart !== undefined;
        });

        return action ?? this.getDefaultAction();
    }

    private drawPart({ type, id, color }: FigureDataComponent, action: Action, avatar: Avatar, assetName: string) {

        const partFrames: AnimationFrame[] = this.getAnimationFrames(action.id, type);
        avatar.TotalFrames = partFrames.length;

        const frame = this.isHeadPart(type, avatar) ? avatar.HeadFrame : avatar.BodyFrame;

        let partFrame: any = frame % (partFrames ? Object.values(partFrames).length : 1);
        let partAction: string = (partFrames && partFrames[partFrame]) ? partFrames[partFrame].assetPartDefinition : action.assetPartDefinition;

        const direction = avatar.BodyDirection
        const animationOffsets = this.getAnimationOffsets(action.id, partFrame, direction);
        //console.log(animationOffsets);

        partFrame = partFrames && partFrames[partFrame] ? partFrames[partFrame].number : 0;

        const flippedType = this.getFlippedSetType(assetName, type)

        //console.log(flippedType);

        let resourceAction = avatar.Action

        const spriteComponent = new AvatarSpriteComponent(
            partAction,
            type,
            id.toString(),
            direction,
            partFrame,
            color,
            flippedType,
            false,
            partAction
        );

        this.drawSpriteComponent(spriteComponent, assetName, avatar, animationOffsets);
    }

    private getFlippedSetType(assetName: string, type: string) {
        let partSet = this.getPartSet(type)

        //console.log(partSet);

        if (partSet?.flippedSetType) {
            return partSet.flippedSetType
        }
    }

    private downloadTexture(assetName: string): Promise<PIXI.Texture> {

        let loader = new PIXI.Loader();
        let textureUrl = `${Engine.getInstance().getConfig().avatarFigurePath}/${assetName}/${assetName}.png`;

        if(this.textures.get(assetName)) {
            return Promise.resolve(this.textures.get(assetName)!);
        }

        loader.add(textureUrl);

        let texture: Promise<PIXI.Texture> = new Promise((resolve, reject) => {
            
            loader.load((loader: PIXI.Loader) => {
                let texture = PIXI.Texture.from(loader.resources[textureUrl].data);
                resolve(texture);
            })
        })

        this.textures.set(assetName, texture);

        return texture;
    }


    private async drawSpriteComponent(component: AvatarSpriteComponent, assetName: string, avatar: Avatar, animationOffsets: { x: number, y: number }) {
        let offsetResource: OffsetResource = this.data.Offsets.get(assetName) as OffsetResource;
        let spritesheet: Spritesheet = this.data.SpriteSheets.get(assetName) as Spritesheet;


        if(!offsetResource) {
            return;
        }

        let assets: Asset = offsetResource.assets;
        let asset = assets[component.ResourceName];

        if(spritesheet.frames[this.getTextureId(assetName, component.ResourceName)] === undefined || (spritesheet.frames[this.getTextureId(assetName, component.ResourceName)].rotated)) {
            component.IsFlipped = true;
            component.ResourceDirection = 6 - component.ResourceDirection;
        }
        if(spritesheet.frames[this.getTextureId(assetName, component.ResourceName)] === undefined || (spritesheet.frames[this.getTextureId(assetName, component.ResourceName)].rotated)) {
            component.Frame = component.Frame + 1;
            component.IsFlipped = true;
        }
        if(spritesheet.frames[this.getTextureId(assetName, component.ResourceName)] === undefined || (spritesheet.frames[this.getTextureId(assetName, component.ResourceName)].rotated)) {
            component.Frame = component.Frame + 2;
            component.IsFlipped = false;
        }
        if(spritesheet.frames[this.getTextureId(assetName, component.ResourceName)] == undefined || (spritesheet.frames[this.getTextureId(assetName, component.ResourceName)].rotated)) {
            //component.ResourceDirection = component.ResourceDirection;
        }

        //console.log(spritesheet.frames);
        //console.log(this.getTextureId(assetName, component.ResourceName))
        let frame: any;
        if(spritesheet.frames[this.getTextureId(assetName, component.ResourceName)] !== undefined) {
            frame = spritesheet.frames[this.getTextureId(assetName, component.ResourceName)].frame;
            let downloadedTexture: PIXI.Texture = await this.downloadTexture(assetName);
            let texture = new PIXI.Texture(downloadedTexture.baseTexture, new Rectangle(frame.x, frame.y, frame.w, frame.h));
    
            let sprite = Sprite.from(texture);
            sprite.interactive = true;
            sprite.buttonMode = true;
    
    
            if (component.Color && component.ResourceType != "ey") {
                sprite.tint = parseInt(component.Color, 16);
            }
    
            if (asset) {
                sprite.x -= asset.x - (animationOffsets.x ?? 0);
                sprite.y -= asset.y - (animationOffsets.y ?? 0);
            }
    
    
            if (component.IsFlipped) {
                sprite.scale.x = -1;
    
                sprite.x = this.geometryWidth! - sprite.x;
            }
    
    
            if(component.ResourceType == "sh") {
                avatar.ShoesContainer.addChild(sprite);
            } else if(component.ResourceType == "hd" || component.ResourceType == "ey" || component.ResourceType == "fc" || component.ResourceType == "fa" || component.ResourceType == "ea") { 
                avatar.HeadContainer.addChild(sprite);
            } else if(component.ResourceType == "lg") {
                avatar.LegContainer.addChild(sprite);
            } else if(component.ResourceType == "hrb" || component.ResourceType == "ha" ||component.ResourceType == "hbr") {
                avatar.HatContainer.addChild(sprite)
            } else if(component.ResourceType == "he") {
                avatar.HeadAccessoryContainer.addChild(sprite);
            }
            else if(component.ResourceType == "hr") {
                avatar.HairContainer.addChild(sprite)
            }
            else if(component.ResourceType == "bd") {
                avatar.BodyContainer.addChild(sprite)
            }
            else if(component.ResourceType == "rh" || component.ResourceType == "lh" || component.ResourceType == "ls" || component.ResourceType == "rs") {
                avatar.ArmsContainer.addChild(sprite)
            }
            else if( component.ResourceType == "ch")  {
                avatar.TorsoContainer.addChild(sprite)
            }
            
            this.loaded = true;
        } else {
            console.log('cannot find resource ' + this.getTextureId(assetName, component.ResourceName));
        }
       


    }

    private getTextureId(assetName: string, resourceName: string) {
        return assetName + "_" + resourceName + ".png";
    }

    private getAssetPart(assetName: string) {
        
    }

    private getAssetComponent(assetName: string) {
        
    }




    private getAnimationFrames(actionid: string, setType: string): AnimationFrame[] {
        let frames: AnimationFrame[] = [];
        Object.values(this.data.avatarAnimations!.animations).forEach((animation: Animation) => {
            if (animation.id.toLowerCase() === actionid.toLowerCase()) {
                animation.parts.forEach((part: Part) => {
                    if (part.setType == setType) {
                        part.frames.forEach((frame: AnimationFrame) => {
                            const repeats = frame.repeats ? frame.repeats : 1;
                            for (let i = 0; i < repeats; i++) {
                                frames.push(frame);
                            }
                        })
                    }
                })
            }
        })

        return frames;

    }

    private getAnimationOffsets(actionId: string, frameId: number, directionId: number): { x: number, y: number } {
        return { x: 0, y: 0 };

    }




    private getActivePartsForAction(action: Action) {
        const activeParts: string[] = [];

        const activePartSets = this.data.avatarPartSets?.partSets.activePartSets;

        const activePartSet = activePartSets?.find((set) => {
            return set.id == action.activePartSet;
        });

        activePartSet?.activeParts.forEach((part) => {
            if (part.setType != null) activeParts.push(part.setType);
        });

        return activeParts.filter((v, i, a) => a.indexOf(v) === i);
    }

    private getDefaultAction() {
        const actions = Object.values(this.data.avatarActions!.actions);

        const action = actions?.find((action) => {
            return action.id == ActionId.STAND;
        });

        return action;
    }


    private getDrawParts(state: string, direction: Direction): string[] | undefined {
        const drawOrder = this.data.avatarDrawOrder;

        if (drawOrder) {
            return drawOrder[state][direction];
        }
    }
    private isHeadPart(type: string, avatar: Avatar): boolean {
        let headParts = this.getGeometryParts("head", avatar)

        return headParts.includes(type);
    }
    private getGeometryParts(part: string, avatar: Avatar) {
        const geometryTypes = this.data.avatarGeometry?.geometry.types;

        let geometry = geometryTypes?.find(type => {
            return type.id == avatar.Geometry
        })

        let parts: string[] = []

        let bodyParts = geometry?.bodyParts.find(bodyPart => {
            return bodyPart.id == part
        })

        bodyParts?.items?.forEach(item => {
            parts.push(item.id)
        })

        return parts
    }
    private getActionsByIds(actionIds: string[]): Action[] {
        let actions: Action[] = [];

        const avatarActions: Action[] = Object.values(this.data.avatarActions!.actions);

        actionIds.forEach((id) => {
            const action = avatarActions.find((action) => {
                return action.id == id;
            });

            if (action) actions.push(action);

        });

        return actions;
    }

    private getActionById(actionid: string): Action | undefined {
        let actions: Action[] = [];

        const avatarActions: Action[] = Object.values(this.data.avatarActions!.actions);

        return avatarActions.find((action) => {
            return action.id == actionid;
        });
    }



    private getAssetName({ type, id }: FigureDataComponent): string | undefined {
        let partSet = this.getPartSet(type)
        let assetName: string | undefined;
        //console.log(this.data.figureMap![type])

        assetName = this.data.figureMap![type][id]

        if (!assetName && partSet?.removeSetType) {
            assetName = this.data.figureMap![partSet.removeSetType][id]
        }

        if (!assetName && partSet?.flippedSetType) {
            assetName = this.data.figureMap![partSet.flippedSetType][id]
        }

        if (!assetName) {
            assetName = this.data.figureMap![type][1] ?? this.data.figureMap![type][0]
        }

        return assetName
    }



    private getFigureDataPart(figurePart: FigurePart): FigureDataPart {
        let parts: FigureDataPart = {
            components: [],
            hidden: []
        }

        const partSets = this.data.figureData?.settype[""+figurePart.type+""];

        //console.log(this.data.figureData);

        if (!partSets) {
            return parts
        }

        const set = partSets.set[figurePart.id];


        if (!set) {
            return parts
        }

        for (const { type, index, id, colorable, colorindex } of set.parts) {

            const colorId = figurePart.colors[colorindex] ?? figurePart.colors[0];

            const color = colorable ? this.getPaletteColor(partSets.paletteid, colorId) : null;

            const component: FigureDataComponent = {
                index,
                id,
                colorable,
                color,
                type
            }

            parts.components.push(component);
        }

        if (set.hidden) {
            for (let hiddenComponent of set.hidden) {
                parts.hidden.push(hiddenComponent)
            }
        }

        return parts;
    }

    private getPaletteColor(paletteId: number, colorId: number) {
        const palette = this.data.figureData?.palette[paletteId];

        if (palette) {
            return palette[colorId] ? palette[colorId].color : null;
        }

        return null
    }



    private decideGeometry(avatar: Avatar) {
        Object.values(this.data.avatarGeometry!.geometry.canvases).forEach((canvas: Canvas) => {
            canvas.geometries.forEach((geometry: GeometryElement) => {
                if (canvas.scale == "h") {
                    if (geometry.id == avatar.Geometry) {
                        avatar.Container.width = geometry.width
                        avatar.Container.height = geometry.height;

                        this.geometryWidth = geometry.width
                        this.geometryHeight = geometry.height
                    }
                    if (geometry.id == "head") {
                        avatar.Container.width = avatar.Container.height;
                    }
                }
            })
        })
    }

    public get Data(): AvatarImageData { return this.data }
}