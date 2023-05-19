import { UserResponse } from './user'
import { ReplyResponse } from './reply'
import { LikeResponse } from './like'

export type TweetResponse = {
    id: number,
    userID: number,
    tweet: string,
    user?: UserResponse,
    replies?: ReplyResponse[],
    likes?: LikeResponse[],
}

export type TweetReqest = {
    tweet: string,
}