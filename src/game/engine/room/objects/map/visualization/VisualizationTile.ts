import Tile from "../Tile"
import RoomVisualization from "../../../visualization/RoomVisualization"
import RoomObjectVisualization from "../../../../../core/room/object/RoomObjectVisualization"
import MapData from "../MapData"
import RoomVisualizationColorData from "../../../visualization/RoomVisualizationColorData"
import TileType from "../TileTypeEnum"

import Point3d from "../../.././../../utils/point/Point3d"
import ColorRGB from "../../../../../utils/color/ColorRGB"
import NormalType from "../../../visualization/NormalTypeEnum"

import * as PIXI from "pixi.js"
import anime from "animejs"
import Engine from "../../../../../Engine"
import UserVisualization from "../../../../user/visualization/UserVisualization"
import VisualizationPointer from "./VisualizationPointer"
import { OutgoingPacket } from "../../../../../networking/packets/outgoing/OutgoingPacketEnum"

export default class VisualizationTile extends RoomObjectVisualization {

    private tile: Tile
    private floorContext: PIXI.Container
    private doorContext: PIXI.Container

    private color: ColorRGB = ColorRGB.getColorFromNumber(0x969664)
    private useStroke: boolean = true

    private doorTileContext: PIXI.Container

    private tileContext: PIXI.Graphics | null;
    private stairsContext: PIXI.Graphics | null;

    constructor(tile: Tile) {
        super(VisualizationTile.calculateOffsetX(tile.getPosition(), tile.getType()),
            VisualizationTile.calculateOffsetY(tile.getPosition(), tile.getType()),
            VisualizationTile.calculateZIndex(tile.getPosition(), tile.getType()))

        this.tile = tile

        this.tileContext = null;
        this.stairsContext = null;

        let roomV = (tile.getPlane().getRoom().Visualization as RoomVisualization)
        this.floorContext = roomV.getCanvasFloor()
        this.doorContext = roomV.getCanvasDoorFloor()
        this.doorTileContext = roomV.getCanvasDoorTile();
    }


    private static calculateOffsetX(position: Point3d, type: TileType): number {
        return (position.getY() * MapData.tileHeight) - (position.getX() * MapData.tileWidth) / 2
    }

    private static calculateOffsetY(position: Point3d, type: TileType): number {
        return (position.getY() * MapData.tileHeight) / 2 + (position.getX() * MapData.tileWidth) / 4 - ((position.getZ() + (type == TileType.DoorTile ? 1 : 0)) * MapData.thickSpace * MapData.stairSteps)
    }

    private static calculateZIndex(position: Point3d, type: TileType): number {
        return (1 * position.getX()) + (1 * position.getY()) + (1 * (position.getZ() + type == TileType.DoorTile ? 1 : 0))
    }

    public get TileContext(): PIXI.Graphics | null {
        return this.tileContext;
    }

    public render(): void {
        this.checkTypeAndDraw()

    }
    private checkTypeAndDraw(): void {

        if (this.floorContext == null) {
            return
        }

        switch (this.tile.getType()) {

            case TileType.DoorTile:
            case TileType.Door:

                this.drawTile(this.doorTileContext, true)
                break
            case TileType.Flat:
                this.drawTile(this.floorContext)
                break
            case TileType.StairLeft:
                this.drawStair(this.floorContext)
                break

            case TileType.StairRight:
                this.drawStair(this.floorContext, true)
                break

            case TileType.StairCornerLeft:
                //this.drawStairCorner(this.floorContext)
                break

            case TileType.StairCornerRight:
                //this.drawStairCorner(this.floorContext, true)
                break

            case TileType.StairCornerFront:
                this.drawFrontCorner(this.floorContext)
                break

            default:
                return
        }
    }

