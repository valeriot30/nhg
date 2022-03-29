import RoomEntityVisualization from "../../../../../../core/room/object/entities/EntityVisualization";
import Engine from "../../../../../../Engine";
import Point3d from "../../../../../../utils/point/Point3d";
import Avatar, { ActionId } from "../../../../../ui/imagers/avatars/Avatar";
import { Direction } from "../../../../../ui/imagers/avatars/Direction";
import AvatarData from "../../../../../ui/imagers/avatars/imager/AvatarData";
import RoomVisualization from "../../../../visualization/RoomVisualization";
import MapData from "../../../map/MapData";
import Tile from "../../../map/Tile";
import UserEntity from "../UserEntity";
import Point from "../../../../../../utils/point/Point";
import UserEntityLogic from "../logic/UserEntityLogic";

export default class UserEntityVisualization extends RoomEntityVisualization {
    public entity: UserEntity;
    private inRoom: boolean = false;

    private avatar: Avatar | null = null;

    protected needsUpdate: boolean = false;

    //info 
    private x: number = 0;
    private y: number = 0;
    private z: number = 0;
    private nextY: number = 0;
    private nextX: number = 0;
    private nextZ: number = 0;
    private rotation: Direction = Direction.SOUTH;
    private headDirection: Direction = Direction.SOUTH;
    private actions: Set<ActionId>;
    private frame: number = 0;

    // status
    private isWalking: boolean = false;
    private isDancing: boolean = false;
    private isTyping: boolean = false;
    

    constructor(entity: UserEntity) {
        super(entity)
        this.entity = entity
        this.actions = new Set();
        this.setUI();
    }

    private setUI(): void {
        
    }

    public render(): void {
        let avatar = new Avatar(this.entity.Look, this.rotation, this.rotation, this.actions);
        
        this.avatar = avatar;

        Engine.getInstance().getUserInterfaceManager()?.avatarImager.loadAvatar(this.avatar!).then(() => {
            Engine.getInstance().getUserInterfaceManager()?.avatarImager.drawAvatar(this.avatar!)
        });
        
        (this.entity.logic as UserEntityLogic).registerEvents();
        let roomV = Engine.getInstance().RoomsManager?.CurrentRoom?.getRoomLayout().Visualization as RoomVisualization
        if(Engine.getInstance().RoomsManager?.CurrentRoom) {
            (Engine.getInstance().RoomsManager?.CurrentRoom?.getRoomLayout().Visualization as RoomVisualization).Container.addChild(avatar.Container);

            this.updateAvatarPosition(); //todo needs to be refactored 
            this.avatar?.Container.emit("user-position-changed", 100);
        }

        this.avatar.Container.zIndex = 3;

        //Engine.getInstance().Application?.Viewport.follow(this.avatar);

    }
    public updateFrame(frame: number): void {
        this.frame = frame;
    }
    public nextFrame(): void {
        if(this.frame > this.avatar!.Frames) {
            this.frame = 0;
        } else {
            this.frame++;
        }
    }
    public draw(): void {
        this.avatar?.Container.destroy();
        this.updateDirection(this.rotation);
        let avatar = new Avatar(this.entity.Look, this.rotation, this.rotation, this.actions, "", this.frame);
        Engine.getInstance().getUserInterfaceManager().avatarImager.drawAvatar(avatar);
        this.avatar = avatar;
        if(Engine.getInstance().RoomsManager?.CurrentRoom) {
            (Engine.getInstance().RoomsManager?.CurrentRoom?.getRoomLayout().Visualization as RoomVisualization).Container.addChild(this.avatar.Container);
        }
        this.updateAvatarPosition();
        this.avatar.Container.interactive = true;
        this.avatar.Container.interactiveChildren = true;
        this.avatar!.Container.zIndex = 8;
    }

    public walk(delta: number) {
        delta = delta / 1000;
        let speed = 2;
    

        if (this.x < this.nextX) {
            this.x += delta * speed;
            if (this.x > this.nextX) {
                //this.isWalking = false;
                this.x = this.nextX;
            }
        } else if (this.x > this.nextX) {
            this.x -= delta * speed;
            if (this.x < this.nextX) {
                //this.isWalking = false;
                this.x = this.nextX;
            }
        }

        if (this.y < this.nextY) {
            this.y += delta * speed;
            if (this.y > this.nextY) {
                //this.isWalking = false;
                this.y = this.nextY;
            }
        } else if (this.y > this.nextY) {
            this.y -= delta * speed;
            if (this.y < this.nextY) {
                //this.isWalking = false;
                this.y = this.nextY;
            }
        }

        if (this.nextZ > this.z) {
            this.z += ((Math.abs(this.z - this.nextZ) > 1.5) ? 9.8 : speed) * delta;
            if (this.z > this.nextZ) {
                this.z = this.nextZ;
            }
        } else if (this.nextZ < this.z) {
            this.z -= ((Math.abs(this.z - this.nextZ) > 1.5) ? 9.8 : speed) * delta;
            if (this.z < this.nextZ) {
                this.z = this.nextZ;
            }
        }


        this.updateAvatarPosition()
    }

