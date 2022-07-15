# Porker planning

Backend:

- [x] /api/health
- [x] static 
- ws://api/roomState?roomId={roomId}&userId={userId}&userName={userName}
  - on connect addUser {id, name} and create room if empty
  - on disconnect removeUser {id}
  - card {id, cardValue}
  - clear {}
  - flip {}

Frontend

* /?backToRoom={id}
  * set name and show create room
  * change name
  * if `?backToRoom` then set name and redirect to `/room`
* /room?roomId
  * if userName empty in cookie then redirect to `/?redirectRoomId={id}`
  * create room
  * run ws connect
  * send addUser command
  * buttons: `clear`, `flip`

