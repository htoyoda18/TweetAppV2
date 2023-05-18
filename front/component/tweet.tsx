import React from 'react';
import TweetStyle from '../css/tweet_list.module.css';
import { Icon } from "./icon"
import { useRouter } from 'next/router'
import { LikeIconAndCount } from './like_btn';
import { ReplyIconAndCount } from './reply';

export const Tweet = ({ iconUrl, userID, userName, tweet, replies, likes, tweetID }) => {
    const router = useRouter();

    const handleClick = () => {
        const url: string = '/tweet_detail/' + tweetID;
        router.push(url);
    }

    return (
        <div className={TweetStyle.Tweet}>
            <div className={TweetStyle.tweetContent}>
                <form>
                    <div className={TweetStyle.Section1} onClick={handleClick}>
                        <Icon
                            image={iconUrl}
                            userID={userID}
                        />
                        <div className={TweetStyle.content}>
                            <div className={TweetStyle.userName}>{userName}</div>
                            <div className={TweetStyle.tweet}>{tweet}</div>
                        </div>
                    </div>
                    <div className={TweetStyle.Section2}>
                        <ReplyIconAndCount replies={replies} />
                        <LikeIconAndCount
                            likes={likes}
                            tweetID={tweetID}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}