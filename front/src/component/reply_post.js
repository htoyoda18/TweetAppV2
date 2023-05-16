import React from 'react';
import ReplyStyle from '../css/reply.module.css';
import { Icon } from "./icon"
import { useState } from 'react';
import { client } from '../libs/axios'
import { useNavigate } from 'react-router-dom';
import { ErrorMessages } from '../shaerd/error'

export const ReplyPost = ({tweetID, iconUrl}) => {
    const [disabled, setDisabled] = useState(true);
    const [reply, setReply] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value } = e.target;
        setReply(value);
        setDisabled(!value || value.length === 0);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (reply.length < 1) {
            setDisabled(true)
            return;
        }
        postReply();
    }

    const postReply = () => {
        const body = {
            reply: reply.trim(),
            tweetID: tweetID,
        }
        const token = localStorage.getItem('token')
        client
            .post('v1/reply', body, { headers: { Authorization: token } })
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log("err", err)
                if (!err.response || !err.response.data) {
                    return
                }
                if (err.response.data === ErrorMessages.FailAuthToken) {
                    navigate('/login');
                }
            })
    }
    return (
        <div className={ReplyStyle.Reply}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Icon image={iconUrl} />
                <textarea placeholder='返信をツイート' className={ReplyStyle.replyText} onChange={(e) => handleChange(e)}></textarea>
                <button disabled={disabled} className={ReplyStyle.ReplyBtn}>返信</button>
            </form>
        </div>
    )
}