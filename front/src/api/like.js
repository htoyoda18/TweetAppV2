import { client } from '../libs/axios'

export const AddLike = (tweetID) => {
    console.log('AddLikeを実行', intTweetID)
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
    console.log('DeleteLikeを実行', tweetID)
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