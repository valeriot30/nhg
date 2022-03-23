import { IAsset } from "../IAsset";
import { IDimension } from "../IDimension";
import { ILogic } from "../ILogic";
import { IVisualization } from "../IVisualization";

export interface IFurnidata {
    type: string;
    name: string;
    visualizationType: string;
    logicType: string;
    spritesheet: string;
    dimensions: IDimension;
    assets: { [key: string] : IAsset };
    visualization: IVisualization;
    logic: ILogic,
}