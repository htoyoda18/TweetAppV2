import React from 'react';
import ReplyStyle from '../css/reply.module.css';
import { Icon } from "../component/icon"
import { useState } from 'react';
import { client } from '../libs/axios'
import TweetStyle from '../css/tweet_list.module.css';
import { useNavigate } from 'react-router-dom';

export const ReplyPost = (props) => {
    const [disabled, setDisabled] = useState(true);
    const [reply, setReply] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value } = e.target;
        setReply(value)
        if (reply.length > 0) {
            setDisabled(false)
            return
        }
        if (reply.length < 1) {
            setDisabled(true)
            return
        }
    }
    const handleSubmit = () => {
        if (reply.length < 1) {
            setDisabled(true)
            return
        }
        ReplyPost()
    }
    const ReplyPost = () => {
        const body = {
            reply: reply.trim(),
            tweetID: props.tweetID,
        }
        const token = localStorage.getItem('token')
        client
            .post('v1/reply', body, { headers: { Authorization: token } })
            .then((res) => {
            })
            .catch((err) => {
                console.log("err", err.response)
                if (err.response.data === 'Fail auth token') {
                    navigate('/login');
                }
            })
    }
    return (
        <div className={ReplyStyle.Reply}>
            <form onSubmit={() => handleSubmit()}>
                <Icon image={props.iconUrl} />
                <textarea placeholder='返信をツイート' className={ReplyStyle.replyText} onChange={(e) => handleChange(e)} onClick={(e) => handleChange(e)}></textarea>
                <button disabled={disabled} className={ReplyStyle.ReplyBtn}>返信</button>
            </form>
        </div>
    )
}

export const Reply = (props) => {
    return (
        <div className={TweetStyle.Tweet}>
            <div className={TweetStyle.tweetContent}>
                <form>
                    <div className={TweetStyle.Section1}>
                        <Icon image={props.iconUrl} userID={props.userID} />
                        <div className={TweetStyle.content}>
                            <div className={TweetStyle.userName}>{props.userName}</div>
                            <div className={TweetStyle.tweet}>{props.reply}</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}