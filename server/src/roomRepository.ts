import { utils } from "./utils"

export interface RoomId extends String { };
export interface UserId extends String { };

export interface Vote {
    userId: UserId
    userName: string
    cardValue?: number
    rotateAngle?: number
}

export interface Room {
    roomId: RoomId
    createdDate: number
    showCards: boolean
    votes: Map<UserId, Vote>
}

const ROOM_DB = new Map<RoomId, Room>();

const getRoomSafe = (id: RoomId): Room => {
    if (!ROOM_DB.has(id)) {
        throw new Error(`Illegal ROOM_DB state: can't find roomId ${id}`);
    }
    return ROOM_DB.get(id) as Room;
}

const getRoom = (id: RoomId): Room | undefined => utils.deepCopy(ROOM_DB.get(id));

const createRoom = (id: RoomId): void => {
    ROOM_DB.set(id, { roomId: id, createdDate: utils.now(), showCards: false, votes: new Map() });
};

const vote = (roomId: RoomId, userId: UserId, cardValue: number, rotateAngle: number): void => {
    const room: Room = getRoomSafe(roomId);
    const vote = room.votes.get(userId) as Vote;
    if (!vote) {
        throw new Error(`Illegal ROOM_DB state: can't find vote for userId (${userId}) for roomId (${roomId})`);
    }
    vote.cardValue = cardValue;
    vote.rotateAngle = rotateAngle;
}

const addUser = (roomId: RoomId, userId: UserId, userName: string): void => {
    const room: Room = getRoomSafe(roomId);
    room.votes.set(userId, { userId, userName });
}

const removeUser = (roomId: RoomId, userId: UserId): void => {
    const room: Room = getRoomSafe(roomId);
    room.votes.delete(userId);
}

const getRoomIdsOlderThenDate = (filterDate: number): RoomId[] => {
    return Array.from<Room>(ROOM_DB.values())
        .filter((room: Room) => room.createdDate < filterDate)
        .map((room: Room) => room.roomId);
}

const setShowCards = (roomId: RoomId, showCards: boolean): void => {
    getRoomSafe(roomId).showCards = showCards;
}

const clearCards = (roomId: RoomId): void => {
    getRoomSafe(roomId).votes.forEach(vote => {
        vote.cardValue = undefined;
        vote.rotateAngle = undefined;
    });
}

const removeRoom = (roomId: RoomId): void => {
    ROOM_DB.delete(roomId);
}

export const ROOM_DB_API = {
    getRoom,
    removeRoom,
    getRoomSafe,
    createRoom,
    vote,
    addUser,
    removeUser,
    getRoomIdsOlderThenDate,
    setShowCards,
    clearCards
}