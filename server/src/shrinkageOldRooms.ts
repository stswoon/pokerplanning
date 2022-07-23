const shrinkageOldRooms = (): void => {
    const ROOM_LIVE_TIMEOUT = 8 * 60 * 60 * 1000; //8h
    const oldDate = utils.now() - ROOM_LIVE_TIMEOUT;
    const roomIds: RoomId[] = ROOM_DB_API.getRoomIdsOlderThenDate(oldDate);
    console.log("Found old rooms: " + roomIds.join(", "));
    roomIds.forEach(id => {
        console.log(`Remove old room (${id})`);
        ROOM_DB_API.removeRoom(id);
        // wsClients
        //TODO
    });
}
export const startShrinkageOldRooms = (): void => {
    console.log("Start shrinkage old rooms");
    const SHRINKAGE_OLD_ROOMS_PERIOD = 8 * 60 * 60 * 1000; //8h
    setInterval(() => shrinkageOldRooms(), SHRINKAGE_OLD_ROOMS_PERIOD);
    shrinkageOldRooms();
}