import RoomObjectVisualization from "../../../../../core/room/object/RoomObjectVisualization";
import Pointer from "../Pointer";
import MapData from "../MapData";
import ColorRGB from "../../../../../utils/color/ColorRGB";
import * as PIXI from "pixi.js"
import Tile from "../Tile";


export default class VisualizationPointer extends RoomObjectVisualization {

    private pointerContext: PIXI.Container
    private pointerColor: ColorRGB = new ColorRGB(154, 221, 255)
    private pointerWidth = 4

    constructor(pointer: Pointer) {
        super(0, 0, 0)

        this.pointerContext = pointer.getCanvas();
        this.pointerContext.interactive = true;
        this.pointerContext.visible = false;
        this.render()
    }

    render(): void {
        this.drawPointer(this.pointerContext)
    }

    public updatePosition(x: number, y: number, tile: Tile) {
        let xpos = ((x - y) * (MapData.tileWidth / 2)) + tile!.getVisualization()!.getOffsetX();
        let ypos = ((x + y) * (MapData.tileHeight / 2)) + tile!.getVisualization()!.getOffsetY();

        this.pointerContext.visible = true;

        this.pointerContext.x = xpos;
        this.pointerContext.y = ypos;
    }

    public getPointerWidth(): number {
        return this.pointerWidth
    }

    drawPointer(container: PIXI.Container): PIXI.Container {
        const ctx = new PIXI.Graphics();


        const points = [
            new PIXI.Point(MapData.tileWidth / 2, 0),
            new PIXI.Point(MapData.tileWidth, MapData.tileHeight / 2),
            new PIXI.Point(MapData.tileWidth / 2, MapData.tileHeight),
            new PIXI.Point(0, MapData.tileHeight / 2)
        ];

        ctx.lineStyle(4, 0x000000, 0.5);
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.lineTo(points[3].x, points[3].y);
        ctx.lineTo(points[0].x, points[0].y);
        ctx.endFill();

        ctx.lineStyle(3.4, 0xFFFFFF);
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.lineTo(points[3].x, points[3].y);
        ctx.lineTo(points[0].x, points[0].y);
        ctx.endFill();
        //ctx.strokeStyle = this.pointerColor.toString()

        container.addChild(ctx);

        return container;
    }
}