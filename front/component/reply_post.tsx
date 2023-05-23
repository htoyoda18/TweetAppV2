import React from 'react';
import { useEffect } from 'react';
import ReplyStyle from '../css/reply.module.css';
import { Icon } from "./icon";
import { useState } from 'react';
import { privateClient } from '../libs/client/axios';
import { ErrorMessages } from '../shared/error';
import { useRouter } from 'next/router';
import { GetSelfUserID } from '../shared/localStorage';
import { UserIconGet } from "../api/client/icon_get"

type ReplyPostProps = {
    tweetID: number;
};

export const ReplyPost = ({ tweetID }: ReplyPostProps) => {
    const [disabled, setDisabled] = useState(true);
    const [reply, setReply] = useState("");
    const router = useRouter();
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const userID = GetSelfUserID()
        const getUserUrl: string = 'v1/user/' + userID
        privateClient
            .get(getUserUrl)
            .then(async (res) => {
                if (res.data) {
                    const iconUrl = await UserIconGet(res.data.icon);
                    setIcon(iconUrl);
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
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setReply(value);
        setDisabled(!value || value.length === 0);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        privateClient
            .post('v1/reply', body)
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
                <Icon image={icon} userID={0} />
                <textarea placeholder='返信をツイート' className={ReplyStyle.replyText} onChange={(e) => handleChange(e)}></textarea>
                <button disabled={disabled} className={ReplyStyle.ReplyBtn}>返信</button>
            </form>
        </div>
    )
}