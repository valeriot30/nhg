import Room from "../room/Room"

export default class UserInfo
{
    public id: number | null
    public username: string | null
    public email: string | null
    public look: string | undefined
    public gender: string | null
    public motto: string | null
    public level: Number | null
    public exp: Number | null
    public coins: Number | null
    public rank: Number | null
    public canTrade: boolean | null

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
        this.canTrade = allowTrade
        this.email = email
    }
}