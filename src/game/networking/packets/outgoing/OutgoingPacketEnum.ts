export enum OutgoingPacket {
    LoginMessage = 1,
    DisconnectMessage = 2,
    GetUserStats = 3,
    PingRequest = 4,
    NavigatorPublicRooms = 5,
    NavigatorAllRooms = 6,
    NavigatorMyRooms = 7,
    UserEnterRoom = 8,
    UserMove = 10,
    UserSay = 11,
    RequestInventoryItemsEvent = 13,
    UserProfileInformation = 15,
    FriendRequestEvent = 16,
    AcceptFriendRequestEvent = 17,
    DeclineFriendRequestEvent = 18,
    GetFriendsInformationEvent = 19,
    SearchUserEvent = 20,
    RequestFriendRequestsEvent = 21,
    RotateMoveItemEvent = 22,
    RoomPickupItemEvent = 23,
    RoomPlaceItemEvent =
    24
    ,
    CatalogPagesListEvent =
    25
    ,
    RequestCatalogPageEvent =
    26
    ,
    StartNewTrade =
    27
    ,
    AddItemToTrade =
    28
    ,
    /*
    RemoveItemFromTrade = 
         29
    }
     */
    DeclineTrade =
    30
    ,
    AcceptTrade =
    31
    ,
    CatalogBuyItemEvent =
    32
    ,
    MoveWallItemEvent =
    33
    ,
    ToggleFloorItemEvent =
    34
    ,
    ToggleWallItemEvent =
    35
    ,
    CreateNewRoom =
    36
    ,
    FollowFriendEvent =
    37
    ,
    SaveRoomAdsEvent =
    38
    ,
    FriendPrivateMessageEvent =
    39
    ,
    RequestRoomDataEvent =
    40
    ,
    HotelViewEvent =
    41
    ,
    ChangeRoomColors =
    42
    ,
    RequestRoomSettingsEvent =
    43
    ,
    SaveRoomSettingsEvent =
    44
    ,
    RoomUserGiveRightsEvent =
    45
    ,
    RoomUserRemoveRightsEvent =
    46
    ,
    UserIsTypingEvent =
    47
    ,
    UserChangeLookEvent =
    48
    ,

    LoginRequest= 49,

    DevTerminalSaveCodeEvent =
    100

}
