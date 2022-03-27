export interface NavigatorRoomsList {
    [index: number]: NavigatorRoom
}

export interface NavigatorRoom {
    id: number,
    type: NavigatorRoomType,
    name: string,
    users_count: number
}

export enum NavigatorRoomType {
    ALL = "all",
    MY = "my",
    PUBLIC = "public"
}