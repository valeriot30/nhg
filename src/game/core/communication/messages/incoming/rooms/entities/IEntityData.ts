import { ActionId } from "../../../../../../engine/ui/imagers/avatars/Avatar";
import { Direction } from "../../../../../../engine/ui/imagers/avatars/Direction";
import { Gender } from "../../../../../../engine/ui/imagers/avatars/imager/gamedata/FigureData";
import { EntityType } from "../../../../../room/object/entities/EntityType";

export interface IEntityData {
    id: number,
    user_id: number,
    gender: Gender,
    name: string,
    x: number,
    y: number,
    z: number,
    rot: string
    head_rot: string,
    type: EntityType
    look: string
    actions: ActionId[],

}