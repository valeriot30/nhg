
import IRoomManager from "../../core/room/IRoomManager";
import Engine from "../../Engine";
import Room from "./Room";
import Point from "../../utils/point/Point";
import UIComponent from "../ui/components/UIComponentEnum";
import RoomUI from "../ui/components/room/RoomUI";
import RoomItemManager from "./RoomItemManager";
import RoomVisualization from "./visualization/RoomVisualization";
import RoomLogic from "./logic/RoomLogic";
import FloorPlane from "./objects/map/FloorPlane";
import ColorRGB from "../../utils/color/ColorRGB";
import WallPlane from "./objects/map/WallPlane";
import Pointer from "./objects/map/Pointer";
import MapData from "./objects/map/MapData";
import IRoomVisualization from "../../core/room/IRoomVisualization";
import IRoomLogic from "../../core/room/IRoomLogic";
import RoomObjectController from "../../core/room/object/RoomObjectController";

export default class RoomLayout {
    private visualization: RoomVisualization
    private logic: RoomLogic
    private room: Room;

    private modelMatrix : number[][] = new Array()

    private colorsHash : ColorRGB[] = new Array()
    private floorPlane: FloorPlane
    private wallPlane: WallPlane

    private mapSizeX: number = 0
    private mapSizeY: number = 0
    private mapSizeZ: number = 0

    private heighestPosition = new Point(0,0)

    private doorPosition: Point

    private zoom: number = 1

    private fullHeightTick: boolean = false


    private pointer: Pointer


    constructor(room: Room, model: string, doorPosition: Point) {

        this.room = room;

        this.doorPosition = doorPosition
        
        this.parseModel(model)

        this.visualization = new RoomVisualization(this)
        this.logic = new RoomLogic(this)

        this.floorPlane = new FloorPlane(this)
        this.wallPlane = new WallPlane(this)

        this.prepareMapObjects()

        this.pointer = new Pointer(this)
        

    }

    private parseModel(model: string) : void {
        let modelRows = model.split("/")

        this.mapSizeX = modelRows.length
        this.mapSizeY = Math.max(...(modelRows.map(el => el.length)))
        

        for (let x = 0; x < this.mapSizeX; x++) {
            this.modelMatrix[x] = new Array();
            for (let y = 0; y < this.mapSizeY; y++) {
                
                let tile = modelRows[x].substr(y, y + 1).trim().toUpperCase().charAt(0)

    

                // height 0 represent empty tile
                let height = tile.toUpperCase() != tile.toLowerCase()
                        ? 10 + tile.charCodeAt(0) - 'A'.charCodeAt(0)
                        : parseInt(tile);

                this.modelMatrix[x][y] = height
    
                if (height > this.mapSizeZ) {
                    this.mapSizeZ = height
                    this.heighestPosition = new Point(x,y)
                }
            }
        }
    }

    private prepareMapObjects() : void {

        //black is reserved to null tile/wall
        this.colorsHash.push(new ColorRGB(0,0,0))

        this.floorPlane.prepareTiles()
        this.wallPlane.prepareWalls()
    }

    public getExtraHeight() {
        let extra = MapData.tileHeight * (this.mapSizeZ) - MapData.tileHeight/2 * (this.heighestPosition.getX() + this.heighestPosition.getY())
        if (extra < 0)
            extra = 0;

        return extra
    
    }
    
    public getCanvasSize() : Point {
        let tileBorder = Math.sqrt(Math.pow(MapData.tileWidth/2, 2) + Math.pow(MapData.tileHeight/2, 2)) + 1

        let X = this.mapSizeX * tileBorder
        let Y = this.mapSizeY * tileBorder

        let fixSpaces = - 1 * ((this.mapSizeX > this.mapSizeY) ? this.mapSizeX : this.mapSizeY) - 1
        let heightExtra = this.getExtraHeight()

        return new Point(
            Math.floor(Y * Math.cos(Math.PI/6) - X * Math.cos((Math.PI/6) + (2*Math.PI)/3)) + ((MapData.wallDepth + 1)* 2),
            Math.floor(Y * Math.sin((Math.PI/6)) +  X * Math.sin((Math.PI/6) + (2*Math.PI)/3) - (MapData.tileHeight/2) + MapData.wallHeight - MapData.thickSpace - MapData.wallDepth + heightExtra + fixSpaces)
        )
    }

    public createOrGetRoomCanvas(name: string) : HTMLCanvasElement {

        let canvas = document.getElementById(name) as HTMLCanvasElement

        if (canvas == undefined) canvas = document.createElement("canvas")

        canvas.id = name

        let canvasSize = this.getCanvasSize()
        canvas.width = canvasSize.getX()
        canvas.height = canvasSize.getY()

        let roomOffset = this.getRoomOffset()
        canvas.getContext("2d")!.translate(
            roomOffset.getX(),
            roomOffset.getY()
        );
        canvas.getContext("2d")!.imageSmoothingEnabled = false;

        return canvas
    }

    public getRoomOffset() : Point {
        return new Point(
            (this.mapSizeX - 1) * MapData.tileWidth/2 + MapData.wallDepth,
            MapData.wallHeight - MapData.thickSpace - MapData.wallDepth - MapData.wallBlankTop + this.getExtraHeight()
        )
    }

    public getUniqueColor() : ColorRGB {
        let color: ColorRGB = ColorRGB.getRandomColor()

        if (this.colorsHash.includes(color)) {
            return this.getUniqueColor()
        }
        
        this.colorsHash.push(color)
        return color
    }

    public getModelMaltrix() : number[][] {
        return this.modelMatrix
    }

    public setModelMatrixElement(x: number, y: number, height: number) : void {
        if (this.modelMatrix[x] && this.modelMatrix[x][y]) {
            this.modelMatrix[x][y] = height
        }
    }

    public getMapSizeX() : number {
        return this.mapSizeX
    }

    public getMapSizeY() : number {
        return this.mapSizeY
    }

    public getMapSizeZ() : number {
        return this.mapSizeZ
    }

    public getDoorPosition() : Point {
        return this.doorPosition
    }

    public getPointer() : Pointer {
        return this.pointer
    }

    public getFloorPlane() : FloorPlane {
        return this.floorPlane
    }

    public getWallPlane() : WallPlane {
        return this.wallPlane
    }

    public getZoom() : number {
        return this.zoom
    }

    public get HasFullHeightTick(): boolean {
        return this.fullHeightTick
    }

    public getVisualization(): IRoomVisualization {
        return this.visualization
    }

    public getLogic(): IRoomLogic {
        return this.logic
    }

    public getModelMatrix(): number[][] {
        return this.modelMatrix
    }
    public getRoom() : Room {
        return this.room
    }
}