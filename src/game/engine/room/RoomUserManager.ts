import IRoomManager from "../../core/room/IRoomManager";
import UserLogic from "../user/logic/UserLogic";
import User from "../user/User";
import UserVisualization from "../user/visualization/UserVisualization";

export default class RoomUserManager implements IRoomManager {

    private users: Map<number, User> = new Map()

    public addUser(user: User) : void {
        this.users.set(user.userInfo.id!, user)
    }

    public getUserFromUserName(userName: string): User | null {
        this.users.forEach((user: User) => {
            return user.userInfo.username == userName ? user : null
        })
        return null;
    }

    public deleteUser(userId: number): boolean {
        return this.users.delete(userId)
    }

    public getUser(userid: number): User | undefined {
        return this.users.get(userid);
    }

    public getUsers() : Map<number, User > {
        return this.users
    }

    public tick(delta: number) {
        this.users.forEach((user: User) => {
            (user.logic as UserLogic).tick(delta);
        })
    }



}