    private drawTile(container: PIXI.Container, isDoor: boolean = false): PIXI.Container {

        if (isDoor) console.log("draw door")
        const ctx = new PIXI.Graphics();
        ctx.interactive = true;
        let roomV = (this.tile.getPlane().getRoom().Visualization as RoomVisualization)

        let fullHeightTick = this.tile.getPlane().getRoom().HasFullHeightTick ? MapData.thickSpace * MapData.stepHeight * (this.tile.getPosition().getZ() + (isDoor ? 1 : 0)) : 0


        let floorColor = RoomVisualizationColorData.getNormal(this.color, NormalType.LIGHT).toHex()
        let leftColor = RoomVisualizationColorData.getNormal(this.color, NormalType.MEDIUM).toHex()
        let rightColor = RoomVisualizationColorData.getNormal(this.color, NormalType.DARK).toHex()

        //thick left
        ctx.beginFill(leftColor);
        if (this.useStroke)
            ctx.lineStyle(0.5, 0x8a8a5c);
        ctx.moveTo(this.getOffsetX(), this.getOffsetY() + MapData.tileHeight / 2);
        ctx.lineTo(this.getOffsetX() + MapData.tileWidth / 2, this.getOffsetY() + MapData.tileHeight);
        ctx.lineTo(
            this.getOffsetX() + MapData.tileWidth / 2,
            this.getOffsetY() +
            MapData.tileHeight +
            fullHeightTick +
            MapData.thickSpace
        );
        ctx.lineTo(
            this.getOffsetX(),
            this.getOffsetY() +
            MapData.tileHeight / 2 +
            fullHeightTick +
            MapData.thickSpace
        );

        ctx.closePath();
        //ctx.fillStyle = RoomVisualizationColorData.getNormal(this.color, NormalType.MEDIUM).toString()
        ctx.endFill();
        //thick right
        ctx.beginFill(rightColor);
        ctx.moveTo(this.getOffsetX() + MapData.tileWidth, this.getOffsetY() + MapData.tileHeight / 2);
        ctx.lineTo(this.getOffsetX() + MapData.tileWidth / 2, this.getOffsetY() + MapData.tileHeight);
        ctx.lineTo(
            this.getOffsetX() + MapData.tileWidth / 2,
            this.getOffsetY() +
            MapData.tileHeight +
            fullHeightTick +
            MapData.thickSpace
        );
        ctx.lineTo(
            this.getOffsetX() + MapData.tileWidth,
            this.getOffsetY() +
            MapData.tileHeight / 2 +
            fullHeightTick +
            MapData.thickSpace
        );
        ctx.closePath();
        //ctx.fillStyle = RoomVisualizationColorData.getNormal(this.color, NormalType.DARK).toString()
        ctx.endFill();



        ctx.beginFill(floorColor); // floor color
        ctx.moveTo(
            this.getOffsetX() + MapData.tileWidth / 2, //TopX
            this.getOffsetY()//TopY
        );
        ctx.lineTo(
            this.getOffsetX() + MapData.tileWidth, //RightX
            this.getOffsetY() + MapData.tileHeight / 2 //RightY
        );
        ctx.lineTo(
            this.getOffsetX() + MapData.tileWidth / 2, //BottomX
            this.getOffsetY() + MapData.tileHeight //BottomY
        );
        ctx.lineTo(
            this.getOffsetX(), //LeftX
            this.getOffsetY() + MapData.tileHeight / 2  //LeftY
        );

        ctx.closePath();

        //ctx.fillStyle = RoomVisualizationColorData.getNormal(this.color, NormalType.LIGHT).toString()


        /*if (this.useStroke) {
            ctx.strokeStyle = RoomVisualizationColorData.getNormal(this.color, NormalType.LIGHT).brightness(-10).toString()
            ctx.stroke()
        }*/



        ctx.endFill();

        ctx.addListener('pointerdown', () => {
            Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.UserMove, {x: this.tile.getPosition().getX(), y: this.tile.getPosition().getY()})
        })

        this.tileContext = ctx;
        ctx.addListener('pointerover', () => {
            (this.tile.getPlane().getRoom().getPointer().getVisualization() as VisualizationPointer).updatePosition(ctx.x, ctx.y, this.tile);
        })

