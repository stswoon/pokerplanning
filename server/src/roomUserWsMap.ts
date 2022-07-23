import { RoomId, UserId } from "./roomRepository";
import { WS } from "./utils";

const roomUserWsMap = new Map<RoomId, Map<UserId, WS>>();

const addUser = (roomId: RoomId, userId: UserId, ws: WS): void => {
    if (!roomUserWsMap.has(roomId)) {
        roomUserWsMap.set(roomId, new Map());
    }
    roomUserWsMap.get(roomId)?.set(userId, ws);
}

const getUsersByRoom = (roomId: RoomId) {
    return roomUserWsMap.get(roomId)?.values()
}

const removeUser = (roomId: RoomId, userId: UserId) => {
    //TODO
}

export const roomUserWsMapApi = {
    addUser,
    getUsersByRoom
    removeUser
}