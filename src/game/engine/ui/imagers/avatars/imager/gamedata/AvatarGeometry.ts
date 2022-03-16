export default interface AvatarGeometry {
    geometry: Geometry;
}

export interface Geometry {
    direction: number;
    camera: Camera;
    canvases: Canvas[];
    avatarSets: GeometryAvatarSet[];
    types: Type[];
}

//TODO: remove ?
export interface Camera {
    x: number;
    y: number;
    z: number;
}

export interface Canvas {
    scale: string;
    geometries: GeometryElement[];
}

export interface GeometryElement {
    id: string;
    width: number;
    height: number;
    dx: number;
    dy: number;
}

export interface GeometryAvatarSet {
    id: string;
    avatarSets: AvatarSetAvatarSet[];
}

export interface AvatarSetAvatarSet {
    id: string;
    main?: boolean;
    bodyParts: AvatarSetBodyPart[];
}

export interface AvatarSetBodyPart {
    id: string;
}

export interface Type {
    id: string;
    bodyParts: TypeBodyPart[];
}

export interface TypeBodyPart {
    id: string;
    x: number;
    y: number;
    z: number;
    radius: number;
    items?: Item[];
}

export interface Item {
    id: string;
    x: number;
    y: number;
    z: number;
    radius: number;
    nx: number;
    ny: number;
    nz: number;
    double: boolean;
}
