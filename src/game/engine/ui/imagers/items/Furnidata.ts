
export type FloorItemDescription = {
    id: number,
    className: string,
    name: string,
    description: string,
    revision: number,
    canstandon: number,
    cansiton: number,
    canlayon: number,
    xdim: number,
    ydim: number,
};

export type WallItemDescription = {
    id: number,
    className: string,
    name: string,
    description: string,
    revision: number,
};

export type Furnidata = {
    roomitemtypes: { //todo change to flooritemtypes
        [id: number]: FloorItemDescription
    },
    wallitemtypes: {
        [id: number]: WallItemDescription
    }
};

export type FurniDescription = FloorItemDescription | WallItemDescription;

export type FurnidataType = 'wallitemtypes' | 'roomitemtypes';