import Engine from "../../Engine";
import User from "./User";

export default class UserManager {

    private currentUser: User | null = null;
    private engine: any;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    public setUp(): void {
        let user = new User(-1, "", "hd", "M");
        this.setUser(user);
    }

    public tick(delta: number) {
        //this.currentUser?.RoomUser!.Logic!.tick(delta)
    }

    public setUser(user: User): User {
        this.currentUser = user;
        return this.currentUser;
    }

    public get CurrentUser(): User | null {
        return this.currentUser;
    }
}