import React, { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import TweetStyle from '../css/tweet_list.module.css';
import { Icon } from "../component/icon"
import { useNavigate } from 'react-router-dom';

export const Tweet = (props) => {
    const navigate = useNavigate();
    const [likeCount, setLikeCount] = useState(0);
    const [replyCount, setReplyCount] = useState(0);

    useEffect(() => {
        if (props.like > 0) {
            setLikeCount(props.like);
        }
        if (props.replies !== undefined && props.replies.length > 0) {
            setReplyCount(props.replies.length);
        }
    }, [props.like, props.replies]);

    const handleClick = () => {
        const url = '/tweet_detail/' + props.id;
        navigate(url);
    }

    const handleLikeButton = (isLike) => {
        if (isLike) {
            return (
                <div className={TweetStyle.like}>
                    <div><FavoriteBorderIcon /></div>
                    <div className={TweetStyle.likeCount}>{likeCount}</div>
                </div>
            );
        }
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
        <div className={TweetStyle.Tweet} onClick={handleClick}>
            <div className={TweetStyle.tweetContent}>
                <form>
                    <div className={TweetStyle.Section1}>
                        <Icon image={props.iconUrl} userID={props.userID} />
                        <div className={TweetStyle.content}>
                            <div className={TweetStyle.userName}>{props.userName}</div>
                            <div className={TweetStyle.tweet}>{props.tweet}</div>
                        </div>
                    </div>
                    <div className={TweetStyle.Section2}>
                        {handleReplyButton(props.isReply)}
                        {handleLikeButton(props.isLike)}
                    </div>
                </form>
            </div>
        </div>
    )
}
