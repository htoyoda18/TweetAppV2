import React from "react";
import { NextPage } from "next";
import  {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import Sidebar from '../component/sidebar';
import TweetListStyle from '../css/tweet_list.module.css';
import { Tweet } from "../component/tweet";
import { client } from '../libs/axios'
import { UserIconGet } from "../api/client/icon_get"
import { ErrorMessages } from '../shared/error'
import { GetToken } from '../shared/localStorage'
import { TweetResponse } from '../api/type/tweet'

const Home: NextPage = () => {
	const [tweets, setTweets] = useState<TweetResponse[]>([]);
	const [iconUrls, setIconUrls] = useState({});
	const router = useRouter()
	const token = GetToken()

	useEffect(() => {
		if (!token) {
			router.push('/login');
			return;
		}

		const TweetList = () => {
			client
				.get<TweetResponse[]>('v1/tweet', { headers: { Authorization: token } })
				.then((res) => {
					if (res.data) {
						setTweets(res.data);
					}
				})
				.catch((err) => {
					console.log("err", err)
					if (!err.response || !err.response.data) {
						return
					}
					if (err.response.data === ErrorMessages.FailAuthToken) {
						router.push('/login');
					}
				})
		}
		TweetList();
	}, [token]);

	useEffect(() => {
		const fetchIcons = async () => {
			let newIconUrls = { ...iconUrls }; // 現在のiconUrlsをコピー
			for (const tweet of tweets) {
				if (tweet.user.icon !== '' && !(tweet.user.id in newIconUrls)) { // 既に取得済みのユーザーのアイコンは取得しない
					const iconUrl = await UserIconGet(tweet.user.icon);
					newIconUrls = { ...newIconUrls, [tweet.user.id]: iconUrl };
				}
			}
			setIconUrls(newIconUrls);
		};
		fetchIcons();
	}, [tweets]);

	return (
		<div className={TweetListStyle.TweetList}>
			<Sidebar />
			<div className={TweetListStyle.Tweet}>
				{tweets.map((tweet, key) => (
					<Tweet
						key={key}
						userID={tweet.user.id}
						userName={tweet.user.name}
						tweet={tweet.tweet}
						tweetID={tweet.id}
						replies={tweet.replies}
						likes={tweet.likes}
						iconUrl={iconUrls[tweet.user.id]}
					/>
				))}
			</div>
		</div>
	);
}

export default Home;