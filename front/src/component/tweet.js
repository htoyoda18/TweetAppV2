import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import TweetStyle from '../css/tweet_list.module.css';
import { Icon } from "../component/shared"

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
    return (
        <div className={TweetStyle.Tweet}>
            <div className={TweetStyle.tweetContent}>
                <a className={TweetStyle.detailLink} href={"tweet_detail/" + props.id}>
                    <form>
                        <div className={TweetStyle.Section1}>
                            <Icon image={props.image} userID={props.userID} />
                            <div className={TweetStyle.content}>
                                <div className={TweetStyle.userName}>{props.userName}</div>
                                <div className={TweetStyle.tweet}>{props.tweet}</div>
                            </div>
                        </div>
                        <div className={TweetStyle.Section2}>
                            <div className={TweetStyle.reply}><CommentIcon /></div>
                            <div className={TweetStyle.like}><FavoriteBorderIcon /></div>
                        </div>
                    </form>
                </a>
            </div>
        </div>
    )
}