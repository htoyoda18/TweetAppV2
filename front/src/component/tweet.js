import React, { useState, useEffect } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import TweetStyle from '../css/tweet_list.module.css';
import { Icon } from "../component/icon"
import { useNavigate } from 'react-router-dom';
import { Like } from '../component/like_btn';

export const Tweet = (props) => {
    const navigate = useNavigate();
    const [replyCount, setReplyCount] = useState(0);

    useEffect(() => {
        if (props.replies !== undefined && props.replies.length > 0) {
            setReplyCount(props.replies.length);
        }
    }, [props.likes, props.replies]);

    const handleClick = () => {
        const url = '/tweet_detail/' + props.id;
        navigate(url);
    }

    const handleReplyButton = (isReply) => {
        if (isReply) {
            return (
                <div className={TweetStyle.reply}>
                    <div><CommentIcon /></div>
                    <div className={TweetStyle.replyCount}>{replyCount}</div>
                </div>
            );
        }
    }

    return (
        <div className={TweetStyle.Tweet}>
            <div className={TweetStyle.tweetContent}>
                <form>
                    <div className={TweetStyle.Section1} onClick={handleClick}>
                        <Icon image={props.iconUrl} userID={props.userID} />
                        <div className={TweetStyle.content}>
                            <div className={TweetStyle.userName}>{props.userName}</div>
                            <div className={TweetStyle.tweet}>{props.tweet}</div>
                        </div>
                    </div>
                    <div className={TweetStyle.Section2}>
                        {handleReplyButton(props.isReply)}
                        <Like isLike={props.isLike} likes={props.likes} tweetID={props.tweetID} />
                    </div>
                </form>
            </div>
        </div>
    )
}