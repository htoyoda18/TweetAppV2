import React from 'react'
import Sidebar from '../component/sidebar'
import TweetStyleList from '../css/tweet_list.module.css';
import TweetDetailStyleList from '../css/tweet_detail.module.css';
import { client } from '../libs/axios'
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { Tweet } from "../component/tweet"
import { Reply } from "../component/reply"


export const TweetDetail = () => {
	const token = localStorage.getItem('token')
	const params = useParams();
	const [tweetDetail, setTweetDetail] = useState({});
	const [userName, setUserName] = useState();
	window.onload = function () {
		TweetDetalGet()
	}
	const TweetDetalGet = () => {
		const url = 'v1/tweet_detail/' + params.id
		client
			.get(url, { headers: { Authorization: token } })
			.then((res) => {
				setTweetDetail(res.data)
				setUserName(res.data.user.name)
				console.log("tweetDetail", tweetDetail)
				console.log("userName", userName)
			})
			.catch((err) => {
				console.log("err", err.response)
			})
	}
	return (
		<div className={TweetStyleList.TweetList}>
			<Sidebar />
			<div className={TweetDetailStyleList.tweetDetail}>
				<Tweet id={tweetDetail.id} userName={userName} tweet={tweetDetail.tweet} reply={tweetDetail.replies} likes={tweetDetail.like} image='https://sp-akiba-souken.k-img.com/images/vote/000/170/170628.jpg' />
				<Reply />
			</div>
		</div>
	)
}