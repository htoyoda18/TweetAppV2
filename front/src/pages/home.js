import React from 'react'
import Sidebar from '../component/sidebar'
import TweetListStyle from '../css/tweet_list.module.css';
import { client } from '../libs/axios'
import { useState } from 'react';
import { Tweet } from "../component/tweet"

export const Home = () => {
	const token = localStorage.getItem('token')
	const [tweets, setTweets] = useState([]);
	const TweetList = () => {
		client
			.get('v1/tweet', { headers: { Authorization: token } })
			.then((res) => {
				setTweets(res.data)
				console.log("res.data", res.data)
			})
			.catch((err) => {
				console.log("err", err.response)
			})
	}
	window.onload = function () {
		TweetList()
	}
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
