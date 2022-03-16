export interface IAnimationLayer {
    loopCount?: number
    frameRepeat?: number
    frameSequences: { [index: number] : IAnimationLayerFrameSequence }
}

export interface IAnimationLayerFrameSequence {
    frames: {
        [index: string] : {
            id: number
        }
    }
}