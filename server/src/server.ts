import express from 'express';
import expressWs from 'express-ws';
import { createOrJoinRoom } from './roomService';
import { WS } from './utils';

const unexpectedExceptionHandle = (cause: any) => console.error("Something went wrong: ", cause);
process.on('uncaughtException', unexpectedExceptionHandle);

const app = express();

app.use(express.static('public', { extensions: ['html'] }));

app.use((error: any, req: any, res: any, next: any): void => {
    unexpectedExceptionHandle(error);
    res.status(500).send("Server Error");
});

app.get('/health', (req, res) => res.send('OK'));

const appWs = expressWs(app);

appWs.app.ws('/api/roomState', (ws: WS, req: express.Request): void => {
    console.info(`WS request`);
    const { roomId, userId, userName } = req.query as { roomId: string, userId: string, userName: string };
    createOrJoinRoom(ws, roomId, userId, userName);
});

//WA for "H15 - Idle connection" - https://github.com/heroku-examples/node-websockets/blob/main/server.js
const HEROKU_IDLE_TIMEOUT = 50 * 1000; //50s
setInterval(() => appWs.getWss().clients.forEach((ws: WS) => ws.send("H")), HEROKU_IDLE_TIMEOUT);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
