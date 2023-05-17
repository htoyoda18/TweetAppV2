import { useEffect } from 'react';
import { NextPage } from "next";
import Sidebar from '../../component/sidebar'
import TweetStyleList from '../../css/tweet_list.module.css';
import TweetDetailStyleList from '../../css/tweet_detail.module.css';
import { client } from '../../libs/axios'
import { useState } from 'react';
import { Tweet } from "../../component/tweet"
import { Reply } from "../../component/reply"
import { ReplyPost } from "../../component/reply_post"
import { useRouter } from 'next/router'
import { UserIconGet } from "../../api/icon_get"
import { ErrorMessages } from '../../shared/error'
import { GetToken } from '../../shared/localStorage'

interface User {
    id?: number,
    name?: string,
    icon?: Blob,
}

interface Like {
    id?: number,
    userID?: number,
    tweetID?: number,
}

interface ReplyType {
    reply?: string,
    userID?: number,
    userName?: string,
    user: User,
}

interface TweetDetail {
    id?: number,
    tweet?: string,
    replies?: ReplyType[],
    likes?: Like[],
}

const TweetDetail: NextPage = () => {
    const [tweetDetail, setTweetDetail] = useState<TweetDetail>({id: 0, tweet: '', replies: null, likes: null});
    const [replies, setReplies] = useState<ReplyType[]>([]);
    const [user, setUser] = useState<User>({id: 0, name: ''});
    const token = GetToken();
    const router = useRouter();
    const [icon, setIcon] = useState('');
    const [iconUrls, setIconUrls] = useState({});

    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }
        const TweetDetailGet = () => {
            const { id } = router.query
            const url = 'v1/tweet_detail/' + id
            client
                .get(url, { headers: { Authorization: token } })
                .then(async (res) => {
                    if (res.data !== undefined) {
                        setTweetDetail(res.data)
                        setUser(res.data.user)
                        setReplies(res.data.replies)
                        if (res.data.user.icon !== undefined) {
                            const iconUrl = await UserIconGet(res.data.user.icon);
                            setIcon(iconUrl);
                        }
                    }
                })
                .catch((err) => {
                    console.log("err", err)
                    if (!err.response || !err.response.data) {
                        return
                    }
                    switch (err.response.data) {
                        case ErrorMessages.FailAuthToken:
                            router.push('/login');
                            break;
                        case ErrorMessages.RecordNotFound:
                            router.push('/not_found');
                            break;
                        default:
                            console.log("err", err.response)
                    }
                })
        }
        TweetDetailGet()
    }, [token, router]);

    useEffect(() => {
        const fetchIcons = async () => {
            let newIconUrls = { ...iconUrls }; // 現在のiconUrlsをコピー
            for (const reply of replies) {
                if (reply.user.icon !== undefined && !(reply.userID in newIconUrls)) { // 既に取得済みのユーザーのアイコンは取得しない
                    const iconUrl = await UserIconGet(reply.user.icon);
                    newIconUrls = { ...newIconUrls, [reply.userID]: iconUrl };
                }
            }
            setIconUrls(newIconUrls);
        };
        fetchIcons();
    }, [replies]);

    return (
        <div className={TweetStyleList.TweetList}>
            <Sidebar />
            <div className={TweetDetailStyleList.tweetDetail}>
                <Tweet
                    userID={user.id}
                    userName={user.name}
                    tweet={tweetDetail.tweet}
                    tweetID={tweetDetail.id}
                    replies={tweetDetail.replies}
                    likes={tweetDetail.likes}
                    iconUrl={icon}
                />
                <ReplyPost
                    tweetID={tweetDetail.id}
                    iconUrl={icon}
                />
                {replies.map((value: ReplyType, key) => {
                    return (
                        <Reply
                            key={key}
                            userID={value.userID}
                            userName={value.user.name}
                            tweet={value.reply}
                            iconUrl={iconUrls[value.user.id]}
                        />
                    )
                })}
            </div>
        </div>
    )
};

export default TweetDetail;