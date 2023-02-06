import React from 'react'
import Sidebar from '../component/sidebar'
import TweetStyle from '../css/tweet.module.css';
import { useState } from 'react';
import { client } from '../libs/axios'
import { useNavigate } from "react-router-dom";

export const Tweet = () => {
	const [tweet, setTweet] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		const tweet = e.target.value;
		setTweet(tweet);
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		const body = {
			tweet: tweet
		}
		client
		.post('v1/tweet', body)
		.then((results) => {
			console.log("results", results)
			navigate("/");
		})
		.catch((err) => {
			console.log("err", err.response)
		})
	}
	return (
		<div className={TweetStyle.Tweet}>
			<Sidebar />
			<form class={TweetStyle.from} onSubmit={(e) => handleSubmit(e)} >
				<textarea placeholder="ツイートする" onChange={(e) => handleChange(e)}></textarea>
				<div className={TweetStyle.post}>
					<button className={TweetStyle.button}>投稿</button>
				</div>
			</form>
		</div>
	)
}
