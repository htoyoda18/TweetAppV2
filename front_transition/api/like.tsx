import { client } from '../libs/axios'
import { GetToken } from '../shared/token'

export const AddLike = (tweetID) => {
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

export const DeleteLike = (tweetID) => {
    const url = 'v1/like/' + tweetID
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

export const IsLikedByUser = async (tweetID) => {
    if (tweetID === undefined) {
        return
    }
    try {
        const url = 'v1/like/' + tweetID
        const token = GetToken();
        const res = await client.get(url, { headers: { Authorization: token } })

        if (res.data.isLikedByUser !== undefined) {
            return res.data.isLikedByUser
        }
        return null;
    } catch (err) {
        console.log("err", err)
    }
}
