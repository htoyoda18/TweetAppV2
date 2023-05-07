import React from 'react'
import Sidebar from '../component/sidebar'
import TweetListStyle from '../css/tweet_list.module.css';
import { useState, useEffect } from 'react';
import { Tweet } from "../component/tweet"

export const Home = () => {
	const token = localStorage.getItem('token')
	const [tweets, setTweets] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:8080/v1/tweet', {
				headers: {
					Authorization: token
				}
			});
			const res = await response.json();
			setTweets(res);
		};

		fetchData();
	}, [token]);
	return (
		<div className={TweetListStyle.TweetList}>
			<Sidebar />
			<div className={TweetListStyle.Tweet}>
				{tweets.map((value, key) => {
					return (
						<Tweet userID={value.user.id} id={value.id} userName={value.user.name} tweet={value.tweet} replies={value.replies} likes={value.like} image='https://sp-akiba-souken.k-img.com/images/vote/000/170/170628.jpg' />
					)
				})}
			</div>
		</div>
	)
}
