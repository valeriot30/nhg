import FurniBase from "./FurniBase";
import * as PIXI from "pixi.js"
import Engine from "../../../../Engine";
import FurniImager from "./FurniImager";
import anime from "animejs";
import { IOffsets } from "../../../../core/objects/IAsset";

export class FurniSprite extends PIXI.Container {

    private _furniBase: FurniBase
    private isIcon: boolean = false;
    private needsUpdate: boolean = false;
    private direction: number = 0;
    private animationPlaying: number = 0;
    private frameCount: number = 0;
    public isPlaying: boolean = false;

    public static FPS: number = 36;

    constructor(furniBase: FurniBase, isIcon: boolean = false, direction: number = 0) {
        super();

        this._furniBase = furniBase;
        this.isIcon = isIcon;
        this.direction = direction;
        this.interactive = true;
        this.visible = true;

        this.direction = 0
    }
    
    public getUIDirection(): number {
        const directions = this.furniBase.getAvailableDirections();
        if (directions.includes(4)) {
            return 4;
        }
        if (directions.includes(2)) {
            return 2;
        }
        return directions[0];
    }
    public getNextDirection() {
        console.log(this.furniBase.data);
        const directions = this.furniBase.getAvailableDirections();
        const pos = directions.indexOf(this.direction);
        return directions[(pos + 1) % directions.length];
    }

    public start(animation: number = 0) {
        if (this.furniBase.hasAnimation(animation) || animation === null) {
            this.animationPlaying = animation;
            this.isPlaying = true;
        }
        this.update();
    }

    public setDirection(direction: number = 0) {
        if (direction != this.direction) {
            this.direction = direction;
            this.needsUpdate = true;
        }
    }

    public setAnimation(animation: number) {

        if (this.furniBase.hasAnimation(animation)) {
            this.animationPlaying = animation
            this.needsUpdate = true;
            this.update();
        } else {
            //console.log('no animation');
        }

    }

    public setIcon(icon: boolean) {
        if (!this.isIcon) {
            this.isIcon = icon;
        }
    }

    public rotate() {

        anime({
            targets: this.position,
            x: this.x,
            y: this.y - 10
        });

        setTimeout(() => {
            anime({
                targets: this.position,
                x: this.x,
                y: this.y + 10,
            });
        }, 220)

        this.scale.x *= -1;
    }

    public nextFrame() {
        this.frameCount++;
        this.needsUpdate = true;
        this.update();
    }

    public turnIntoIcon() {
        this.animationPlaying = 0;
        this.direction = 0;
        this.frameCount = 0;
        this.isIcon = true;
        this.needsUpdate = true;
        this.update();
    }
    public restore(animation: number) {
        this.animationPlaying = animation;
        this.isIcon = false;
        this.needsUpdate = true;
        this.update();
    }

    public update() {

        if (this.needsUpdate) {
            this.children.forEach((child: PIXI.DisplayObject) => {
                child.destroy();
            })
        }
        Promise.resolve(this.furniBase.downloadSpritesheet().then((texture) => {
            for (let layer = 0; layer < this.furniBase.layercount; layer++) {
                let frame = this.isIcon ? 0 : this.furniBase.getFrameFrom(this.animationPlaying, layer, this.frameCount);
                let assetName = this.furniBase.assetNameFrom(this.isIcon ? 1 : FurniImager.DEFAULT_SIZE, layer, this.direction, frame);

                if(assetName == undefined) {
                    assetName = this.furniBase.assetNameFrom(this.isIcon ? 1 : FurniImager.DEFAULT_SIZE, layer, this.direction + 2, frame);
                }

                

                if (this.furniBase.data.assets[assetName] != undefined) {

                    let asset = this.furniBase.data.assets[assetName];

                    //console.log(asset);

                    if (asset) {

    
                        if(!asset.sprite) {
                            asset = this.furniBase.data.assets[asset.source];
                        }

                        let spriteElement = this.furniBase.getSprite(texture, asset);

                        if (asset.flipH) {
                            spriteElement.scale.x = -1;
                        }

                        let offsets: IOffsets = asset.offsets;
                        

                        spriteElement.pivot.x = offsets.left;
                        spriteElement.pivot.y = offsets.top;

                        
                        if(this.furniBase.data.visualization.layers) {
                            spriteElement = this.furniBase.updateSpriteFrom(spriteElement, this.furniBase.data.visualization.layers![layer])
                        }


                        this.addChild(spriteElement);
                    }
                }
                else {
                    //console.log('no asset');
                }

            }
        }))

        if (this.furniBase.visualizationType !== "furniture_animated") {
            this.isPlaying = false;
        }
    }
    public get HasIcon(): boolean {
        return this.isIcon;
    }
    public get animation(): number {
        return this.animationPlaying
    }

    public get furniBase() {
        return this._furniBase;
    }

    public get currentAnimation(): number {
        return this.currentAnimation;
    }

}