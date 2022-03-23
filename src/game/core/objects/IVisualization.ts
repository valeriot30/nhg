import { ILayer } from "./ILayer";
import { IColor } from "./IColor";
import { IDirections } from "./IDirections";
import { IAnimation } from "./IAnimation";

export interface IVisualization {
    layerCount: number;
    angle: number;
    type: string;
    layers?: { [key: string] : ILayer };
    colors?: { [key: string] : IColor };
    directions?: number[]
    animations?: { [key: string] : IAnimation };
}