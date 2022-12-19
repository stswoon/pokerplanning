"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const roomService_1 = require("./roomService");
const path_1 = __importDefault(require("path"));
const unexpectedExceptionHandle = (cause) => {
    console.error("Something went wrong: ", cause);
};
process.on('uncaughtException', unexpectedExceptionHandle);
process.on('unhandledRejection', unexpectedExceptionHandle);
const app = (0, express_1.default)();
app.use(express_1.default.static(__dirname + '/public', { extensions: ['html'] }));
app.get('/room', function (req, res) {
    res.sendFile(path_1.default.join(__dirname + '/public/index.html'));
});
app.use((error, req, res, next) => {
    unexpectedExceptionHandle(error);
    res.status(500).send("Server Error");
});
app.get('/health', (req, res) => res.send('OK'));
const appWs = (0, express_ws_1.default)(app);
appWs.app.ws('/api/roomState', (ws, req, next) => {
    const { roomId, userId, userName } = req.query;
    console.info(`WS request roomId=${roomId}, userId=${userId} userName=${userName}`);
    try {
        (0, roomService_1.createOrJoinRoom)(ws, roomId, userId, userName);
    }
    catch (error) { // https://scoutapm.com/blog/express-error-handling
        next(error); // passing to default middleware error handler
    }
});
//WA for "H15 - Idle connection" - https://github.com/heroku-examples/node-websockets/blob/main/server.js
const HEROKU_IDLE_TIMEOUT = 50 * 1000; //50s
setInterval(() => appWs.getWss().clients.forEach((ws) => ws.send("H")), HEROKU_IDLE_TIMEOUT);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
//# sourceMappingURL=server.js.map