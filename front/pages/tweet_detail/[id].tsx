import { useEffect } from 'react';
import { NextPage, GetServerSideProps } from "next";
import Sidebar from '../../component/sidebar';
import TweetStyleList from '../../css/tweet_list.module.css';
import TweetDetailStyleList from '../../css/tweet_detail.module.css';
import { privateClient } from '../../libs/client/axios';
import { useCheckToken } from '../../libs/hook/check_token';
import { useState } from 'react';
import { Tweet } from "../../component/tweet";
import { Reply } from "../../component/reply";
import { ReplyPost } from "../../component/reply_post";
import { useRouter } from 'next/router';
import { UserIconGet } from "../../api/client/icon_get";
import { ErrorMessages } from '../../shared/error';
import { TweetResponse } from '../../api/type/tweet';
import { UserResponse } from '../../api/type/user';
import { ReplyResponse } from '../../api/type/reply';
import Head from 'next/head';

interface Props {
    url: string;
}

const TweetDetail: NextPage<Props> = ({ url }) => {
    const [tweetDetail, setTweetDetail] = useState<TweetResponse>({ id: 0, userID: 0, tweet: '' });
    const [replies, setReplies] = useState<ReplyResponse[]>([]);
    const [user, setUser] = useState<UserResponse>({ id: 0, name: '', email: '', introduction: '', icon: '' });
    const router = useRouter();
    const [icon, setIcon] = useState('');
    const [iconUrls, setIconUrls] = useState({});

    useCheckToken()

    useEffect(() => {
        const TweetDetailGet = () => {
            privateClient
                .get<TweetResponse>(url)
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
    }, [router]);

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
            <Head>
                <title>{user.name + 'さんのツイート'}</title>
            </Head>
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
                />
                {replies.map((reply: ReplyResponse, key) => {
                    return (
                        <Reply
                            key={key}
                            userID={reply.userID}
                            userName={reply.user.name}
                            tweet={reply.reply}
                            iconUrl={iconUrls[reply.user.id]}
                        />
                    )
                })}
            </div>
        </div>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const url: string = 'v1/tweet_detail/' + id;

    // 必要なデータをここで取得し、propsとして返します。
    return { props: { url } };
}

export default TweetDetail;