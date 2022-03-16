import Wall from "../Wall"
import RoomObjectVisualization from "../../../../../core/room/object/RoomObjectVisualization"
import RoomVisualization from "../../../visualization/RoomVisualization"
import MapData from "../MapData"
import WallType from "../WallTypeEnum"

import Point3d from "../../.././../../utils/point/Point3d"
import ColorRGB from "../../../../../utils/color/ColorRGB"
import * as PIXI from "pixi.js"
import NormalType from "../../../visualization/NormalTypeEnum"
import RoomVisualizationColorData from "../../../visualization/RoomVisualizationColorData"

export default class VisualizationWall extends RoomObjectVisualization {

    private wall: Wall
    private wallContext: PIXI.Container
    private doorContext: PIXI.Container

    private color: ColorRGB = ColorRGB.getColorFromNumber(0xb4bec8)

    constructor(wall: Wall) {
        super(VisualizationWall.calculateOffsetX(wall.getPosition()),
            VisualizationWall.calculateOffsetY(wall.getPosition()),
            VisualizationWall.calculateZIndex(wall.getPosition()))

        this.wall = wall

        let roomV = (wall.getPlane().getRoom().getVisualization() as RoomVisualization)
        this.wallContext = roomV.getCanvasWall();
        this.doorContext = roomV.getCanvasDoorWall();
    }

    //TODO SET WALL OFFSET 
    private static calculateOffsetX(position: Point3d): number {
        return (position.getY() * MapData.tileHeight) - (position.getX() * MapData.tileWidth) / 2 + MapData.wallWidth - MapData.wallDepth
    }

    private static calculateOffsetY(position: Point3d): number {
        return (position.getY() * MapData.tileHeight) / 2 + (position.getX() * MapData.tileWidth) / 4 - (position.getZ() * MapData.thickSpace * MapData.stairSteps) - MapData.wallHeight + MapData.wallDepth + MapData.wallBlankBottom
    }

    private static calculateZIndex(position: Point3d): number {
        return (1 * position.getX()) + (1 * position.getY()) + (1 * position.getZ())
    }

    public render(): void {
        this.checkAndDraw()
    }

    private checkAndDraw() {
        if (this.wallContext == null || this.doorContext == null) {
            return
        }

        switch (this.wall.getType()) {
            default:
                return

            case WallType.Left:
                this.drawWall(this.wallContext, true)
                break;

            case WallType.Right:
                this.drawWall(this.wallContext, false)
                break;

            case WallType.DoorLeft:
                this.drawDoorWall(this.doorContext, true)
                break;

            case WallType.DoorRight:
                this.drawDoorWall(this.doorContext, false)
                break;
        }
    }

    private drawWall(container: PIXI.Container, isLeft: boolean, drawDepth: boolean = true) : PIXI.Container {

        const ctx = new PIXI.Graphics();

        let wallRight = RoomVisualizationColorData.getNormal(this.color, NormalType.LIGHT).toHex()
        let wallLeft = RoomVisualizationColorData.getNormal(this.color, NormalType.MEDIUM).toHex()
        let wallTop = RoomVisualizationColorData.getNormal(this.color, NormalType.DARK).toHex()

        let fullHeightTick = this.wall.getPlane().getRoom().HasFullHeightTick ? MapData.thickSpace * MapData.stepHeight * this.wall.getPosition().getZ() : 0

    
        ctx.beginFill(wallTop) // top

        if (this.wall.isCorner()) {
            ctx.moveTo(
                this.getOffsetX(),
                this.getOffsetY() + MapData.wallBlankTop);

            ctx.lineTo(
                this.getOffsetX() + (isLeft ? 0 : MapData.wallDepth - MapData.wallDepth),
                this.getOffsetY() - MapData.wallDepth / 2
            );
        } else {
            ctx.moveTo(
                this.getOffsetX(),
                this.getOffsetY() + MapData.wallBlankTop);

            ctx.lineTo(
                this.getOffsetX() + (MapData.wallDepth * (isLeft ? -1 : 1)),
                this.getOffsetY());
        }

        ctx.lineTo(
            this.getOffsetX() + (MapData.wallWidth * (isLeft ? -1 : 1)),
            this.getOffsetY() + MapData.wallBlankBottom);

        ctx.lineTo(
            this.getOffsetX() + (MapData.wallWidth * (isLeft ? -1 : 1)) + (isLeft ? MapData.wallDepth : -MapData.wallDepth),
            this.getOffsetY() + MapData.wallBlankBottom + (isLeft ? MapData.wallDepth / 2 : MapData.wallBlankTop));

        ctx.closePath();
        //ctx.fillStyle = RoomVisualizationColorData.getNormal(this.color, NormalType.DARK).toString()
        ctx.endFill();

        
        if (drawDepth) {
            ctx.beginFill(wallRight); // depth right
            //console.log(this.wall.getPlane().getRoom().getMapSizeX())
            let last: boolean = false;


            if(this.wall.getPosition().getX() === this.wall.getPlane().getRoom().getDoorPosition().getX() -1 || this.wall.getPosition().getY() === this.wall.getPlane().getRoom().getDoorPosition().getY() -1 && !isLeft) {
                ctx.endFill();
            }
            else {
                
            ctx.moveTo(
                this.getOffsetX() + (MapData.wallWidth * (isLeft ? -1 : 1)) + (isLeft ? 0 : -MapData.wallDepth),
                this.getOffsetY() + (MapData.wallBlankBottom + (isLeft ? 0 : MapData.wallBlankTop))
            );

            ctx.lineTo(
                this.getOffsetX() + (MapData.wallWidth * (isLeft ? -1 : 1)),
                this.getOffsetY() + (isLeft ? MapData.wallHeight - MapData.wallDepth / 2 : MapData.wallBlankBottom ));

            ctx.lineTo(
                this.getOffsetX() + (MapData.wallWidth * (isLeft ? -1 : 1)) + (isLeft ? MapData.wallDepth : 0),
                this.getOffsetY() + MapData.wallHeight + (isLeft ? (last ? 0 : 0) : -MapData.wallBlankTop)
            );

            ctx.lineTo(
                this.getOffsetX() + (MapData.wallWidth * (isLeft ? -1 : 1)) + (MapData.wallDepth * (isLeft ? 1 : -1)),
                this.getOffsetY() + (isLeft ? MapData.wallBlankBottom + MapData.wallBlankTop : MapData.wallHeight - (last ? 0 : 0))
            );
            }

            ctx.closePath();

            //ctx.fillStyle = isLeft ? RoomVisualizationColorData.getNormal(this.color, NormalType.LIGHT).toString() : RoomVisualizationColorData.getNormal(this.color, NormalType.MEDIUM).toString()
            ctx.endFill();
        }

        let wallColor = isLeft ? wallLeft : wallRight;

        ctx.beginFill(wallColor);
        ctx.moveTo(this.getOffsetX(), this.getOffsetY() + MapData.wallBlankTop)

        ctx.lineTo(
            this.getOffsetX() + ((MapData.wallWidth - MapData.wallDepth) * (isLeft ? -1 : 1)),
            this.getOffsetY() + (MapData.wallBlankBottom + MapData.wallBlankTop)
        );
        ctx.lineTo(
            this.getOffsetX() + ((MapData.wallWidth - MapData.wallDepth) * (isLeft ? -1 : 1)),
            this.getOffsetY() + MapData.wallHeight - MapData.thickSpace
        );
        ctx.lineTo(
            this.getOffsetX(),
            this.getOffsetY() + (MapData.wallHeight - MapData.wallBlankBottom) - MapData.thickSpace
        );
        ctx.closePath();

        //ctx.fillStyle = isLeft ? RoomVisualizationColorData.getNormal(this.color, NormalType.MEDIUM).toString() : RoomVisualizationColorData.getNormal(this.color, NormalType.LIGHT).toString()
        ctx.endFill();

        container.addChild(ctx);

        return container;
    }

