import React from 'react';
import TweetStyle from '../css/tweet_list.module.css';
import { Icon } from "../component/icon"
import { useNavigate } from 'react-router-dom';
import { LikeIconAndCount } from '../component/like_btn';
import { ReplyIconAndCount } from '../component/reply';

export const Tweet = ({ iconUrl, userID, userName, tweet, replies, likes, tweetID }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const url = '/tweet_detail/' + tweetID;
        navigate(url);
    }

    return (
        <div className={TweetStyle.Tweet}>
            <div className={TweetStyle.tweetContent}>
                <form>
                    <div className={TweetStyle.Section1} onClick={handleClick}>
                        <Icon image={iconUrl} userID={userID} />
                        <div className={TweetStyle.content}>
                            <div className={TweetStyle.userName}>{userName}</div>
                            <div className={TweetStyle.tweet}>{tweet}</div>
                        </div>
                    </div>
                    <div className={TweetStyle.Section2}>
                        <ReplyIconAndCount replies={replies} />
                        <LikeIconAndCount likes={likes} tweetID={tweetID} />
                    </div>
                </form>
            </div>
        </div>
    )
}