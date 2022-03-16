import IRoomManager from "../../core/room/IRoomManager";
import UserLogic from "../user/logic/UserLogic";
import User from "../user/User";
import UserVisualization from "../user/visualization/UserVisualization";
import Item from "./objects/items/Item";

export default class RoomUserManager implements IRoomManager {

    private users: Map<string, User> = new Map()

    public addUser(player: User) : void {
        this.users.set(player.UserInfo.Username!, player)
    }

    public removeUser(userid: string) : void {
        let user: User | undefined = this.users.get(userid);
        console.log(user);
        (user?.Visualization as UserVisualization).Avatar?.Container.destroy();
        this.users.delete(userid)
    }

    public getUser(userid: string): User | undefined {
        return this.users.get(userid);
    }

    public getUsers() : Map<string, User > {
        return this.users
    }

    public tick(delta: number) {
        this.users.forEach((user: User) => {
            (user.Logic as UserLogic).tick(delta);
        })
    }



}