    private drawDoorWall(container: PIXI.Container, isLeft: boolean) : PIXI.Container {

        const ctx = new PIXI.Graphics();

        let wallRight = RoomVisualizationColorData.getNormal(this.color, NormalType.LIGHT).toHex()
        let wallLeft = RoomVisualizationColorData.getNormal(this.color, NormalType.MEDIUM).toHex()
        let wallTop = RoomVisualizationColorData.getNormal(this.color, NormalType.DARK).toHex()

        //ctx.translate(0, MapData.thickSpace * MapData.stepHeight * this.wall.getPosition().getZ());

        let doorHeight = Math.floor(MapData.wallHeight * 0.64)

        let wallColor = isLeft ? wallLeft : wallRight;

        ctx.beginFill(wallColor); // bottom
        ctx.moveTo(
            this.getOffsetX(), 
            this.getOffsetY() + MapData.wallBlankTop);

        ctx.lineTo(
            this.getOffsetX() + (MapData.wallWidth - MapData.wallDepth) * (isLeft ? -1 : 1),
            this.getOffsetY() + (MapData.wallBlankBottom + MapData.wallBlankTop)
        );
        ctx.lineTo(
            this.getOffsetX() + (MapData.wallWidth - MapData.wallDepth) * (isLeft ? -1 : 1),
            this.getOffsetY() + MapData.wallHeight - doorHeight
        );
        ctx.lineTo(
            this.getOffsetX(),
            this.getOffsetY() + (MapData.wallHeight - doorHeight - MapData.wallBlankBottom)
        );
        ctx.closePath();

        //ctx.fillStyle = isLeft ? RoomVisualizationColorData.getNormal(this.color, NormalType.LIGHT).toString() : RoomVisualizationColorData.getNormal(this.color, NormalType.MEDIUM).toString()
        ctx.endFill();

        ctx.beginFill(wallTop); // top
        ctx.moveTo(this.getOffsetX(), this.getOffsetY() + MapData.wallBlankTop);

        if (this.wall.isCorner()) {
            ctx.lineTo(
                this.getOffsetX() + (isLeft ? 0 : MapData.wallDepth - MapData.wallDepth),
                this.getOffsetY() - MapData.wallDepth / 2
            );
        } else {
            ctx.lineTo(
                this.getOffsetX() + MapData.wallDepth * (isLeft ? -1 : 1),
                this.getOffsetY());
        }

        ctx.lineTo(
            this.getOffsetX() + MapData.wallWidth * (isLeft ? -1 : 1), 
            this.getOffsetY() + MapData.wallBlankBottom);

        ctx.lineTo(
            this.getOffsetX() + (MapData.wallWidth * (isLeft ? -1 : 1)) + (MapData.wallDepth * (isLeft ? 1 : -1)),
            this.getOffsetY() + MapData.wallBlankBottom + (isLeft ? MapData.wallDepth / 2 : MapData.wallBlankTop)
        );

        ctx.closePath();

        //ctx.fillStyle = RoomVisualizationColorData.getNormal(this.color, NormalType.DARK).toString()
        ctx.endFill();

        container.addChild(ctx);

        return container;
        //todo draw wall ?
    //    this.drawWall(ctx, isLeft, false)
    }

}