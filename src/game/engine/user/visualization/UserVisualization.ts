import anime from "animejs";
import Engine from "../../../Engine";
import Point from "../../../utils/point/Point";
import Point3d from "../../../utils/point/Point3d";
import MapData from "../../room/objects/map/MapData";
import RoomVisualization from "../../room/visualization/RoomVisualization";
import Avatar, { ActionId } from "../../ui/imagers/avatars/Avatar";
import { Direction } from "../../ui/imagers/avatars/Direction";
import UserLogic from "../logic/UserLogic";
import User from "../User";
import AvatarData from "../../ui/imagers/avatars/imager/AvatarData";
import IUserVisualization from "../../../core/users/IUserVisualization";
import Tile from "../../room/objects/map/Tile";

export default class UserVisualization implements IUserVisualization {
    private user: User;
    private inRoom: boolean = false;

    private avatar: Avatar | null = null;

    //info 
    private x: number = 0;
    private y: number = 0;
    private z: number = 0;
    private nextY: number = 0;
    private nextX: number = 0;
    private nextZ: number = 0;
    private rotation: Direction = Direction.SOUTH;
    private headDirection: Direction = Direction.SOUTH;
    private action: ActionId = ActionId.STAND
    private frame: number = 0;

    // rendering
    private needsUpdate: boolean = false;

    // status
    private isWalking: boolean = false;
    private isDancing: boolean = false;
    

    constructor(user: User) {
        this.user = user
        this.setUI();
    }

    private setUI(): void {
        
    }

    public render(): void {
        let avatar = new Avatar(this.user.UserInfo.Look, this.rotation, this.rotation, [this.action]);
        
        this.avatar = avatar;

        Engine.getInstance().getUserInterfaceManager()?.avatarImager.loadAvatar(this.avatar!).then(() => {
            Engine.getInstance().getUserInterfaceManager()?.avatarImager.drawAvatar(this.avatar!)
        });
        
        (this.user.Logic as UserLogic).registerEvents();
        let roomV = Engine.getInstance().RoomsManager?.CurrentRoom?.getRoomLayout().Visualization as RoomVisualization
        if(Engine.getInstance().RoomsManager?.CurrentRoom) {
            (Engine.getInstance().RoomsManager?.CurrentRoom?.getRoomLayout().Visualization as RoomVisualization).Container.addChild(avatar.Container);
        
        this.avatar.Container.zIndex = 1;
        
        this.updateAvatarPosition(this.x, this.y); //todo needs to be refactored 
        this.avatar.Container.sortChildren();
        }

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
        let actions = [];
        actions.push(this.action);
        let avatar = new Avatar(this.user.UserInfo.Look, this.rotation, this.rotation, actions, "", this.frame);
        this.avatar = avatar;
        //this.updateAction(this.action);
        this.updateDirection(this.rotation);
        Engine.getInstance().getUserInterfaceManager().avatarImager.drawAvatar(avatar);
        if(Engine.getInstance().RoomsManager?.CurrentRoom) {
            (Engine.getInstance().RoomsManager?.CurrentRoom?.getRoomLayout().Visualization as RoomVisualization).Container.addChild(this.avatar.Container);
        }
        this.updateAvatarPosition(this.x, this.y);
        (this.user.Logic as UserLogic).registerEvents();
        this.avatar.Container.interactive = true;
        this.avatar.Container.interactiveChildren = true;
        this.avatar!.Container.zIndex = 8;
    }

    public walk(delta: number) {
        let speed = 2;
         // (velocity)

        delta = delta / 1000;

        this.isWalking = true;

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

        /*if(this.x < this.nextX) {
            this.x += delta * speed;
        } else {
            this.x = this.nextX;
            this.isWalking = false;
        }
        if(this.y < this.nextY) {
            this.y += delta * speed;
        }
        else {
            this.y = this.nextY;
            this.isWalking = false;
        }*/
        this.updateAvatarPosition(this.x, this.y)
    }

    public set Action(action: ActionId) {
        this.action = action;
    }

    public get Action(): ActionId {
        return this.action;
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
        this.rotation = this.calculateDirection(new Point(point.getX(), point.getY()), new Point(this.x, this.y));
        this.headDirection = this.calculateDirection(new Point(point.getX(), point.getY()), new Point(this.x, this.y));
        //console.log(this.headDirection);
        this.x = point.getX();
        this.y = point.getY();
        this.z = point.getZ();
        this.draw();
    }

    public updateAvatarPosition(x: number, y: number) {
        let currentRoom = Engine.getInstance().RoomsManager?.CurrentRoom; // current user room


        let tile: Tile | undefined = currentRoom?.getRoomLayout().getFloorPlane().getTilebyPosition(new Point(Math.round(this.x), Math.round(this.y))); // get the tile where you want to set avatar
        let offsetFloor = tile!.getPosition().getZ() > 0 ? -MapData.thickSpace * MapData.stepHeight * tile!.getPosition().getZ() : 0;

        
        this.avatar!.Container.zIndex = 8;
        let offset = this.isFlipped() ? 0 : AvatarData.AVATAR_LEFT_OFFSET;

        this.avatar!.Container.y = ((x + y) * MapData.tileHeight / 2) + (MapData.tileHeight / 2) + offsetFloor;
        this.avatar!.Container.x = (((y - x) * MapData.tileWidth / 2) + (MapData.tileWidth / 2)) - MapData.tileHeight;


    }

    public set(action: ActionId) {
        this.action = action;
    }


    public updateDirection(direction: Direction) {
        let avatar = this.avatar;

        avatar?.Container.removeChildren();
        
        avatar!.Direction = direction;
    }



    public updateAction(action: ActionId) {
        this.action = action
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