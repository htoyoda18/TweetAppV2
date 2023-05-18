import { NextPage } from "next";
import { useEffect, useState } from 'react';
import Sidebar from '../component/sidebar'
import TweetStyle from '../css/tweet.module.css';
import sharedStyle from '../css/shared.module.css';
import { client } from '../libs/axios'
import { useRouter } from 'next/router'
import { ErrorMessages } from '../shared/error'
import { GetToken } from '../shared/localStorage'

const Tweet: NextPage = () => {
    const [tweet, setTweet] = useState("");
    const router = useRouter();
    const token = GetToken();

    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }
    }, [token, useRouter]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const tweet = e.target.value;
        setTweet(tweet);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = {
            tweet: tweet
        }
        const token = GetToken()
        client
            .post('v1/tweet', body, { headers: { Authorization: token } })
            .then((results) => {
                router.push("/");
            })
            .catch((err) => {
                console.log("err", err)
                if (err.response.data === ErrorMessages.FailAuthToken) {
                    router.push('/login');
                }
            })
    }
    return (
        <div className={sharedStyle.background}>
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
