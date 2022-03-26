import Wall from "../Wall"
import RoomLogic from "../../../logic/RoomLogic"
import RoomObjectLogic from "../../../../../core/room/object/RoomObjectLogic"

export default class LogicWall extends RoomObjectLogic {

    private wall: Wall
    private hitContext: CanvasRenderingContext2D | null

    constructor(wall: Wall) {
        super()

        this.wall = wall

        let canvas = (this.wall.getPlane().getRoom().Logic as RoomLogic).getCanvasWallHit()
        this.hitContext = canvas.getContext("2d")
    }

    registerEvents(): void {
        
    }

    tick() : void {}
    
}