const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const createRoom = require('./roomObservable');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(express.static('public', {extensions: ['html']}));

app.get('/api/health', function (req, res) {
    res.send('OK');
});

const appWS = new WebSocket.Server({server, path: '/api/roomState'});
appWS.on('connection', (ws, req, client) => {
    console.log("test");
    const {roomId, userId, userName} = req.params;
    createRoom(ws, roomId, userId, userName, req.body);
});



app.listen(PORT, () => console.log(`Listening on ${PORT}`));
