//---- greetings

function initGreetingForm() {
    const createRoomButton = document.getElementById("createRoomButton");
    createRoomButton.disabled = true;
    const backToRoomButton = document.getElementById("backToRoomButton");

    const redirectRoomId = getQueryParameter("redirectRoomId");
    if (redirectRoomId) {
        backToRoomButton.classList.remove("_hidden");
    } else {
        createRoomButton.classList.remove("_hidden");
    }

    let userId = getCookie("userId");
    if (!userId) {
        userId = uuidv4();
        setCookie("userId", userId);
    }

    const userName = getCookie("userName");
    if (userName) {
        document.getElementById("userNameInput").value = userName;
        createRoomButton.disabled = false;
    }
}

function saveUserName(name) {
    setCookie("userName", name);
    const createRoomButton = document.getElementById("createRoomButton");
    if (name) {
        createRoomButton.disabled = false;
    } else {
        createRoomButton.disabled = true;
    }
}

function createRoom() {
    const roomId = uuidv4();
    redirect(`/room?roomId=${roomId}`);
}

function backToRoom() {
    const redirectRoomId = getQueryParameter("redirectRoomId");
    redirect(`/room?roomId=${redirectRoomId}`);
}

//---- room

function initRoom() {
    const userName = getCookie("userName");
    if (!userName) {
        const roomId = getQueryParameter("roomId");
        redirect(`/?redirectRoomId=${roomId}`)
    } else {
        attachToRoom();
    }
}

let ws;
let wsTry = 0;

function attachToRoom() {
    const roomId = getQueryParameter('roomId');
    const userId = getCookie('userId');
    const userName = getCookie('userName');
    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    ws = new WebSocket(`${wsProtocol}://${window.location.host}/api/roomState?roomId=${roomId}&userId=${userId}&userName=${userName}`);

    ws.onopen = function () {
        console.log("Соединение установлено.");
        wsTry = 0;
    };

    ws.onclose = function (event) {
        if (event.wasClean) {
            console.error('Соединение закрыто чисто');
        } else {
            console.error('Обрыв соединения');
            wsTry++;
            if (wsTry < 5) {
                console.log('Try again');
                setTimeout(() => {
                    attachToRoom();
                }, wsTry * 1000);
            } else {
                console.error("No tries");
                alert("Try to reload page or service not exist");
            }
        }
        console.error('Код: ' + event.code + ' причина: ' + event.reason);
    };

    ws.onerror = function (error) {
        console.error("WS error:" + error.message);
    };

    ws.onmessage = function (event) {
        console.log("Получены данные " + event.data);
        drawRoom(event.data)
    };
}

function drawRoom(data) {
    const room = JSON.parse(data);
    console.trace(data);
    let result = Object.keys(room.votes).map(voteKey => {
        const vote = room.votes[voteKey];
        let cardValue = vote.cardValue;
        if (!room.flipCards) {
            cardValue = cardValue ? "??" : "wait"
        }
        return `<div>${vote.userName} : ${cardValue}</div>`;
    }).join("\n");
    document.getElementById('info').innerHTML = result;
}

function flipCards() {
    ws.send("flipCards");
}

function clearCards() {
    ws.send("clearCards");
}

function throwCard(value) {
    const userId = getCookie('userId');
    ws.send(JSON.stringify({vote: {userId: userId, cardValue: value}}));
}

//---- utils

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];
    }
}

function setCookie(name, value) {
    document.cookie = `${name}=${value}`;
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function redirect(relativeUrl) {
    window.location.href = relativeUrl;
}

function getQueryParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}


