export default interface FigureData {
    palette: { [key: string]: { [key: string]: Palette } };
    settype: { [key: string]: CA };
}

export interface Palette {
    index: number;
    club: number;
    selectable: boolean;
    color: string;
}

export interface CA {
    paletteid: number;
    mand_m_0: boolean;
    mand_m_1: boolean;
    mand_f_0: boolean;
    mand_f_1: boolean;
    set: { [key: string]: Set };
}

export interface Set {
    gender: Gender;
    club: number;
    colorable: boolean;
    selectable: boolean;
    preselectable: boolean;
    sellable: boolean;
    legacy: boolean;
    parts: Part[];
    hidden?: string[];
}

export enum Gender {
    F = "F",
    M = "M",
    U = "U",
}

/*export enum Hidden {
    Bd = "bd",
    CA = "ca",
    Cc = "cc",
    Ch = "ch",
    Cp = "cp",
    Ea = "ea",
    Ey = "ey",
    Fa = "fa",
    Fc = "fc",
    HD = "hd",
    Ha = "ha",
    He = "he",
    Hr = "hr",
    Hrb = "hrb",
    Lc = "lc",
    Lg = "lg",
    Lh = "lh",
    Ls = "ls",
    RC = "rc",
    Rh = "rh",
    Rs = "rs",
    Sh = "sh",
    Wa = "wa",
}*/

export interface Part {
    type: string;
    id: number;
    colorable: boolean;
    index: number;
    colorindex: number;
}
