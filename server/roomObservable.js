export function createRoom(ws, room) {

    ws.on('message', function (msg) {
        ws.send(msg);
    });


}

const DB = {}


