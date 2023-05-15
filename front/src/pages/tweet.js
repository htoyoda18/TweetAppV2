import React, { useEffect } from 'react';
import Sidebar from '../component/sidebar'
import TweetStyle from '../css/tweet.module.css';
import { useState } from 'react';
import { client } from '../libs/axios'
import { useNavigate } from "react-router-dom";
import { ErrorMessages } from '../shaerd/error'

export const Tweet = () => {
	const [tweet, setTweet] = useState("");
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (!token) {
			navigate('/login');
			return;
		}
	}, [token, navigate]);

	const handleChange = (e) => {
		const tweet = e.target.value;
		setTweet(tweet);
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		const body = {
			tweet: tweet
		}
		const token = localStorage.getItem('token')
		client
			.post('v1/tweet', body, { headers: { Authorization: token } })
			.then((results) => {
				navigate("/");
			})
			.catch((err) => {
				console.log("err", err)
				if (err.response.data === ErrorMessages.FailAuthToken) {
					navigate('/login');
				}
			})
	}
	return (
		<div className={TweetStyle.Tweet}>
			<Sidebar />
			<form class={TweetStyle.from} onSubmit={(e) => handleSubmit(e)} >
				<textarea className={TweetStyle.tweetText} placeholder="ツイートする" onChange={(e) => handleChange(e)}></textarea>
				<div className={TweetStyle.post}>
					<button className={TweetStyle.button}>投稿</button>
				</div>
			</form>
		</div>
	)
}
