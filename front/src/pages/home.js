import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../component/sidebar';
import TweetListStyle from '../css/tweet_list.module.css';
import { Tweet } from "../component/tweet";
import { client } from '../libs/axios'

export const Home = () => {
	const [tweets, setTweets] = useState([]);
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

	return (
		<div className={TweetListStyle.TweetList}>
			<Sidebar />
			<div className={TweetListStyle.Tweet}>
				{tweets.map((value, key) => (
					<Tweet
						userID={value.user.id}
						id={value.id}
						userName={value.user.name}
						tweet={value.tweet}
						replies={value.replies}
						likes={value.like}
						image={value.user.icon}
					/>
				))}
			</div>
		</div>
	);
}
