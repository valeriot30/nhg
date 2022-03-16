import { IColorLayer } from "./IColorLayer";

export interface IColor {
    layers: { [key: string] : IColorLayer };
}