import React from 'react';
import TweetStyle from '../css/tweet_list.module.css';
import { Icon } from "../component/icon"

export const Reply = ({iconUrl, userID, userName, tweet}) => {

    return (
        <div className={TweetStyle.Tweet}>
            <div className={TweetStyle.tweetContent}>
                <form>
                    <div className={TweetStyle.Section1}>
                        <Icon image={iconUrl} userID={userID} />
                        <div className={TweetStyle.content}>
                            <div className={TweetStyle.userName}>{userName}</div>
                            <div className={TweetStyle.tweet}>{tweet}</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}