import { ISpritesheetFrame } from "./ISpritesheetFrame";

export interface ISpritesheet {
    meta: {
        app: string,
        format: string,
        image: string
        scale: string,
        size: {
            w: number,
            h: number
        },
        version: string
    },
    frames: { [key: string] : ISpritesheetFrame };
}