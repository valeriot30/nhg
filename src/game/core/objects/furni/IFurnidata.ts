import { IAsset } from "../IAsset";
import { IDimension } from "../IDimension";
import { IVisualization } from "../IVisualization";

export interface IFurnidata {
    type: string;
    name: string;
    visualizationType: string;
    logicType: string;
    spritesheet: string;
    dimensions: IDimension;
    directions: number[];
    assets: { [key: string] : IAsset };
    visualization: IVisualization;
}