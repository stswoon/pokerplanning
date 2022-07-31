import utils from "@/utils";
import type {Room} from "@/modules/room/room.model";

let ws: WebSocket;

const setUserId = (userId: string): void => localStorage.setItem("userId", userId);
const getUserId = (): string | null => localStorage.getItem("userId");
const setUserName = (userName: string): void => localStorage.setItem("userName", userName);
const getUserName = (): string | null => localStorage.getItem("userName");

function attachWsToRoom(callback: (data: Room) => void) {
    let wsTry = 0;
    const MAX_TRIES = 5;
    const CONNECTION_TIMEOUT = 30 * 1000;

    const roomId = utils.getQueryParameter('roomId');
    const userId = getUserId();
    const userName = getUserName();
    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    ws = new WebSocket(`${wsProtocol}://${window.location.host}/api/roomState?roomId=${roomId}&userId=${userId}&userName=${userName}`);

    const wsConnectionTimeoutId = setTimeout(() => {
        console.error("Failed to connect WS after 30 sec");
        ws.close(5000, "Client 30 sec timeout");
    }, CONNECTION_TIMEOUT);

    ws.onopen = () => {
        console.info("WS connected");
        wsTry = 0;
        clearTimeout(wsConnectionTimeoutId);
    };

    ws.onclose = (event: CloseEvent) => {
        clearTimeout(wsConnectionTimeoutId);
        if (event.wasClean) {
            console.error('WS closed normally');
        } else {
            console.error('WS interrupted');
            if (wsTry < MAX_TRIES) {
                console.log('Try connect again');
                setTimeout(() => attachWsToRoom(callback), ++wsTry * 1000);
            } else {
                console.error("SYSTEM ERROR: Can't connect to server, achieved max count of attempts");
                alert("SYSTEM ERROR: Can't connect to server");
            }
        }
        console.debug(`WS error code ${event.code} and reason ${event.reason}`);
    };

    ws.onerror = (error: any) => console.error("WS error:" + error.message);

    ws.onmessage = (event: MessageEvent) => {
        console.debug("WS data", event.data);
        if (event.data === "H") {
            console.debug("heart-bit");
        } else {
            callback(JSON.parse(event.data));
        }
    };
}

const flipCards = () => ws.send("flipCards");

const clearCards = () => ws.send("clearCards");

function throwCard(cardValue: number | string) {
    const userId = getUserId();
    ws.send(JSON.stringify({vote: {userId, cardValue}}));
}

export const roomService = {
    attachWsToRoom,
    throwCard,
    flipCards,
    clearCards,
    setUserId,
    getUserId,
    setUserName,
    getUserName
}
