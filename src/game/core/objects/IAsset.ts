export interface IAsset {
    sprite: ISprite,
    offsets: IOffsets,
    flipH: number,
    source: string 
}

export interface ISprite {
    height: number,
    left: number,
    top: number,
    width: number
}
export interface IOffsets {
    height: number,
    left: number,
    top: number,
    width: number
}