import { NextPage } from "next";
import { useState } from 'react';
import Sidebar from '../../component/sidebar'
import TweetStyle from '../../styles/tweet.module.css';
import sharedStyle from '../../styles/shared.module.css';
import { privateClient } from '../../api/client/axios'
import { useRouter } from 'next/router'
import { ApiErrorMessages } from '../../shared/error'
import { TweetReqest } from '../../api/type/tweet'
import { useCheckToken } from '../../libs/hook/check_token';
import Head from 'next/head';

const Tweet: NextPage = () => {
    const [tweet, setTweet] = useState("");
    const router = useRouter();

    useCheckToken()

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const tweet = e.target.value;
        setTweet(tweet);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const body: TweetReqest = {
            tweet: tweet
        }
        privateClient
            .post('v1/tweet', body)
            .then((results) => {
                router.push("/");
            })
            .catch((err) => {
                console.log("err", err)
                if (err.response.data === ApiErrorMessages.FailAuthToken) {
                    router.push('/login');
                }
            })
    }
    return (
        <div className={sharedStyle.background}>
            <Head>
                <title>ツイートする</title>
            </Head>
            <div className={TweetStyle.Tweet}>
                <Sidebar />
                <form
                    className={TweetStyle.from}
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <textarea
                        className={TweetStyle.tweetText}
                        placeholder="ツイートする"
                        onChange={(e) => handleChange(e)}
                    />
                    <div className={TweetStyle.post}>
                        <button className={TweetStyle.button}>投稿</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Tweet;
