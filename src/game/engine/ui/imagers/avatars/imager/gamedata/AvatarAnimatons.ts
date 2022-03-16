/* eslint-disable */
export default interface AvatarAnimations {
    animations: Animation[]
  }
  
  export interface Animation {
    id: string
    parts: Part[]
    offsets?: Offsets
  }

  export interface Offsets {
    frames: OffsetFrame[]
  }

  export interface OffsetFrame {
    id: number,
    directions: OffsetDirection[]
  }

  export interface OffsetDirection {
    id: number,
    bodyParts: BodyPart[]
  }
  
  export interface Part {
    setType: string,
    frames: AnimationFrame[]
  }
  
  export interface AnimationFrame {
    number: number,
    assetPartDefinition: string,
    repeats?: number
  }

  export interface BodyPart {
    id: string,
    dx: number,
    dy: number
  }
  