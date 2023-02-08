import React from 'react'
import Sidebar from '../component/sidebar'
import { UserInfo } from '../component/user_info'
import TweetStyle from '../css/tweet.module.css';

export const User = () => {
    return (
        <div className={TweetStyle.Tweet}>
            <Sidebar />
            <UserInfo />
        </div>
    )
}
