import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import TweetStyleList from '../css/tweet_list.module.css';

export const Tweet = (props) => {
    const likeCount = () => {
        if (props.like > 0) {
            return props.like
        }
    }
    const replyCount = () => {
        if (props.reply > 0) {
            return props.reply
        }
    }
    return (
        <div className={TweetStyleList.Tweet}>
            <div className={TweetStyleList.tweetContent}>
                <a className={TweetStyleList.detailLink} href={"tweet_detail/" + props.id}>
                    <form>
                        <div className={TweetStyleList.Section1}>
                            <img className={TweetStyleList.icon} src={props.image}></img>
                            <div className={TweetStyleList.content}>
                                <div className={TweetStyleList.userName}>{props.userName}</div>
                                <div className={TweetStyleList.tweet}>{props.tweet}</div>
                            </div>
                        </div>
                        <div className={TweetStyleList.Section2}>
                            <div className={TweetStyleList.reply}><CommentIcon />{replyCount()}</div>
                            <div className={TweetStyleList.like}><FavoriteBorderIcon />{likeCount()}</div>
                        </div>
                    </form>
                </a>
            </div>
        </div>
    )
}