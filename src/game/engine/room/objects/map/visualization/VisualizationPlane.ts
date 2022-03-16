import RoomObjectVisualization from "../../../../../core/room/object/RoomObjectVisualization";
import RoomObjectController from "../../../../../core/room/object/RoomObjectController";
import RoomPlane from "../RoomPlane";
import RoomPlaneType from "../RoomPlaneTypeEnum";
import RoomVisualization from "../../../visualization/RoomVisualization";
import MapData from "../MapData";
import * as PIXI from "pixi.js"
import Tile from "../Tile";
import IRoomMapObject from "../../../../../core/room/object/map/IRoomMapObject";

const ImagePatterBase = require("../../../../../../assets/images/room/content/floor_texture_64_2_floor_basic.png")

export default class VisualizationPlane extends RoomObjectVisualization {

    private plane: RoomPlane

    private imgPattern: HTMLImageElement | undefined
    private useTexture: boolean = false

    constructor(plane: RoomPlane) {
        super(0, 0, 0)

        this.plane = plane

        this.render()
    }

    render(): void {
        this.getCanvasImageSource().then((img) => {
            this.imgPattern = (img as HTMLImageElement)

            this.plane.getMapObjects().forEach((obj) => {
                if (obj instanceof RoomObjectController) {
                    obj.getVisualization()?.render()
                }
            })
        })
    }

    private getCanvas() {
        let roomV = (this.plane.getRoom().getVisualization() as RoomVisualization)

        switch (this.plane.getType()) {
            case RoomPlaneType.Floor:
                return roomV.getCanvasFloor()

            case RoomPlaneType.LeftWall:
            case RoomPlaneType.RightWall:
                return roomV.getCanvasWall()
        }
    }

    private async getCanvasImageSource() {
        let source = await this.loadImage(ImagePatterBase)
        return source
    }

    private loadImage(url: string) {
        return new Promise<CanvasImageSource>(r => {
            let i = new Image();
            i.onload = (() => r(i));
            i.src = url;
        });
    }

    private async applyTexture() {

        let ctx = new PIXI.Graphics();
        const container = this.getCanvas();

        if (!this.useTexture) {
            return
        }


        if (ctx == null) {
            return
        }

        let pattern = null

        if (this.imgPattern != undefined) {

            let canvas = document.createElement("canvas")
            let patternctx = canvas.getContext("2d")

            canvas.width = this.imgPattern.width * Math.sqrt(2)
            canvas.height = this.imgPattern.height * Math.sqrt(2)

            patternctx!.imageSmoothingEnabled = true

            patternctx?.save()
            patternctx?.translate(canvas.width / 2, canvas.height / 2);
            patternctx?.rotate(45 * Math.PI / 180);
            patternctx?.drawImage(this.imgPattern, -this.imgPattern.width / 2, -this.imgPattern.height / 2);
            patternctx?.restore()

            let tcanvas = document.createElement("canvas")
            let tctx = tcanvas.getContext("2d")
            tctx!.imageSmoothingEnabled = false
            tcanvas.width = MapData.tileWidth * 2
            tcanvas.height = MapData.tileHeight * 2
            tctx!.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, tcanvas.width, tcanvas.height);
            tctx!.drawImage(canvas, 0, 0, canvas.width, canvas.height, tcanvas.width / 2, -tcanvas.height / 2, tcanvas.width, tcanvas.height);
            tctx!.drawImage(canvas, 0, 0, canvas.width, canvas.height, tcanvas.width / 2, tcanvas.height / 2, tcanvas.width, tcanvas.height);
            tctx!.drawImage(canvas, 0, 0, canvas.width, canvas.height, -tcanvas.width / 2, tcanvas.height / 2, tcanvas.width, tcanvas.height);
            tctx!.drawImage(canvas, 0, 0, canvas.width, canvas.height, -tcanvas.width / 2, -tcanvas.height / 2, tcanvas.width, tcanvas.height);


            this.plane.getRoom().getFloorPlane().getMapObjects().forEach((mapObject: IRoomMapObject) => {
                if (mapObject instanceof Tile) {
                    const tiled = new PIXI.TilingSprite(PIXI.Texture.from(tcanvas) ?? PIXI.Texture.WHITE);
                    tiled.tilePosition = new PIXI.Point(mapObject.getPosition().getX(), mapObject.getPosition().getY());
                    tiled.width = 32;
                    tiled.height = 32;
                    tiled.x += mapObject.getVisualization()!.getOffsetX() + (MapData.tileWidth / 2) - 2;
                    tiled.y = mapObject.getVisualization()!.getOffsetY() - 1;
                    container.addChild(tiled);
                }
            })
        }
    }

}