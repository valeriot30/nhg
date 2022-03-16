import { ILayer } from "./ILayer";

export interface IDirections {
    layers: { [key: string] : ILayer };
}