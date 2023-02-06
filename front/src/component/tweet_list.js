import React from 'react'
import TweetStyleList from '../css/tweet_list.module.css';

export const TweetList = (props) => {
    const [likes, setLikes] = useState();
    // const [replys, setReply] = useState();
    const tweetList = props.value
    // const reply = (e) => {
    //     if (e > 0) {
    //         setReply(e)
    //     }
    //     return replys
    // }
    const like = (e) => {
        if (e > 0) {
            setLikes(e)
        }
        return likes
    }
    return (
        <div className={TweetStyleList.TweetList}>
            {tweetList.value((value, key) => {
                <form>
                    <div className={TweetStyleList.Section1}>
                        <img className={TweetStyleList.icon} src='https://sp-akiba-souken.k-img.com/images/vote/000/170/170628.jpg'></img>
                        <div className={TweetStyleList.content}>
                            <div className={TweetStyleList.userName}>{value.userName}</div>
                            <div className={TweetStyleList.tweet}>{value.tweet}</div>
                        </div>
                    </div>
                    <div className={TweetStyleList.Section2}>
                        <div className={TweetStyleList.reply}><CommentIcon />{like(value.like)}</div>
                        <div className={TweetStyleList.like}><FavoriteBorderIcon /></div>
                    </div>
                </form>
            })}
        </div>
    )
}