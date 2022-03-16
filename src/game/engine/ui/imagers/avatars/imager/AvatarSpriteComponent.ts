import { Direction } from "../Direction"
import { Action } from "./gamedata/AvatarActions";

export default class AvatarSpriteComponent {
    private state: string;

    private partType: string;
    private resourceType: string

    private partId: string;

    private direction: Direction;
    private resourceDirection: Direction

    private frame: number;

    private color: string | null;

    private isFlipped: boolean = false

    private isSmall: boolean;

    private action: string;

    constructor(
        state: string,
        partType: string,
        partId: string,
        direction: Direction,
        frame: number,
        color: string | null,
        flippedType: string | undefined,
        isSmall = false,
        action: string
    ) {
        this.state = state;

        this.partType = partType;
        this.partId = partId;

        this.direction = direction;

        this.frame = frame;

        this.color = color;

        this.isSmall = isSmall;

        this.resourceDirection = direction

        this.action = action;


        if (partType === "hd" && isSmall)
            this.partId = "1";
        if (partType === "ey" && this.action === "std" && this.partId === "1" && this.resourceDirection === 3)
            this.action = "sml";
        if (partType === "fa" && action === "std" && partId === "2" && (this.resourceDirection === 2 || this.resourceDirection === 4))
            this.resourceDirection = 1;
        if (partType === "he" && action === "std" && partId === "1") {
            if (direction === 2) {
                this.resourceDirection = 0;
            }
            //if(direction >= 4 && direction <= 6) {
            //return false;
            //}
        }
        //console.log(partId);
        if (partType === "he" && action === "std" && partId === "8")
            this.resourceDirection = direction % 2 === 0 ? 1 : this.resourceDirection;
        if (partType === "he" && action === "std" && (partId === "2131" || partId === "2132") && (direction >= 2 && direction <= 6))
            this.resourceDirection = 1;
        if (partType === "ha" && action === "std" && partId === "2518") {
            this.resourceDirection = direction % 2 === 0 ? 2 : 1;
        }
        if (partType === "ha" && action === "std" && partId === "2519") {
            this.resourceDirection = direction % 2 === 0 ? 2 : 3;
        }
        if (partType === "ha" && action === "std" && partId === "2588") {
            this.resourceDirection = 7;
        }
        if (partType === "ha" && action === "std" && partId === "2589") {
            this.resourceDirection = 3;
        }

        if (direction == 6) {
            this.isFlipped = true
            this.resourceDirection = 0;
        }

        if (direction == 4) {
            this.isFlipped = true
            this.resourceDirection = 2
        }

        if (direction == 5) {
            this.isFlipped = true
            this.resourceDirection = 1;
        }


        if ((partType === "ls" || partType === "lc") && action === "sig") {
            this.resourceDirection = 2;
        }


        this.resourceType = flippedType != undefined && this.isFlipped ? flippedType : partType
    }

    // h_sit_lg_3596_0_0
    public get ResourceName(): string {
        return (
            (this.isSmall ? "sh" : "h") +
            "_" +
            this.state +
            "_" +
            this.resourceType +
            "_" +
            this.partId +
            "_" +
            this.resourceDirection +
            "_" +
            this.frame
        );
    }

    public get State() {
        return this.state;
    }

    public get PartType() {
        return this.partType;
    }

    public get ResourceType() {
        return this.resourceType;
    }

    public get PartId() {
        return this.partId;
    }

    public get Direction() {
        return this.direction;
    }

    public get Frame() {
        return this.frame;
    }

    public get Color() {
        return this.color;
    }

    public get IsFlipped() {
        return this.isFlipped;
    }

    public get IsSmall() {
        return this.isSmall;
    }

    public set IsFlipped(flipped: boolean) {
        this.isFlipped = flipped;
    }
    public set ResourceDirection(direction: number) {
        this.direction = direction;
    }
    public set Frame(frame: number) {
        this.frame = frame;
    }
}
