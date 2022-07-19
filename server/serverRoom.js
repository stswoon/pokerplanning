module.exports = function createRoom(ws, roomId, userId, userName) {
    shrinkageOldRooms();

    const room = getRoomSafe(roomId)
    addUserToRoom(room, ws, userId, userName);

    ws.on('message', function (msg) {
        if (msg === "clearCards") {
            Object.values(room.votes).forEach(vote => vote.cardValue = null);
            room.flipCards = false;
        } else if (msg === "flipCards") {
            room.flipCards = !room.flipCards;
        } else {
            const msgVote = JSON.parse(msg);
            room.votes[userId].cardValue = msgVote.vote.cardValue;
            // flipCardsIfAllVotes(room);
        }
        broadcastRoom(roomId);
    });

    ws.on('close', function () {
        console.log("ws closed:" + ws);
        removeUser(room, ws);
        broadcastRoom(roomId);
    });

    setTimeout(() => broadcastRoom(roomId));
}

function broadcastRoom(roomId) {
    const room = ROOM_DB[roomId];
    const dtoRoom = {...room};
    delete dtoRoom.wsClients;
    Object.values(room.wsClients).forEach(ws => {
        ws.send(JSON.stringify(dtoRoom));
    });
}

function shrinkageOldRooms() {
    Object.keys(ROOM_DB).forEach(roomId => {
        // const d = now();
        // const d2 = new Date(d.getTime());
        // d2.setSeconds(d2.getSeconds() + 1);
        // console.log("Timeouts:" + (d2.getTime() - d.getTime()));
        console.log("Timeouts:" + (now().getTime() - ROOM_DB[roomId].createdDate.getTime()));
        if (now().getTime() - ROOM_DB[roomId].createdDate.getTime() > ROOM_TIMEOUT) {
            console.log(`Delete room = ${roomId}`);
            Object.values(ROOM_DB[roomId].wsClients).forEach(wsClient => {
                wsClient.close();
                console.log(`Delete room = ${roomId}`);
            });
            delete ROOM_DB[roomId];
        }
    });
}

function now() {
    return new Date();
}

function getRoomSafe(roomId) {
    if (!ROOM_DB[roomId]) {
        console.log("Create room");
        ROOM_DB[roomId] = {
            wsClients: {},
            roomId,
            createdDate: now(),
            flipCards: false,
            votes: {}
        };
    }
    return ROOM_DB[roomId];
}

function addUserToRoom(room, ws, userId, userName) {
    room.wsClients[userId] = ws;
    if (!room.votes[userId]) {
        room.votes[userId] = {userName, cardValue: null};
    }
}

function removeUser(room, ws) {
    const findUserId = Object.keys(room.wsClients).find(userId => room.wsClients[userId] === ws);
    delete room.wsClients[findUserId];
    delete room.votes[findUserId];
}

function flipCardsIfAllVotes(room) {
    let isAllVotes = true;
    Object.values(room.votes).forEach(vote => {
        if (vote.cardValue == null) {
            isAllVotes = false;
        }
    });
    if (isAllVotes) {
        room.flipCards = true;
    }
}

ROOM_TIMEOUT = 8 * 60 * 60 * 1000; //8h
//ROOM_TIMEOUT = 10 * 1000; //10s

/*
room = {
    wsClients: {userId, wsClient}
    roomId
    createdDate
    flipCards
    votes: {
        userId: {userName, cardValue(nullable)}
    }

}
ROOM_DB = {
    roomId: room
}
*/
const ROOM_DB = {};