    public calculateDirection(a: Point, b: Point): Direction {
        if (a.getX() === b.getX() && a.getY() === b.getY())
            return this.rotation;

        if (b.getX() < a.getX() && b.getY() > a.getY())
            return Direction.NORTH_EAST;
        else if (b.getX() === a.getX() && b.getY() > a.getY())
            return Direction.NORTH;
        else if (b.getX() > a.getX() && b.getY() > a.getY())
            return Direction.NORTH_WEST;
        else if (b.getX() > a.getX() && b.getY() === a.getY())
            return Direction.WEST;
        else if (b.getX() > a.getX() && b.getY() < a.getY())
            return Direction.SOUTH_WEST;
        else if (b.getX() === a.getX() && b.getY() < a.getY())
            return Direction.SOUTH;
        else if (b.getX() < a.getX() && b.getY() < a.getY())
            return Direction.SOUTH_EAST;
        else
            return Direction.EAST;


    }

    public setPosition(point: Point3d)  {
        //console.log(this.headDirection);
        this.nextX = point.getX();
        this.nextY = point.getY();
        this.nextZ = point.getZ();
        this.rotation = this.calculateDirection(new Point(point.getX(), point.getY()), new Point(this.x, this.y));
        this.headDirection = this.calculateDirection(new Point(point.getX(), point.getY()), new Point(this.x, this.y));
        setTimeout(() => 
            this.avatar?.Container.emit("user-position-changed"), 100)
        this.updateAvatarPosition()
        this.draw();
        
    }

    public updateAvatarPosition() {
        const currentRoom = Engine.getInstance().RoomsManager?.CurrentRoom; // current user room

        let tile: Tile | undefined = currentRoom?.getRoomLayout().getFloorPlane().getTilebyPosition(new Point(Math.round(this.x), Math.round(this.y))); // get the tile where you want to set avatar
        let offsetFloor = tile!.position.getZ() > 0 ? -MapData.thickSpace * MapData.stepHeight * tile!.position.getZ() : -AvatarData.AVATAR_TOP_OFFSET;

        this.avatar!.Container.x = (((this.y - this.x) * MapData.tileWidth / 2) + (MapData.tileWidth / 2)) - MapData.tileHeight;
        this.avatar!.Container.y = ((this.x + this.y) * MapData.tileHeight / 2) + (MapData.tileHeight / 2) + offsetFloor;
    }

    public updateDirection(direction: Direction) {
        let avatar = this.avatar;
        avatar?.Container.removeChildren();
        avatar!.Direction = direction;
    }



    public addAction(action: ActionId) {
        this.removeActions([ActionId.STAND, ActionId.WALK, ActionId.SIT, ActionId.LAY])
        this.actions.add(action);

    }

    public removeAction(action: ActionId) {
        this.actions.delete(action)
    }
    public removeActions(actions: ActionId[]) {
        for(let action of actions) {
            this.removeAction(action)
        }
    }


    public isFlipped(): boolean {
        if(this.avatar?.BodyDirection === Direction.SOUTH || this.avatar?.BodyDirection === Direction.SOUTH_WEST || this.avatar?.BodyDirection == Direction.NORTH_WEST || this.avatar?.BodyDirection == Direction.SOUTH_EAST || this.avatar?.BodyDirection == Direction.WEST) {
            return true;
        } 
        return false;
    }

    public parseRotation(rot: string): Direction {
        switch (rot) {
            case "NORTH":
                return Direction.EAST;
            case "SOUTH":
                return Direction.SOUTH;
            case "WEST":
                return Direction.WEST;
            default:
                return Direction.SOUTH;
        }
    }
    
    public getPosition(): Point3d {
        return new Point3d(this.x, this.y, this.z);
    }


    public get Actions(): Set<ActionId> {
        return this.actions
    }

    public set Rot(direction: Direction) {
        this.rotation = direction;
    }
    public set HeadRot(direction: Direction) {
        this.headDirection = direction;
    }

    public set InRoom(value: boolean) {
        this.inRoom = value;
    }

    public set IsWalking(value: boolean) {
        this.isWalking = value;
    }
    public get IsWalking(): boolean {
        return this.isWalking;
    }

    public get IsInRoom(): boolean {
        return this.inRoom;
    }

    public get IsTyping(): boolean {
        return this.isTyping
    }

    public get NeedsUpdate(): boolean {
        return this.needsUpdate;
    }

    public set NeedsUpdate(value: boolean) {
        this.needsUpdate = value;
    }

    public get X(): number {
        return this.x;
    }
    public get Y(): number {
        return this.y;
    }

    public set X(x: number) {
        this.x = x;
    }
    public get Avatar(): Avatar | null{
        return this.avatar;
    }
    public set Y(y: number) {
        this.y = y;
    }
    public set Z(z: number) {
        this.z = z;
    }

    public set IsDancing(value: boolean) {
        this.isDancing = value;
    }

    public get IsDancing(): boolean {
        return this.isDancing;
    }

    public set NextX(x: number) {
        this.nextX = x;
    }
    public set NextY(y: number) {
        this.nextY = y;
    }
    public set NextZ(z: number) {
        this.nextZ = z;
    }
    
}