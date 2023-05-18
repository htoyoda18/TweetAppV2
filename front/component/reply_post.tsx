import React from 'react';
import ReplyStyle from '../css/reply.module.css';
import { Icon } from "./icon";
import { useState } from 'react';
import { client } from '../libs/axios';
import { ErrorMessages } from '../shared/error';
import { useRouter } from 'next/router';
import { GetToken } from '../shared/localStorage';

export const ReplyPost = ({ tweetID, iconUrl }) => {
    const [disabled, setDisabled] = useState(true);
    const [reply, setReply] = useState("");
    const router = useRouter();

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
        const token = GetToken()
        client
            .post('v1/reply', body, { headers: { Authorization: token } })
            .then((res) => {
                if (typeof window !== 'undefined') {
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log("err", err)
                if (!err.response || !err.response.data) {
                    return
                }
                if (err.response.data === ErrorMessages.FailAuthToken) {
                    router.push('/login');
                }
            })
    }
    return (
        <div className={ReplyStyle.Reply}>
            <form className={ReplyStyle.form} onSubmit={(e) => handleSubmit(e)}>
                <Icon image={iconUrl} userID='0' />
                <textarea placeholder='返信をツイート' className={ReplyStyle.replyText} onChange={(e) => handleChange(e)}></textarea>
                <button disabled={disabled} className={ReplyStyle.ReplyBtn}>返信</button>
            </form>
        </div>
    )
}