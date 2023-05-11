import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import TweetStyle from '../css/tweet_list.module.css';
import { Icon } from "../component/icon"
import { useNavigate } from 'react-router-dom';

export const Tweet = (props) => {
    // const likeCount = () => {
    //     if (props.like > 0) {
    //         return props.like
    //     }
    // }
    // const replyCount = () => {
    //     if (props.replies.length > 0) {
    //         return props.replies.length
    //     }
    // }
    const navigate = useNavigate();
    const handleClick = () => {
        const url = '/tweet_detail/' + props.id
        navigate(url);
    }

    const handleLikeButton = (isLike) => {
        if (isLike) {
            return (
                <div className={TweetStyle.like}><FavoriteBorderIcon /></div>
            );
        }
    }

    const handleReplyButton = (isReply) => {
        if (isReply) {
            return (
                <div className={TweetStyle.reply}><CommentIcon /></div>
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