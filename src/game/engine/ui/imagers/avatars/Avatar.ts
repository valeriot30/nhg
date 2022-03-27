import { Container } from "pixi.js";

import { Direction } from "./Direction"

const DEFAULT_FIGURE = "hd-180-1.ch-255-66.lg-280-110.sh-305-62.ha-1012-110.hr-828-61";

export enum ActionId {
    // Figure
    STAND = "Default",
    LAY = "Lay",
    RIDE_JUMP = "RideJump",
    DANCE = "Dance",

    // Walk
    WALK = "Move",

    // Head
    IDLE = "Idle",

    // Eye
    SLEEP = "Sleep",

    // Speak
    TALK = "Talk",

    // Gesture
    GESTURE = "Gesture",
    SMILE = "GestureSmile",
    SAD = "GestureSad",
    ANGRY = "GestureAngry",
    SURPRISED = "GestureSurprised",

    // Sit
    SIT = "Sit",

    // Hand Left
    RESPECT = "Respect",
    WAVE = "Wave",
    SIGN = "Sign",

    // Hand Right
    USE_ITEM = "UseItem",
    CARRY_ITEM = "CarryItem",

    // Hand Right and Head
    BLOW = "Blow",
    LAUGH = "Laugh",

    // Swim
    FLOAT = "Float",
    SWIM = "Swim",

    // Effect
    EFFECT = "AvatarEffect",
}

type BodyPartContainers = {
    top: Container;
    bottom: Container;
    behind: Container;
    torso: Container;
    leftitem: Container;
    rightitem: Container;
    leftarm: Container;
    rightarm: Container;
    head: Container;
};

export type FigurePart = {
    type: string;
    id: string;
    colors: number[];
};

export default class Avatar {
    private look: FigurePart[];

    private bodyDirection: Direction;
    private headDirection: Direction;

    private geometry: string;

    private actions: Set<ActionId>;

    private bodyFrame: number;
    private headFrame: number;

    private isSmall: boolean;

    private container: Container;

    private headContainer: Container;
    private bodyContainer: Container;
    private legContainer: Container;
    private shoesContainer: Container;
    private hairContainer: Container;
    private hatContainer: Container;
    private torsoContainer: Container;
    private headAccessoryContainer: Container;
    private armsContainer: Container;

    private totalFrames: number = 0;


    // private bodyPartContainers: BodyPartContainers;

    constructor(
        figure: string = DEFAULT_FIGURE,
        bodyDirection: Direction = Direction.SOUTH,
        headDirecton: Direction = Direction.SOUTH,
        actions: Set<ActionId>,
        geometry: string = "vertical",
        bodyFrame: number = 0,
        headFrame: number = 0,
        isSmall: boolean = false
    ) {
        this.look = this.getLookFromFigure(figure);

        this.bodyDirection = bodyDirection;
        this.headDirection = headDirecton;

        this.actions = actions

        this.bodyFrame = bodyFrame;

        //if(actions.has(ActionId.WALK)) this.bodyFrame = this.bodyFrame % 4;

        this.headFrame = headFrame;

        this.isSmall = isSmall;
        this.geometry = geometry;

        this.container = new Container()
        this.bodyContainer = new Container();
        this.hairContainer = new Container();
        this.headContainer = new Container();
        this.torsoContainer = new Container();
        this.armsContainer = new Container();
        this.legContainer = new Container();
        this.shoesContainer = new Container();
        this.hairContainer = new Container();
        this.hatContainer = new Container();
        this.headAccessoryContainer = new Container();
        this.container.buttonMode = true;
        this.container.interactive = true;
        this.container.interactiveChildren = true;
    }

    public assemble(): void {
        this.container.addChild(this.bodyContainer);
        this.container.addChild(this.legContainer);
        this.container.addChild(this.headContainer);
        this.container.addChild(this.hairContainer);
        this.container.addChild(this.shoesContainer);
        this.container.addChild(this.hatContainer);
        this.container.addChild(this.headAccessoryContainer);
        this.container.addChild(this.armsContainer);
        this.container.addChild(this.torsoContainer);

        this.container.sortableChildren = true;

        this.bodyContainer.zIndex = 0;
        this.legContainer.zIndex = 1;
        this.armsContainer.zIndex = 3
        this.torsoContainer.zIndex = 2;
        this.headContainer.zIndex = 4;
        this.hairContainer.zIndex = 5;
        this.shoesContainer.zIndex = 6;
        this.hatContainer.zIndex = 7;
        this.headAccessoryContainer.zIndex = 8;
        
        this.container.sortChildren()

        this.container.alpha = 1;
    }

    private getLookFromFigure(figure: string) {
        const look: FigurePart[] = [];

        const figureParts = figure.split(".");

        figureParts.forEach((part) => {
            const parameters = part.split("-");

            const type = parameters[0];
            const id = parameters[1];
            const primaryColor = Number(parameters[2]);
            const secondaryColor = Number(parameters[3]);

            const figurePart: FigurePart = {
                type,
                id,
                colors: [primaryColor],
            };

            if (!isNaN(secondaryColor)) {
                figurePart.colors.push(secondaryColor);
            }

            look.push(figurePart);
        });

        return look;
    }

    public addAction(action: ActionId) {
        this.actions.add(action);
    }

    public get Look() {
        return this.look;
    }

    public set TotalFrames(frames: number) {
        this.totalFrames = frames;
    }

    public get Frames() {
        return this.totalFrames;
    }

    public get BodyDirection() {
        return this.bodyDirection;
    }

    public get HeadDirection() {
        return this.headDirection;
    }

    public get Actions() {
        return this.actions;
    }

    public set Direction(direction: Direction) {
        this.bodyDirection = direction;
        this.headDirection = direction;
    }

    public set Frame(frame: number) {
        this.bodyFrame = frame
        this.headFrame = frame
    }

    public get IsSmall() {
        return this.isSmall;
    }

    public get BodyFrame() {
        return this.bodyFrame;
    }

    public get ArmsContainer() {
        return this.armsContainer;
    }

    public set BodyFrame(value: number) {
        this.bodyFrame = value;
    }

    public get HeadFrame() {
        return this.headFrame;
    }

    public get Container() {
        return this.container!;
    }

    public set Container(container: Container) {
        this.container = container
    }

    public get BodyContainer(): Container {
        return this.bodyContainer;
    }
    public get HeadContainer(): Container {
        return this.headContainer;
    }
    public get ShoesContainer(): Container {
        return this.shoesContainer;
    }
    public get LegContainer(): Container {
        return this.legContainer;
    }
    public get HairContainer(): Container {
        return this.legContainer;
    }

    public get HeadAccessoryContainer(): Container {
        return this.headAccessoryContainer;
    }

    public get Geometry() {
        return this.geometry;
    }
    public get HatContainer() {
        return this.hatContainer;
    }
    public get TorsoContainer() {
        return this.torsoContainer;
    }
}
