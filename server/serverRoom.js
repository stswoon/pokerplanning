module.exports = function createRoom(ws, roomId, userId, userName) {
    if (!DB[roomId]) {
        DB[roomId] = {
            wsClients: [],
            roomId,
            createdDate: new Date(),
            flipCards: false,
            votes: {}
        };
    }
    const room = DB[roomId];
    room.wsClients.push(ws);

    if (!room.votes[userId]) {
        room.votes[userId] = {userName, cardValue: null};
    }
    const vote = room.votes[userId];

    ws.on('message', function (msg) {
        if (msg === "clearCards") {
            Object.values(room.votes).forEach(vote => vote.cardValue = null);
            room.flipCards = false;
        } else if (msg === "flipCards") {
            room.flipCards = true;
        } else {
            const msgVote = JSON.parse(msg);
            vote.cardValue = msgVote.vote.cardValue;

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
        broadcastRoom(roomId);
    });

    ws.on('close', function () {
        console.log("ws closed:" + ws);
        room.wsClients = room.wsClients.filter(item => item !== ws);
    });

    setTimeout(() => {
        broadcastRoom(roomId);
    }, 0)
}

function broadcastRoom(roomId) {
    const room = DB[roomId];
    const dtoRoom = {...room};
    delete dtoRoom.wsClients;
    room.wsClients.forEach(ws => {
        ws.send(JSON.stringify(dtoRoom));
    });
}

/*
room = {
    roomId
    createdDate
    flipCards
    votes: {
        userId: {userName, cardValue(nullable)}
    }

}
DB = {
    roomId: room
}
 */
const DB = {};
