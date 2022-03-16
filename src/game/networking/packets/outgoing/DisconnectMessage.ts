import PacketManager from "../PacketManager";
import { OutgoingPacket } from "./OutgoingPacketEnum";

/**
 * Send the disconnect message to the server
 * @param packetManager PacketManager
 * @constructor
 */
export function DisconnectMessage(packetManager: PacketManager)
{
    packetManager.getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.DisconnectMessage);
}