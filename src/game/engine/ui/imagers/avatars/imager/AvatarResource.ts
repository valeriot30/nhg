
export interface OffsetResource {
    type: string,
    name: string,
    spritesheet: string,
    assets: Asset
}

export interface Spritesheet {
    meta: {},
    frames: Frames
}

export interface Asset {
    [key: string]: AssetData
}
export interface AssetData {
    x: number,
    y: number
}

export interface Frames {
    [key: string]: FrameComponents,
}
export interface FrameComponents {
    frame: Frame,
    rotated: boolean,
    trimmed: boolean
}

export interface Frame {
    x: number,
    y: number,
    w: number,
    h: number
}
