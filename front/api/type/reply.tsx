import { UserResponse } from './user'


export type ReplyResponse = {
    tweetID: number,
    userID: number,
    reply: string,
    user?: UserResponse,
}