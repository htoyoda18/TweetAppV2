import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../component/sidebar';
import TweetListStyle from '../css/tweet_list.module.css';
import { Tweet } from "../component/tweet";
import { client } from '../libs/axios'
import { UserIconGet } from "../api/icon_get"

export const Home = () => {
	const [tweets, setTweets] = useState([]);
	const [iconUrls, setIconUrls] = useState({});
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate('/login');
			return;
		}

		const TweetList = () => {
			client
				.get('v1/tweet', { headers: { Authorization: token } })
				.then((res) => {
					if (res.data) {
						setTweets(res.data);
					}
				})
				.catch((err) => {
					console.log("err", err.response)
					if (err.response.data === 'Fail auth token') {
						navigate('/login');
					}
				})
		}
		TweetList();
	}, [token, navigate]);

	useEffect(() => {
		const fetchIcons = async () => {
			let newIconUrls = {};
			for (const tweet of tweets) {
				if (tweet.user.icon !== '') {
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
				{tweets.map((value, key) => (
					<Tweet
						key={key}
						userID={value.user.id}
						id={value.id}
						userName={value.user.name}
						tweet={value.tweet}
						replies={value.replies}
						likes={value.like}
						iconUrl={iconUrls[value.user.id]}
					/>
				))}
			</div>
		</div>
	);
}
