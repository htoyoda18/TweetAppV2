import React, { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import TweetStyle from '../css/tweet_list.module.css';
import { Icon } from "../component/icon"
import { useNavigate } from 'react-router-dom';

export const Tweet = (props) => {
    const navigate = useNavigate();
    const [likeCount, setLikeCount] = useState(0);
    const [replyCount, setReplyCount] = useState(0);
    const [likeStyle, setLikeStyle] = useState({});
    const [isLikePush, setIsLikePush] = useState(true);

    useEffect(() => {
        if (props.likes !== undefined && props.likes.length > 0) {
            setLikeCount(props.likes.length);
        }
        if (props.replies !== undefined && props.replies.length > 0) {
            setReplyCount(props.replies.length);
        }
        handleLikeClick();
    }, [props.likes, props.replies]);

    const handleClick = () => {
        const url = '/tweet_detail/' + props.id;
        navigate(url);
    }

    const handleLikeClick = () => {
        setIsLikePush(!isLikePush)
        if (isLikePush) {
            setLikeStyle({
                color: 'rgb(249, 24, 128)',
            });
        } else {
            setLikeStyle({
                color: 'black',
            });
        }
    }

    const handleLikeButton = (isLike) => {
        if (isLike) {
            return (
                <div className={TweetStyle.like}>
                    <div onClick={handleLikeClick} style={likeStyle}>
                        {isLikePush ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                    </div>
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
                        {handleLikeButton(props.isLike)}
                    </div>
                </form>
            </div>
        </div>
    )
}
