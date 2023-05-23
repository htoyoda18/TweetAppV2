import { privateClient } from '../../libs/client/axios';
import { IsLikedByUserType } from "../type/like"

export const AddLike = (tweetID: string) => {
    const intTweetID = parseInt(tweetID);
    const body = {
        tweetID: intTweetID,
    }

    if (isNaN(intTweetID)) {
        return
    }

    privateClient
        .post('v1/like', body)
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log("err", err)
        })
}

export const DeleteLike = (tweetID: string) => {
    const url: string = 'v1/like/' + tweetID
    privateClient
        .delete(url)
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log("err", err)
        })
}

export const IsLikedByUser = async (tweetID: string) => {
    if (tweetID === undefined) {
        return
    }
    try {
        const url: string = 'v1/like/' + tweetID
        const res = await privateClient
            .get<IsLikedByUserType>(url)

        if (res.data.isLikedByUser !== undefined) {
            return res.data.isLikedByUser
        }
        return null;
    } catch (err) {
        console.log("err", err)
    }
}
