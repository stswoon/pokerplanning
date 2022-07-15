import express from 'express';
import expressWs from 'express-ws';
import {createRoom} from "./roomObservable.js";

const PORT = process.env.PORT || 5000;
const app = express();
expressWs(app);

app.use(express.static( 'public', {extensions: ['html']}));

app.get('/api/health', function (req, res) {
    res.send('OK');
});

app.ws('/api/roomState', function (ws, req) {
    const {roomId, userId, userName} = req.params;
    createRoom(ws, roomId, userId, userName, req.body);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
