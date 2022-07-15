module.exports = function createRoom(ws, roomId) {
    if (!DB[roomId]) {
        DB[roomId] = {
            createdDate: new Date(),
            flipCards: false,
            cards: {}
        };
    }
    const room = DB[roomId];

    ws.on('message', function (msg) {
        if (msg.clearCards) {
            room.cards = {};
            room.flipCards = false;
        } else if (msg.flipCards) {
            room.flipCards = true;
        } else if (msg.cards) {
            room.cards = {...room.cards, ...msg.cards};
        }
        ws.send(room);
    });

    ws.send(room);
}

/*
room = {
   createdDate
   flipCards
   cards: {
       userId: cardValue
   }
}
DB = {roomId, room}
 */
const DB = {};
