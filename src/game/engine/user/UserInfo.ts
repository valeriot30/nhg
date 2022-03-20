import Room from "../room/Room"

export default class UserInfo
{
    private id: number | null
    private username: string | null
    private email: string | null
    private look: string | undefined
    private gender: string | null
    private motto: string | null
    private level: Number | null
    private exp: Number | null
    private coins: Number | null
    private rank: Number | null
    private allowTrade: boolean | null

    private currentRoom: Room | undefined;

    constructor(id: number, username: string, look: string, gender: string, motto: string | null = null, level: Number | null = null, exp: Number | null = null, coins: Number | null = null, rank: Number | null = null, allowTrade: boolean | null = null, email: string | null = null)
    {
        this.id = id
        this.username = username
        this.look = look
        this.gender = gender
        this.motto = motto
        this.level = level
        this.exp = exp
        this.coins = coins
        this.rank = rank
        this.allowTrade = allowTrade
        this.email = email
    }

    public getId(): number | null
    {
        return this.id
    }

    public get Username(): string | null
    {
        return this.username
    }
    
    public getEmail(): string | null
    {
        return this.email
    }

    public get Look(): string | undefined
    {
        return this.look
    }

    public getGender():  string | null
    {
        return this.gender
    }

    public getMotto():  string | null
    {
        return this.motto
    }

    public getLevel(): Number | null
    {
        return this.level
    }

    public getExperience(): Number | null
    {
        return this.exp
    }

    public getCoins(): Number | null
    {
        return this.coins
    }

    public getRank(): Number | null
    {
        return this.rank
    }

    public getAllowTrade(): boolean | null
    {
        return this.allowTrade
    }

    public set Id(id: number | null)
    {
        this.id = id
    }

    public set Username(username: string | null)
    {
        this.username = username
    }
    
    public set Email(email: string | null)
    {
        this.email = email
    }

    public set Gender(gender: string | null)
    {
        this.gender = gender
    }

    public set Motto(motto: string | null)
    {
        this.motto = motto
    }

    public set Level(level: Number | null)
    {
        this.level = level
    }

    public set Look(look: string | undefined) {
        this.look = look;
    }

    public set Experience(exp: Number | null)
    {
        this.exp = exp
    }

    public set Coins(coins: Number | null)
    {
        this.coins = coins
    }

    public set Rank(rank: Number | null)
    {
        this.rank = rank
    }

    public setAllowTrade(allowTrade: boolean | null): void
    {
        this.allowTrade = allowTrade
    }

    public get CurrentRoom(): Room | undefined {
        return this.currentRoom
    }
    public set CurrentRoom(room: Room | undefined)  {
        this.currentRoom = room;
    }



}