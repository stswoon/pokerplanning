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
   }
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
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
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


