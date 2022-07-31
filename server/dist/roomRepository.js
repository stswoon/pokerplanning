"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROOM_DB_API = void 0;
const utils_1 = require("./utils");
const ROOM_DB = {};
const getRoom = (id) => {
    const room = ROOM_DB[id];
    if (!room) {
        throw new Error(`Illegal ROOM_DB state: can't find roomId ${id}`);
    }
    return utils_1.utils.deepCopy(room);
};
const _saveRoom = (room) => {
    console.debug(`Room (${room.id}) was changed, new value: ${room}`);
    ROOM_DB[room.id] = room;
};
const isRoomExist = (id) => !!ROOM_DB[id];
const createRoom = (id) => _saveRoom({ id, createdDate: utils_1.utils.now(), showCards: false, votes: {} });
const vote = (roomId, userId, cardValue, rotateAngle) => {
    const room = getRoom(roomId);
    const vote = room.votes[userId];
    if (!vote) {
        throw new Error(`Illegal ROOM_DB state: can't find vote for userId (${userId}) for roomId (${roomId})`);
    }
    vote.cardValue = cardValue;
    vote.rotateAngle = rotateAngle;
    _saveRoom(room);
};
const addUser = (roomId, userId, userName) => {
    const room = getRoom(roomId);
    room.votes[userId] = { userId, userName };
    _saveRoom(room);
};
const removeUser = (roomId, userId) => {
    const room = getRoom(roomId);
    delete room.votes[userId];
    _saveRoom(room);
};
const getRoomIdsOlderThenDate = (filterDate) => {
    return Object.values(ROOM_DB)
        .filter((room) => room.createdDate < filterDate)
        .map((room) => room.id);
};
const setShowCards = (id, showCards) => {
    const room = getRoom(id);
    room.showCards = showCards;
    _saveRoom(room);
};
const clearCards = (id) => {
    const room = getRoom(id);
    Object.values(room.votes).forEach(vote => {
        vote.cardValue = undefined;
        vote.rotateAngle = undefined;
    });
    _saveRoom(room);
};
const removeRoom = (id) => {
    console.debug(`Room (${id}) was deleted`);
    delete ROOM_DB[id];
};
exports.ROOM_DB_API = {
    getRoom,
    isRoomExist,
    createRoom,
    removeRoom,
    vote,
    addUser,
    removeUser,
    getRoomIdsOlderThenDate,
    setShowCards,
    clearCards
};
//# sourceMappingURL=roomRepository.js.map