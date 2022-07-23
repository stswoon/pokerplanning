import { RoomId, UserId, ROOM_DB_API, Room } from "./roomRepository";
import { roomUserWsMapApi } from "./roomUserWsMap";
import { startShrinkageOldRooms } from "./shrinkageOldRooms";
import { WS } from "./utils"

startShrinkageOldRooms();

export const createOrJoinRoom = (ws: WS, roomId: RoomId, userId: UserId, userName: string): void => {
    if (ROOM_DB_API.getRoom(roomId)) {
        console.log(`Add user (${userName} : ${userId}) to room (${roomId})`);
    } else {
        console.log(`Create room (${roomId}) with first user (${userName} : ${userId})`);
        ROOM_DB_API.createRoom(roomId);
    }
    ROOM_DB_API.addUser(roomId, userId, userName);
    roomUserWsMapApi.addUser(roomId, userId, ws);

    console.log("Subscribe on user actions");
    ws.on("message", function (msg: string) {
        if (msg === "clearCards") {
            ROOM_DB_API.clearCards(roomId);
            ROOM_DB_API.setShowCards(roomId, false);
        } else if (msg === "flipCards") {
            const room = ROOM_DB_API.getRoomSafe(roomId);
            ROOM_DB_API.setShowCards(roomId, room.showCards);
        } else {
            const msgVote = JSON.parse(msg);
            const rotateValue = (Math.round(Math.random() * 10) - 5) / 100;
            ROOM_DB_API.vote(roomId, userId, msgVote.vote.cardValue, rotateValue);
            openCardIfAllVotes(roomId);
        }
        broadcastRoom(roomId);
    });
    ws.on("close", function () {
        console.log(`WS for user (${userName} : ${userId}) in room (${roomId}) was closed`);
        roomUserWsMapApi.removeUser(roomId, userId);
        ROOM_DB_API.removeUser(roomId, userId);
        if (isEmptyRoom(roomId)) {
            console.log(`Room (${roomId}) is empty so remove it`);
            ROOM_DB_API.removeRoom(roomId);
        } else {
            broadcastRoom(roomId);
        }
    });

    console.log("Broadcast after add user to room");
    setTimeout(() => broadcastRoom(roomId));
}

function broadcastRoom(roomId: RoomId) {
    console.log("Broadcast after add user to room"); //TODO
    //TODO
    roomUserWsMapApi.getUsersByRoom(room.roomId)
    Object.values(room.wsClients).forEach(ws => {
        ws.send(JSON.stringify(dtoRoom));
    });
}

function isEmptyRoom(roomId: RoomId): boolean {
    //TODO q
}

const openCardIfAllVotes = (roomId: RoomId) => {
    const room = ROOM_DB_API.getRoomSafe(roomId);
    const isAllVotes: boolean = Array.from(room.votes.values()).reduce((acc, vote) => acc && vote.cardValue != null, true);
    if (isAllVotes) {
        console.log(`All votes in room (${roomId})`);
        ROOM_DB_API.setShowCards(roomId, true);
    }
}
