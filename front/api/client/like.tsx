import { client } from '../../libs/axios';
import { GetToken } from '../../shared/localStorage';
import { AxiosResponse } from "axios";
import { IsLikedByUserType } from "../type/like"

export const AddLike = (tweetID: string) => {
    const intTweetID = parseInt(tweetID);
    const body = {
        tweetID: intTweetID,
    }

    if (isNaN(intTweetID)) {
        return
    }

    const token = GetToken();
    client
        .post('v1/like', body, { headers: { Authorization: token } })
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log("err", err)
        })
}

export const DeleteLike = (tweetID: string) => {
    const url: string = 'v1/like/' + tweetID
    const token = GetToken();
    client
        .delete(url, { headers: { Authorization: token } })
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
        const token = GetToken();
        const res = await client
            .get<IsLikedByUserType>(url, { headers: { Authorization: token } })

        if (res.data.isLikedByUser !== undefined) {
            return res.data.isLikedByUser
        }
        return null;
    } catch (err) {
        console.log("err", err)
    }
}
