import React, { useState, useEffect } from 'react';
import TweetStyle from '../css/tweet_list.module.css';
import { Icon } from "./icon"
import CommentIcon from '@mui/icons-material/Comment';

type ReplyProps = {
    iconUrl: string;
    userID: number;
    userName: string;
    tweet: string;
};

export const Repl: React.FC<ReplyProps> = ({ iconUrl, userID, userName, tweet }) => {

    return (
        <div className={TweetStyle.Tweet}>
            <div className={TweetStyle.tweetContent}>
                <form>
                    <div className={TweetStyle.Section1}>
                        <Icon
                            image={iconUrl}
                            userID={userID}
                        />
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

export const ReplyIconAndCount = ({ replies }) => {
    const [replyCount, setReplyCount] = useState(0);

    useEffect(() => {
        if (replies !== undefined && replies !== null && replies.length > 0) {
            setReplyCount(replies.length);
        }
    }, [replies]);

    return (
        <div className={TweetStyle.reply}>
            <div><CommentIcon /></div>
            <div className={TweetStyle.replyCount}>{replyCount > 0 && replyCount}</div>
        </div>
    )
}