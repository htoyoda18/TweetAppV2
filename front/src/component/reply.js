import React from 'react';
import ReplyStyle from '../css/reply.module.css';
import { Icon } from "../component/shared"
import { useState } from 'react';
import { client } from '../libs/axios'

export const Reply = () => {
	const [disabled, setDisabled] = useState(true);
    const [reply, setReply] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
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
		}
        const token = localStorage.getItem('token')
		client
			.post('v1/reply', body, { headers: { Authorization: token } })
			.then((res) => {
			})
			.catch((err) => {
				console.log("err", err.response)
			})
	}
    return (
        <div className={ReplyStyle.Reply}>
            <form onSubmit={() => handleSubmit()}>
                <Icon image="https://www.tv-tokyo.co.jp/anime/youkai-watch/sp/images/chara/sp22.jpg" />
                <textarea placeholder='返信をツイート' className={ReplyStyle.replyText} onChange={(e) => handleChange(e)} onClick={(e) => handleChange(e)}></textarea>
                <button disabled={disabled} className={ReplyStyle.ReplyBtn}>返信</button>
            </form>
        </div>
    )
}