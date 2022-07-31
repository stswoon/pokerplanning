"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrJoinRoom = void 0;
const roomRepository_1 = require("./roomRepository");
const roomUserWsMap_1 = require("./roomUserWsMap");
const shrinkageOldRooms_1 = require("./shrinkageOldRooms");
(0, shrinkageOldRooms_1.startShrinkageOldRooms)();
const createOrJoinRoom = (ws, roomId, userId, userName) => {
    if (roomRepository_1.ROOM_DB_API.isRoomExist(roomId)) {
        console.log(`Add user (${userName} : ${userId}) to room (${roomId})`);
    }
    else {
        console.log(`Create room (${roomId}) with first user (${userName} : ${userId})`);
        roomRepository_1.ROOM_DB_API.createRoom(roomId);
    }
    roomRepository_1.ROOM_DB_API.addUser(roomId, userId, userName);
    roomUserWsMap_1.RoomUserWsMapApi.addUser(roomId, userId, ws);
    console.log("Subscribe on user actions");
    ws.on("message", function (msg) {
        if (msg === "clearCards") {
            roomRepository_1.ROOM_DB_API.clearCards(roomId);
            roomRepository_1.ROOM_DB_API.setShowCards(roomId, false);
        }
        else if (msg === "flipCards") {
            const room = roomRepository_1.ROOM_DB_API.getRoom(roomId);
            roomRepository_1.ROOM_DB_API.setShowCards(roomId, !room.showCards);
        }
        else {
            const msgVote = JSON.parse(msg);
            const rotateValue = (Math.round(Math.random() * 10) - 5) * 2; //degrees
            roomRepository_1.ROOM_DB_API.vote(roomId, userId, msgVote.vote.cardValue, rotateValue);
            //openCardIfAllVotes(roomId);
        }
        broadcastRoom(roomId);
    });
    ws.on("close", function () {
        console.log(`WS for user (${userName} : ${userId}) in room (${roomId}) was closed`);
        roomUserWsMap_1.RoomUserWsMapApi.removeUser(roomId, userId);
        roomRepository_1.ROOM_DB_API.removeUser(roomId, userId);
        if (isEmptyRoom(roomId)) {
            console.log(`Room (${roomId}) is empty so remove it`);
            roomRepository_1.ROOM_DB_API.removeRoom(roomId);
            roomUserWsMap_1.RoomUserWsMapApi.removeRoom(roomId);
        }
        else {
            broadcastRoom(roomId);
        }
    });
    console.log("Broadcast after add user to room");
    setTimeout(() => broadcastRoom(roomId));
};
exports.createOrJoinRoom = createOrJoinRoom;
const broadcastRoom = (roomId) => {
    const userWsMap = roomUserWsMap_1.RoomUserWsMapApi.getUsersByRoom(roomId);
    console.log(`Broadcast room (${roomId}) to users: ${Object.keys(userWsMap).join(', ')}`);
    const room = roomRepository_1.ROOM_DB_API.getRoom(roomId);
    Object.values(userWsMap).forEach((ws) => ws.send(JSON.stringify(room)));
};
const isEmptyRoom = (roomId) => {
    const room = roomRepository_1.ROOM_DB_API.getRoom(roomId);
    return !Object.keys(room.votes).length;
};
const openCardIfAllVotes = (roomId) => {
    const room = roomRepository_1.ROOM_DB_API.getRoom(roomId);
    const isAllVotes = Object.values(room.votes)
        .reduce((acc, vote) => acc && vote.cardValue != null, true);
    if (isAllVotes) {
        console.log(`All votes in room (${roomId})`);
        roomRepository_1.ROOM_DB_API.setShowCards(roomId, true);
    }
};
//# sourceMappingURL=roomService.js.map