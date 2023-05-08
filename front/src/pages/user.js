import React, {useEffect} from 'react';
import Sidebar from '../component/sidebar'
import { UserInfo } from '../component/user_info'
import TweetStyle from '../css/tweet.module.css';
import { client } from '../libs/axios'
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Tweet } from "../component/tweet"
import UserInfoStyle from '../css/user_info.module.css';
import { useNavigate } from "react-router-dom";

export const User = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token')
	const [user, setUser] = useState({});
	const [tweets, setTweets] = useState([]);
	const params = useParams();
	window.onload = function () {
		UserGet()
		TweetList()
	}

	useEffect(() => {
		if (!token) {
			navigate('/login');
			return;
		}
	}, [token, navigate]);
	const UserGet = () => {
		const url = 'v1/user/' + params.id
		client
			.get(url, { headers: { Authorization: token } })
			.then((res) => {
				setUser(res.data)
			})
			.catch((err) => {
				console.log("err", err.response)
				if (err.response.data === 'Fail auth token') {
					navigate('/login');
				}
			})
	}
	const TweetList = () => {
		const url = 'v1/tweet/' + params.id
		client
			.get(url, { headers: { Authorization: token } })
			.then((res) => {
				setTweets(res.data)
			})
			.catch((err) => {
				console.log("err", err.response)
				if (err.response.data === 'Fail auth token') {
					navigate('/login');
				}
			})
	}
	return (
		<div className={TweetStyle.Tweet}>
			<Sidebar />
			<div className={UserInfoStyle.userTweets}>
				<UserInfo userName={user.name} />
				{tweets.map((value, key) => {
					return (
						<Tweet userID={value.user.id} id={value.id} userName={value.user.name} tweet={value.tweet} reply={value.replies} likes={value.like} image='https://sp-akiba-souken.k-img.com/images/vote/000/170/170628.jpg' />
					)
				})}
			</div>
		</div>
	)
}
