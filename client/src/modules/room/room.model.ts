import type {JsMap} from "@/utils";

export type RoomId = string;
export type UserId = string;

export interface Vote {
    userId: UserId
    userName: string
    cardValue?: number
    rotateAngle?: number
}

export interface Room {
    id: RoomId
    createdDate: number
    showCards: boolean
    votes: JsMap<UserId, Vote>
}
