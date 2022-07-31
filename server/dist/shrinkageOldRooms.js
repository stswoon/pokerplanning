"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startShrinkageOldRooms = void 0;
const roomRepository_1 = require("./roomRepository");
const roomUserWsMap_1 = require("./roomUserWsMap");
const utils_1 = require("./utils");
const shrinkageOldRooms = () => {
    const ROOM_LIVE_TIMEOUT = 8 * 60 * 60 * 1000; //8h
    const oldDate = utils_1.utils.now() - ROOM_LIVE_TIMEOUT;
    const roomIds = roomRepository_1.ROOM_DB_API.getRoomIdsOlderThenDate(oldDate);
    console.log("Found old rooms: " + roomIds.join(", "));
    roomIds.forEach(id => {
        console.log(`Remove old room (${id})`);
        roomRepository_1.ROOM_DB_API.removeRoom(id);
        Object.values(roomUserWsMap_1.RoomUserWsMapApi.getUsersByRoom(id)).forEach(ws => ws.close());
        roomUserWsMap_1.RoomUserWsMapApi.removeRoom(id);
    });
};
const startShrinkageOldRooms = () => {
    const SHRINKAGE_OLD_ROOMS_PERIOD = 8 * 60 * 60 * 1000; //8h
    console.log(`Start shrinkage old rooms with period = ${SHRINKAGE_OLD_ROOMS_PERIOD}`);
    setInterval(() => shrinkageOldRooms(), SHRINKAGE_OLD_ROOMS_PERIOD);
    shrinkageOldRooms();
};
exports.startShrinkageOldRooms = startShrinkageOldRooms;
//# sourceMappingURL=shrinkageOldRooms.js.map