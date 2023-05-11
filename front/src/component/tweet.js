import React, {useState, useEffect} from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import TweetStyle from '../css/tweet_list.module.css';
import { Icon } from "../component/icon"
import { useNavigate } from 'react-router-dom';
import { UserIconGet } from "../api/icon_get"

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
    const [iconUrl, setIconUrl] = useState("");
    const navigate = useNavigate();
    const handleClick = () => {
        const url = '/tweet_detail/' + props.id
        navigate(url);
    }

    useEffect(() => {
			const getIconUrl = async () => {
				if (props.image !== "") {
					try {
						const url = await UserIconGet(props.image);
						setIconUrl(url);
					} catch (err) {
						console.log("err", err.response);
					}
				}
			};
			getIconUrl();
		}, [props.image]);
    return (
        <div className={TweetStyle.Tweet} onClick={handleClick}>
            <div className={TweetStyle.tweetContent}>
                    <form>
                        <div className={TweetStyle.Section1}>
                            <Icon image={iconUrl} userID={props.userID} />
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
            </div>
        </div>
    )
}