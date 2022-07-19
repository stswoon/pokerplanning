process.on('uncaughtException', unexpectedExceptionHandle)
// process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
// process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
// process.on('SIGINT', exitHandler(0, 'SIGINT'))

function unexpectedExceptionHandle(cause) {
    console.error("Something went wrong: " + cause);
}

const express = require('express');
const expressWs = require('express-ws')
const createRoom = require('./serverRoom');

const app = express();
const appWs = expressWs(app);
const PORT = process.env.PORT || 5000;

app.use(express.static('public', {extensions: ['html']}));

app.use((error, req, res, next) => {
    console.error("middleware error:", error.stack);
    res.status(500).send('Something Broke!');
})

app.get('/health', function (req, res) {
    res.send('OK');
});

app.ws('/api/roomState', function (ws, req) {
    const {roomId, userId, userName} = req.query;
    createRoom(ws, roomId, userId, userName);
});

//wa for "H15 - Idle connection" - https://github.com/heroku-examples/node-websockets/blob/main/server.js
setInterval(() => {
    appWs.getWss().clients.forEach(client => {
        client.send("H");
    });
}, 50 * 1000);


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
