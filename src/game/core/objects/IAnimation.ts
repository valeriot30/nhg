import { IAnimationLayer } from "./IAnimationLayer";

export interface IAnimation {
    layers: { [key: string] : IAnimationLayer };
}