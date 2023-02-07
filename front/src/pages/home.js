import React from 'react'
import Sidebar from '../component/sidebar'
import TweetStyleList from '../css/tweet_list.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { client } from '../libs/axios'
import { useState } from 'react';

export const Home = (tweetList) => {
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
		<div className={TweetStyleList.TweetList}>
			<Sidebar />
			<div className={TweetStyleList.Tweet}>
				{tweets.map((value, key) => {
					let likes = ""
					if (value.like > 0) {
						likes = value.like
					}
					let reply = ""
					if (value.replys != null) {
						reply = value.replys.length
					}
					return (
						<div className={TweetStyleList.tweetContent}>
							<a className={TweetStyleList.detailLink} href={"tweet_detail/" + value.id}>
								<form>
									<div className={TweetStyleList.Section1}>
										<img className={TweetStyleList.icon} src='https://sp-akiba-souken.k-img.com/images/vote/000/170/170628.jpg'></img>
										<div className={TweetStyleList.content}>
											<div className={TweetStyleList.userName}>{value.user.name}</div>
											<div className={TweetStyleList.tweet}>{value.tweet}</div>
										</div>
									</div>
									<div className={TweetStyleList.Section2}>
										<div className={TweetStyleList.reply}><CommentIcon />{reply}</div>
										<div className={TweetStyleList.like}><FavoriteBorderIcon />{likes}</div>
									</div>
								</form>
							</a>
						</div>
					)
				})}
			</div>
		</div>
	)
}
