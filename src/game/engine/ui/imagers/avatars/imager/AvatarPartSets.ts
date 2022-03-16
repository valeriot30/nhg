import AvatarImageData from "./AvatarImageData";

export enum ActivePart {
    Head = "head",
    Figure = "figure",
    Speak = "speak",
    Gesture = "gesture",
    Eye = "eye",
    HandRight = "handRight",
    handRightAndHead = "handRightAndHead",
    HandLeft = "handLeft",
    Walk = "walk",
    Sit = "sit",
    ItemRight = "itemRight",
}

export enum PartSet {
    RightItem = "ri",
    RightHand = "rh",
    rhs = "rhs", //?
    rs = "rs", // right shirt arm
    rc = "rc", // right arm (jacket ?)
    Body = "bd",
    bds = "bds",
    ss = "ss",
    Shoes = "sh",
    Leg = "lg",
    ch = "ch", // chest shirt
    cp = "cp", // chest print
    cc = "cc", // chest jacket
    ca = "ca", // chest accessory
    Head = "hd",
    fc = "fc",
    Eyes = "ey",
    Hair = "hr",
    hrb = "hrb",
    LeftItem = "li",
    LeftHand = "lh",
    lhs = "lhs",
    ls = "ls", // left shirt arm
    lc = "lc", // left arm (jacket ?)
    WaistAccesory = "wa", // waist accesory
    EyeAccesory = "ea", // eye accesory
    FaceAccesory = "fa", // face accesory
    Hat = "ha", // hat
    HeadAccesory = "he", // head accesory
}

export default class PartSets {
    private data: AvatarImageData;

    constructor(data: AvatarImageData) {
        this.data = data;
    }

    public getActivePartSet(partSet: ActivePart) {
        
    }

    public getFlippedSetType(partSet: PartSet) {
        
    }
}
