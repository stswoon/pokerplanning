const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
const expressWs = require('express-ws')(app);
expressWs(app);
const createRoom = require("./server/roomObservable");

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())

app.get('/api/health', function (req, res) {
  res.send('OK');
});

app.ws('/api/state', function (ws, req) {
  const room = req.params.room;
  createRoom(ws, room, req.body);
});

app.get('/api/enter', function (req, res) {
  res.send('OK');
});

app.get('api/room', function (req, res) {
  res.send('OK');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));





