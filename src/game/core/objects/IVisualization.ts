import { ILayer } from "./ILayer";
import { IColor } from "./IColor";
import { IDirections } from "./IDirections";
import { IAnimation } from "./IAnimation";

export interface IVisualization {
    layerCount: number;
    angle: number;
    layers?: { [key: string] : ILayer };
    colors?: { [key: string] : IColor };
    directions?: { [key: string] : IDirections };
    animations?: { [key: string] : IAnimation };
}