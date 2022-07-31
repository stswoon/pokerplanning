"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomUserWsMapApi = void 0;
const roomUserWsMap = {};
const addUser = (roomId, userId, ws) => {
    roomUserWsMap[roomId] = roomUserWsMap[roomId] || {};
    roomUserWsMap[roomId][userId] = ws;
};
const removeUser = (roomId, userId) => { delete roomUserWsMap[roomId][userId]; };
const getUsersByRoom = (roomId) => { return Object.assign({}, roomUserWsMap[roomId]); };
const removeRoom = (id) => { delete roomUserWsMap[id]; };
exports.RoomUserWsMapApi = {
    addUser,
    getUsersByRoom,
    removeRoom,
    removeUser
};
//# sourceMappingURL=roomUserWsMap.js.map