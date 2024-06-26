import Engine from "../../../Engine"
import UIComponent from "../../ui/components/UIComponentEnum"
import RoomUI from "../../ui/components/room/RoomUI"
import IRoomVisualization from "../../../core/room/IRoomVisualization"
import RoomLayout from "../RoomLayout"
import * as PIXI from "pixi.js"
import Point from "../../../utils/point/Point"
import MapData from "../objects/map/MapData"

export default class RoomVisualization implements IRoomVisualization {

    private roomLayout: RoomLayout

    private canvasFloor: PIXI.Container
    private canvasWall: PIXI.Container
    private canvasDoorFloor: PIXI.Container
    private canvasDoorWall: PIXI.Container

    private canvasPointer: PIXI.Container
    private canvasDoorTile: PIXI.Container

    private container: PIXI.Container

    constructor(room: RoomLayout) {
        this.roomLayout = room

        let roomUIElement = (Engine.getInstance().userInterfaceManager?.getUIComponentManager().getComponent(UIComponent.RoomUI) as RoomUI)
        
        this.container = new PIXI.Container();

        this.canvasFloor = new PIXI.Container();
        this.canvasDoorFloor = new PIXI.Container();
        this.canvasWall = new PIXI.Container();
        this.canvasDoorWall = new PIXI.Container();
        this.canvasPointer = new PIXI.Container();
        this.canvasDoorTile = new PIXI.Container();
        

        this.container.addChild(this.canvasDoorTile);
        this.container.addChild(this.canvasDoorFloor) 
        this.container.addChild(this.canvasWall)
        this.container.addChild(this.canvasDoorWall) 
        this.container.addChild(this.canvasFloor)
        this.container.addChild(this.canvasPointer) 

        this.container.x = (window.innerWidth / 2);
        this.container.y = (window.innerHeight - Engine.getInstance().Application?.app?.stage.height!) / 2
        
        this.canvasDoorFloor.interactive = true;
        this.canvasFloor.interactive = true;

        this.canvasDoorFloor.zIndex = 1;
        this.canvasFloor.zIndex = 4;
        this.canvasPointer.zIndex = 3;
        this.canvasDoorWall.zIndex = 4;
        this.canvasWall.zIndex = 4;

        Engine.getInstance().Application?.on('resize', () => {
            this.container.x = (window.innerWidth / 2);
            this.container.y = ((window.innerHeight) / 2 - (this.container.height / 2));
        });


        Engine.getInstance().Application?.Viewport.addChild(this.container);
    }


    public render() {

        this.roomLayout.getWallPlane().visualization?.render()
        this.roomLayout.getFloorPlane().visualization?.render()
        
    }

    public tileToLocal(x: number, y: number, z: number): Point {
        return new Point((x - y) * MapData.tileWidth, (x + y) * MapData.tileHeight - (z * MapData.tileHeight * 2));
    }


    public globalToTileWithHeight(x: number, y: number, z: number): Point {
        const offsetX = this.container.x;
        const offsetY = this.container.y - (z * MapData.tileHeight * 2);

        const xminusy = (x - MapData.tileWidth - offsetX) / MapData.tileWidth;
        const xplusy = (y - offsetY) / MapData.tileWidth

        const tileX = Math.floor((xminusy + xplusy) / 2);
        const tileY = Math.floor((xplusy - xminusy) / 2);

        return new Point(tileX, tileY);
    }


    public getCanvasFloor() : PIXI.Container {
        return this.canvasFloor
    }

    public getCanvasWall() : PIXI.Container {
        return this.canvasWall
    }

    public getCanvasDoorFloor() : PIXI.Container {
        return this.canvasDoorFloor
    }

    public getCanvasDoorWall() : PIXI.Container {
        return this.canvasDoorWall
    }

    public getCanvasPointer() : PIXI.Container {
        return this.canvasPointer
    }
    public getCanvasDoorTile() : PIXI.Container {
        return this.canvasDoorTile
    }

    public get Container() : PIXI.Container {
        return this.container;
    }
} 