import React, { useState, useEffect } from 'react';
import TweetStyle from '../styles/tweet_list.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AddLike, DeleteLike, IsLikedByUser } from '../api/client/like';

const likeColor = 'rgb(249, 24, 128)';

export const LikeIconAndCount = ({ likes, tweetID }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [likeStyle, setLikeStyle] = useState({});
    const [isLikePush, setIsLikePush] = useState(false);

    useEffect(() => {
        if (likes !== undefined && likes !== null && likes.length > 0) {
            setLikeCount(likes.length);
        }
    }, [likes]);

    useEffect(() => {
        const isLikedByUser = async () => {
            const isLiked = await IsLikedByUser(tweetID)
            if (isLiked) {
                setIsLikePush(true)
                setLikeStyle({
                    color: likeColor,
                });
            } else {
                setIsLikePush(false)
            }
        }
        isLikedByUser()
    }, [tweetID]);

    const handleLikeClick = (): void => {
        if (isLikePush) {
            DeleteLike(tweetID)
            setLikeCount(likeCount - 1)
        } else {
            AddLike(tweetID)
            setLikeCount(likeCount + 1)
            setLikeStyle({
                color: likeColor,
            });
        }
        setIsLikePush(!isLikePush)
    }

    const handleMouseEnter = (): void => {
        if (isLikePush) {
            setLikeStyle({
                color: likeColor,
                opacity: 0.7,
                cursor: 'pointer',
            });
        } else {
            setLikeStyle({
                color: likeColor,
                cursor: 'pointer',
            });
        }
    }

    const handleMouseLeave = (): void => {
        setLikeStyle({
            color: isLikePush ? likeColor : 'black',
        });
    }

    return (
        <div>
            <div
                className={TweetStyle.like}
                onClick={handleLikeClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div style={likeStyle}>{isLikePush ? <FavoriteIcon /> : <FavoriteBorderIcon />}</div>
                <div className={TweetStyle.likeCount} style={likeStyle}>{likeCount > 0 && likeCount}</div>
            </div>
        </div>
    )
}