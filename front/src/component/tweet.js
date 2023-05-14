import React from 'react';
import TweetStyle from '../css/tweet_list.module.css';
import { Icon } from "../component/icon"
import { useNavigate } from 'react-router-dom';
import { LikeIconAndCount } from '../component/like_btn';
import { ReplyIconAndCount } from '../component/reply';

export const Tweet = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const url = '/tweet_detail/' + props.id;
        navigate(url);
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
                        <ReplyIconAndCount replies={props.replies}/>
                        <LikeIconAndCount likes={props.likes} tweetID={props.tweetID} />
                    </div>
                </form>
            </div>
        </div>
    )
}