        ctx.addListener('pointerout', () => {
            roomV.getCanvasPointer().visible = false;
        })

        container.addChild(ctx);
        return container;
    }

    private drawStair(container: PIXI.Container, isRight: boolean = false): PIXI.Container {

        const ctx = new PIXI.Graphics();
        ctx.interactive = true;

        let fullHeightTick = this.tile.getPlane().getRoom().HasFullHeightTick ? MapData.thickSpace * MapData.stepHeight * this.tile.getPosition().getZ() : 0

        let _offsetX = this.getOffsetX()

        ctx.pivot.x = 0.2;


        if (isRight) {
            ctx.scale.x = -1;
            ctx.scale.y = 1;
            _offsetX = -_offsetX - MapData.tileWidth;
        }

        ctx.transform.position = new PIXI.Point(0, -MapData.thickSpace * MapData.stepHeight);

        let floorColor = RoomVisualizationColorData.getNormal(this.color, NormalType.LIGHT).toHex()
        let leftColor = RoomVisualizationColorData.getNormal(this.color, NormalType.MEDIUM).toHex()
        let rightColor = RoomVisualizationColorData.getNormal(this.color, NormalType.DARK).toHex()

        if (isRight) {
            leftColor = RoomVisualizationColorData.getNormal(this.color, NormalType.DARK).toHex()
            rightColor = RoomVisualizationColorData.getNormal(this.color, NormalType.MEDIUM).toHex()
        }


        let stairPoints = [{
            x: _offsetX + MapData.tileWidth / 2,
            y: this.getOffsetY()
        },
        {
            x: _offsetX,
            y: this.getOffsetY() + MapData.tileHeight / 2
        },
        {
            x: _offsetX + (MapData.tileWidth / 2 / 8) * 2,
            y: this.getOffsetY() +
                MapData.tileHeight / 2 +
                ((MapData.tileHeight - MapData.tileHeight / 2) / 8) * 2
        },
        {
            x: _offsetX +
                MapData.tileWidth / 2 +
                ((MapData.tileWidth - MapData.tileWidth / 2) / 8) * 2,
            y: this.getOffsetY() + (MapData.tileHeight / 2 / 8) * 2
        }
        ];

        let thickness = MapData.stepHeight * 2;

        ctx.interactive = true;
        ctx.buttonMode = true;

        if(this.useStroke)
            ctx.lineStyle(0.5, 0x8a8a5c);

        ctx.addListener('pointerover', () => {
            (this.tile.getPlane().getRoom().getPointer().getVisualization() as VisualizationPointer).updatePosition(ctx.x, ctx.y, this.tile);
        })

        ctx.addListener('pointerdown', () => {
            Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.UserMove, {x: this.tile.getPosition().getX(), y: this.tile.getPosition().getY()})
        })

        for (let i = 0; i < MapData.stairSteps; i++) {
            let offsetX = (MapData.tileWidth / 2 / 8) * 2 * i;
            let offsetY = thickness + (thickness + (MapData.tileHeight / 2 / 8) * 2) * i;
            let fullHeightTickStair = (this.tile.getPlane().getRoom().HasFullHeightTick ? (MapData.thickSpace * (MapData.stairSteps - i)) : MapData.thickSpace)

            //ctx.fillStyle = floorColor;
            ctx.beginFill(floorColor);
            ctx.moveTo(stairPoints[0].x + offsetX, stairPoints[0].y + offsetY);
            ctx.lineTo(stairPoints[1].x + offsetX, stairPoints[1].y + offsetY);
            ctx.lineTo(stairPoints[2].x + offsetX, stairPoints[2].y + offsetY);
            ctx.lineTo(stairPoints[3].x + offsetX, stairPoints[3].y + offsetY);
            ctx.lineTo(stairPoints[0].x + offsetX, stairPoints[0].y + offsetY);
            ctx.closePath();
            ctx.endFill();

            //thickness l
            //ctx.fillStyle = leftColor;
            ctx.beginFill(leftColor);
            ctx.moveTo(stairPoints[1].x + offsetX, stairPoints[1].y + offsetY);
            ctx.lineTo(
                stairPoints[1].x + offsetX,
                stairPoints[1].y +
                fullHeightTick +
                offsetY +
                fullHeightTickStair
            );
            ctx.lineTo(
                stairPoints[2].x + offsetX,
                stairPoints[2].y +
                fullHeightTick +
                offsetY +
                fullHeightTickStair
            );
            ctx.lineTo(stairPoints[2].x + offsetX, stairPoints[2].y + offsetY);
            ctx.closePath();
            ctx.endFill();

            //thickness r
            //ctx.fillStyle = rightColor;
            ctx.beginFill(rightColor);
            ctx.moveTo(stairPoints[3].x + offsetX, stairPoints[3].y + offsetY);
            ctx.lineTo(
                stairPoints[3].x + offsetX,
                stairPoints[3].y +
                fullHeightTick +
                offsetY +
                fullHeightTickStair
            );
            ctx.lineTo(
                stairPoints[2].x + offsetX,
                stairPoints[2].y +
                fullHeightTick +
                offsetY +
                fullHeightTickStair
            );
            ctx.lineTo(stairPoints[2].x + offsetX, stairPoints[2].y + offsetY);
            ctx.closePath();
            ctx.endFill
        }


        container.addChild(ctx);

        return container;
    }

    drawFrontCorner(container: PIXI.Container) {

        const ctx = new PIXI.Graphics();

        let fullHeightTick = this.tile.getPlane().getRoom().HasFullHeightTick ? MapData.thickSpace * MapData.stepHeight * this.tile.getPosition().getZ() : 0
        //ctx.translate(0, -MapData.thickSpace * MapData.stepHeight /** (parseInt(_z) + 1)*/ );
        ctx.transform.position = new PIXI.Point(0, -MapData.thickSpace * MapData.stepHeight /** (parseInt(_z) + 1)*/);

        let blockPointLeft = [{
            x: this.getOffsetX() + MapData.tileWidth / 2,
            y: this.getOffsetY() + 0
        },
        {
            x: this.getOffsetX() + MapData.tileWidth / 2 - (MapData.tileWidth / 2 / 8) * 2,
            y: this.getOffsetY() + (MapData.tileHeight / 2 / 8) * 2
        },
        {
            x: this.getOffsetX() + MapData.tileWidth / 2,
            y: this.getOffsetY() + (MapData.tileHeight / 2 / 8) * 2 * 2
        }
        ];

        let blockPointRight = [{
            x: this.getOffsetX() + MapData.tileWidth / 2,
            y: this.getOffsetY() + 0
        },
        {
            x: this.getOffsetX() + MapData.tileWidth / 2 + (MapData.tileWidth / 2 / 8) * 2,
            y: this.getOffsetY() + (MapData.tileHeight / 2 / 8) * 2
        },
        {
            x: this.getOffsetX() + MapData.tileWidth / 2,
            y: this.getOffsetY() + (MapData.tileHeight / 2 / 8) * 2 * 2
        }
        ];

        let thickness = MapData.stepHeight * 2;


        for (let i = 0; i < MapData.stairSteps; i++) {
            let offsetX = -((MapData.tileWidth / 2 / 8) * 2 * i);
            let offsetY = thickness + (thickness + (MapData.tileHeight / 2 / 8) * 2) * i;
            let fullHeightTickStair = (this.tile.getPlane().getRoom().HasFullHeightTick ? (MapData.thickSpace * (MapData.stairSteps - i)) : MapData.thickSpace)


            ctx.beginFill(0x989865);
            ctx.moveTo(blockPointLeft[0].x + offsetX, blockPointLeft[0].y + offsetY);
            ctx.lineTo(blockPointLeft[1].x + offsetX, blockPointLeft[1].y + offsetY);
            ctx.lineTo(
                blockPointLeft[2].x,
                blockPointLeft[2].y + offsetY + (MapData.tileHeight / 2 / 8) * 2 * i
            );
            ctx.lineTo(
                blockPointLeft[2].x,
                blockPointLeft[0].y + offsetY + (MapData.tileHeight / 2 / 8) * 2 * i
            );
            ctx.closePath();

            //thickness l l
            ctx.beginFill(0x6F6F49);
            ctx.moveTo(blockPointLeft[1].x + offsetX, blockPointLeft[1].y + offsetY);
            ctx.lineTo(
                blockPointLeft[1].x + offsetX,
                blockPointLeft[1].y +
                fullHeightTick +
                offsetY +
                fullHeightTickStair
            );
            ctx.lineTo(
                blockPointLeft[2].x,
                blockPointLeft[2].y +
                offsetY +
                (MapData.tileHeight / 2 / 8) * 2 * i +
                fullHeightTick +
                fullHeightTickStair
            );
            ctx.lineTo(
                blockPointLeft[2].x,
                blockPointLeft[2].y + offsetY + (MapData.tileHeight / 2 / 8) * 2 * i
            );
            ctx.closePath();

            ctx.beginFill(0x989865);
            ctx.moveTo(
                blockPointRight[0].x - offsetX,
                blockPointRight[0].y + offsetY
            );
            ctx.lineTo(
                blockPointRight[1].x - offsetX,
                blockPointRight[1].y + offsetY
            );
            ctx.lineTo(
                blockPointRight[2].x,
                blockPointRight[2].y + offsetY + (MapData.tileHeight / 2 / 8) * 2 * i
            );
            ctx.lineTo(
                blockPointRight[2].x,
                blockPointRight[0].y + offsetY + (MapData.tileHeight / 2 / 8) * 2 * i
            );
            ctx.closePath();

            //thickness r r
            ctx.beginFill(0x6F6F49); // stair thick right
            ctx.moveTo(
                blockPointRight[1].x - offsetX,
                blockPointRight[1].y + offsetY
            );
            ctx.lineTo(
                blockPointRight[1].x - offsetX,
                blockPointRight[1].y +
                fullHeightTick +
                offsetY +
                fullHeightTickStair
            );
            ctx.lineTo(
                blockPointRight[2].x,
                blockPointRight[2].y +
                offsetY +
                (MapData.tileHeight / 2 / 8) * 2 * i +
                fullHeightTick +
                fullHeightTickStair
            );
            ctx.lineTo(
                blockPointRight[2].x,
                blockPointRight[2].y + offsetY + (MapData.tileHeight / 2 / 8) * 2 * i
            );

            ctx.closePath();
        }

        return ctx;
    }

    drawStairCorner(ctx: CanvasRenderingContext2D, isRight: boolean = false) {
        let fullHeightTick = this.tile.getPlane().getRoom().HasFullHeightTick ? MapData.thickSpace * MapData.stepHeight * this.tile.getPosition().getZ() : 0
        let _offsetX = this.getOffsetX()
        ctx.save();
        ctx.translate(0, -MapData.thickSpace * MapData.stepHeight);

        if (isRight) {
            ctx.scale(-1, 1);
            _offsetX = -_offsetX - MapData.tileWidth;
        }

        let floorColor, leftColor;

        floorColor = RoomVisualizationColorData.getNormal(this.color, NormalType.LIGHT).toString()

        if (isRight) {
            leftColor = RoomVisualizationColorData.getNormal(this.color, NormalType.DARK).toString()
        } else {
            leftColor = RoomVisualizationColorData.getNormal(this.color, NormalType.MEDIUM).toString()
        }

        let cornerPoints = [{
            x: _offsetX + MapData.tileWidth,
            y: this.getOffsetY() + MapData.tileHeight / 2
        },
        {
            x: _offsetX + MapData.tileWidth - (MapData.tileWidth / 2 / 8) * 2 - 1,
            y: this.getOffsetY() + MapData.tileHeight / 2 - (MapData.tileHeight / 2 / 8) * 2 - 1
        },
        {
            x: _offsetX + MapData.tileWidth - (MapData.tileWidth / 2 / 8) * 4,
            y: this.getOffsetY() + MapData.tileHeight / 2
        },
        {
            x: _offsetX + MapData.tileWidth - (MapData.tileWidth / 2 / 8) * 2,
            y: this.getOffsetY() + MapData.tileHeight / 2 + (MapData.tileHeight / 2 / 8) * 2
        }
        ];

        let thickness = MapData.stepHeight * 2;

        for (let i = 0; i < MapData.stairSteps; i++) {
            let offsetX = -((MapData.tileWidth / 2 / 8) * 2 * i); //((((this.tileWidth / 2) / 8) * 2) * i)
            let offsetY = thickness + (thickness + (MapData.tileHeight / 2 / 8) * 2) * i;

            ctx.fillStyle = floorColor;
            ctx.beginPath();
            ctx.moveTo(cornerPoints[0].x + offsetX, cornerPoints[0].y + offsetY);
            ctx.lineTo(
                cornerPoints[1].x + offsetX - (MapData.tileWidth / 2 / 8) * 2 * i,
                cornerPoints[1].y + offsetY - (MapData.tileHeight / 2 / 8) * 2 * i
            );
            ctx.lineTo(
                cornerPoints[2].x + offsetX - (MapData.tileWidth / 2 / 8) * 2 * i,
                cornerPoints[2].y + offsetY - (MapData.tileHeight / 2 / 8) * 2 * i
            );
            ctx.lineTo(cornerPoints[3].x + offsetX, cornerPoints[3].y + offsetY);
            ctx.lineTo(cornerPoints[0].x + offsetX, cornerPoints[0].y + offsetY);
            ctx.closePath();
            ctx.fill();

            //thickness l
            ctx.fillStyle = leftColor;
            ctx.beginPath();
            ctx.moveTo(cornerPoints[3].x + offsetX, cornerPoints[3].y + offsetY);
            ctx.lineTo(
                cornerPoints[2].x + offsetX - (MapData.tileWidth / 2 / 8) * 2 * i,
                cornerPoints[2].y + offsetY - (MapData.tileHeight / 2 / 8) * 2 * i
            );
            ctx.lineTo(
                cornerPoints[2].x + offsetX - (MapData.tileWidth / 2 / 8) * 2 * i,
                cornerPoints[2].y +
                offsetY -
                (MapData.tileHeight / 2 / 8) * 2 * i +
                MapData.thickSpace
            );
            ctx.lineTo(
                cornerPoints[3].x + offsetX,
                cornerPoints[3].y + offsetY + MapData.thickSpace
            );
            ctx.closePath();
            ctx.fill();

            if (isRight && i == 0) {
                continue;
            }

            //DrawSmallAngles
            ctx.fillStyle = floorColor;
            ctx.beginPath();
            ctx.moveTo(
                cornerPoints[1].x + offsetX - (MapData.tileWidth / 2 / 8) * 2 * i,
                cornerPoints[1].y + offsetY - (MapData.tileHeight / 2 / 8) * 2 * i
            );
            ctx.lineTo(
                cornerPoints[1].x +
                offsetX -
                (MapData.tileWidth / 2 / 8) * 2 * i +
                MapData.thickSpace,
                cornerPoints[1].y +
                offsetY -
                (MapData.tileHeight / 2 / 8) * 2 * i -
                (MapData.tileHeight / 2 / 8) * 2
            );
            ctx.lineTo(
                cornerPoints[1].x +
                offsetX -
                (MapData.tileWidth / 2 / 8) * 2 * i +
                MapData.thickSpace,
                cornerPoints[1].y +
                offsetY -
                (MapData.tileHeight / 2 / 8) * 2 * i +
                (MapData.tileHeight / 2 / 8) * 2
            );
            ctx.fill();
        }

        ctx.restore();

        return ctx;
    }

    public get FloorContext(): PIXI.Container { return this.floorContext; }
}