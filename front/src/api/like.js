import { client } from '../libs/axios'

export const AddLike = (tweetID) => {
    const intTweetID = parseInt(tweetID);
    const body = {
        tweetID: intTweetID,
    }

    if (isNaN(intTweetID)) {
        return
    }

    const token = localStorage.getItem('token')
    client
        .post('v1/like', body, { headers: { Authorization: token } })
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log("err", err.response)
        })
}

export const DeleteLike = (tweetID) => {
    const url = 'v1/like/' + tweetID
    const token = localStorage.getItem('token')
    client
        .delete(url, { headers: { Authorization: token } })
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log("err", err.response)
        })
}