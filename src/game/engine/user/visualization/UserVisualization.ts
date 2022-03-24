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
import { Action } from "../../ui/imagers/avatars/imager/gamedata/AvatarActions";
import UserEntity from "../../room/objects/entities/users/UserEntity";

export default class UserVisualization implements IUserVisualization {

    private user: User

    private userEntity: UserEntity | null

    public constructor(user: User) {
        this.user = user;
        this.userEntity = null;
    }

    public set UserEntity(userEntity: UserEntity | null) {
        this.userEntity = userEntity
    }

    public get UserEntity(): UserEntity | null {
        return this.userEntity
    }
}