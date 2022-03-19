import IUserVisualization from "../../core/users/IUserVisualization"
import Engine from "../../Engine"
import Point3d from "../../utils/point/Point3d"
import UserLogic from "./logic/UserLogic"
import UserInfo from "./UserInfo"
import UserVisualization from "./visualization/UserVisualization"

export default class User implements IUserController {

    private visualization: UserVisualization
    private logic: UserLogic
    private userInfo: UserInfo;

    constructor(id: number, username: string, look: string, gender: string) {
        this.userInfo = new UserInfo(id, username, look, gender)
        this.visualization = new UserVisualization(this)
        this.logic = new UserLogic(this)
    }

    public get UserInfo(): UserInfo {
        return this.userInfo
    }

    public get Visualization(): IUserVisualization {
        return this.visualization
    }

    public get Logic(): IUserLogic {
        return this.logic
    }
}