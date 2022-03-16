export default interface AvatarPartSetsData {
    partSets: PartSets;
}

export interface PartSets {
    partSet: PartSet[];
    activePartSets: ActivePartSet[];
}

export interface PartSet {
    setType: string;
    flippedSetType: string;
    swim: string;
    removeSetType: string;
}

export interface ActivePartSet {
    id: string;
    activeParts: ActivePart[];
}

export interface ActivePart {
    setType: string;
}
