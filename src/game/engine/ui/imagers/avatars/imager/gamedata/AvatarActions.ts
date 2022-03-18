export default interface AvatarActions{
    actions: Action[];
}

export interface Action {
    id: string;
    state: string;
    precedence: number;
    main: boolean;
    geometryType: string;
    activePartSet: string;
    assetPartDefinition: string;
    prevents: string[];
    animation?: boolean;
    startFromFrameZero?: boolean;
    preventHeadTurn?: boolean;
    types: Type[];
    params: Param[];
    lay: string;
    isDefault?: boolean;
}

export interface Type {
    id: any;
    animated: boolean;
    prevents: string[];
    preventHeadTurn?: boolean;
}

export interface Param {
    id: string;
    value: string;
}
