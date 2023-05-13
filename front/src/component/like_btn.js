import React, { useState, useEffect } from 'react';
import TweetStyle from '../css/tweet_list.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Like = (props) => {
    const [likeCount, setLikeCount] = useState(0);
    const [likeStyle, setLikeStyle] = useState({});
    const [isLikePush, setIsLikePush] = useState(true);
    const likeColor = 'rgb(249, 24, 128)';

    useEffect(() => {
        if (props.likes !== undefined && props.likes.length > 0) {
            setLikeCount(props.likes.length);
        }
    }, [props.likes]);

    const handleLikeClick = () => {
        setIsLikePush(!isLikePush)
        setLikeStyle(prevStyle => ({
            ...prevStyle,
            color: isLikePush ? likeColor : 'black',
        }));
    }

    const handleMouseEnter = () => {
        setLikeStyle({
            color: likeColor,
            cursor: 'pointer',
        });
    }

    const handleMouseLeave = () => {
        setLikeStyle({
            color: isLikePush ? 'black' : likeColor,
            cursor: 'pointer',
        });
    }

    return (
        <div>
            {props.isLike && (
                <div
                    className={TweetStyle.like}
                    onClick={handleLikeClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div style={likeStyle}>{isLikePush ? <FavoriteBorderIcon /> : <FavoriteIcon />}</div>
                    <div className={TweetStyle.likeCount} style={likeStyle}>{likeCount}</div>
                </div>
            )}
        </div>
    )
}