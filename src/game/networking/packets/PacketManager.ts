import Engine from '../../Engine';
import NetworkingManager from '../NetworkingManager'
import MessageHandler from '../../core/communication/messages/MessageHandler';
import { OutgoingPacket } from './outgoing/OutgoingPacketEnum';
import { LoginResponse } from './incoming/handshake/LoginResponse';
import { PongResponse } from './incoming/handshake/PongResponse';
import UpdateUserInformation from './incoming/users/UpdateUserInformation';
import CoinsStatus from './incoming/users/CoinsStatus';
import MyRoomsList from './incoming/navigator/MyRoomsList';
import GenerateRoom from './incoming/rooms/GenerateRoom';
import AllRoomsList from './incoming/navigator/AllRoomsList';
import DisconnectClient from './incoming/generic/DisconnectClient';
import LoadUsersInRoom from './incoming/rooms/entities/LoadRoomEntities';
import NewRoomMessage from './incoming/rooms/users/chat/NewRoomMessage';
import UpdateEntity from './incoming/rooms/entities/UpdateEntity';
import AddRoomEntity from './incoming/rooms/entities/AddRoomEntity';
import RemoveRoomEntity from './incoming/rooms/entities/RemoveRoomEntity';
import UserTypeStatus from './incoming/rooms/users/UserTypeStatus';
import LoadItems from './incoming/items/LoadItems';




class PacketManager {
    private networkingManager: NetworkingManager

    private incomingPackets = new Map<number, MessageHandler>()

    constructor(networkingManager: NetworkingManager) {
        this.networkingManager = networkingManager

        this.bindIncomingPackets()
    }

    private bindIncomingPackets(): void {
        let incomingPacketsHeader: any = {
            1: new LoginResponse,
            2: new PongResponse,
            3: new CoinsStatus,
            8: new AllRoomsList,
            9: new MyRoomsList,
            10: new GenerateRoom,
            11: new LoadUsersInRoom,
            12: new UpdateEntity,
            13: new AddRoomEntity,
            14: new RemoveRoomEntity,
            15: new NewRoomMessage,
            16: new UserTypeStatus,
            17: new UpdateUserInformation,
            18: new LoadItems,
            102: new DisconnectClient
        }

        Object.keys(incomingPacketsHeader).forEach((index) => {
            let packet = incomingPacketsHeader[index]
            this.incomingPackets.set(parseInt(index), packet)
        })

    }

    public applyIn(packetHeader: number, packetBody: any): any {

        let messageHandler: MessageHandler | undefined = this.incomingPackets.get(packetHeader)

        if (messageHandler instanceof MessageHandler) {

            if (Engine.getInstance().config.debug) {
                Engine.getInstance().logger?.debug("%c[INCOMING] %c[" + packetHeader + "] %c(" + messageHandler.constructor.name + ") ", "color: purple", "color: DeepPink", "color: #777", packetBody);
            }
            messageHandler.setMessage(packetBody)
            messageHandler.handle()
        } else if (Engine.getInstance().config.debug) {
            Engine.getInstance().logger?.warning("Unknown packet " + packetHeader, packetBody)
        }
    }

    public applyOut(packetHeader: OutgoingPacket, packetBody: any = {}): void {

        if (Engine.getInstance().networkingManager?.getWebSocketManager().isClosed()) return

        if (Engine.getInstance().config.debug) {
            Engine.getInstance().logger?.debug("%c[OUTGOING] %c[" + packetHeader + "] %c(" + OutgoingPacket[packetHeader] + ") ", "color: green", "color: #1493ff", "color: #777", packetBody);
        }

        this.getNetworkingManager().getWebSocketManager().sendData({
            header: packetHeader,
            body: packetBody
        })
    }

    public getNetworkingManager(): NetworkingManager {
        return this.networkingManager
    }
}

export default PacketManager