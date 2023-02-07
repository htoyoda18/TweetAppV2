import React from 'react';
import ReplyStyle from '../css/reply.module.css';
import { Icon } from "../component/shared"

export const Reply = () => {
    return (
        <div className={ReplyStyle.Reply}>
            <form>
                <Icon image="https://www.tv-tokyo.co.jp/anime/youkai-watch/sp/images/chara/sp22.jpg" />
                <textarea placeholder='返信をツイート' className={ReplyStyle.replyText}></textarea>
                <button className={ReplyStyle.ReplyBtn}>返信</button>
            </form>
        </div>
    )
}