import IUserVisualization from "../../core/users/IUserVisualization"
import UserLogic from "./logic/UserLogic"
import UserInfo from "./UserInfo"
import UserVisualization from "./visualization/UserVisualization"

export default class User implements IUserController {

    public visualization: UserVisualization
    public logic: UserLogic
    public userInfo: UserInfo;

    constructor(id: number, username: string, look: string, gender: string) {
        this.userInfo = new UserInfo(id, username, look, gender)
        this.visualization = new UserVisualization(this)
        this.logic = new UserLogic(this)
    }
}