import React, {useEffect} from 'react';
import Sidebar from '../component/sidebar'
import TweetStyleList from '../css/tweet_list.module.css';
import TweetDetailStyleList from '../css/tweet_detail.module.css';
import { client } from '../libs/axios'
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { Tweet } from "../component/tweet"
import { ReplyPost, Reply } from "../component/reply"
import { useNavigate } from "react-router-dom";
import { UserIconGet } from "../api/icon_get"

export const TweetDetail = () => {
	const params = useParams();
	const [tweetDetail, setTweetDetail] = useState({});
	const [replys, setReplys] = useState([]);
	const [user, setUser] = useState({});
	const token = localStorage.getItem('token');
	const navigate = useNavigate();
	const [icon, setIcon] = useState('');

	useEffect(() => {
		if (!token) {
			navigate('/login');
			return;
		}
		const TweetDetalGet = () => {
			const url = 'v1/tweet_detail/' + params.id
			client
				.get(url, { headers: { Authorization: token } })
				.then(async(res) => {
					if (res.data !== undefined) {
						setTweetDetail(res.data)
						setUser(res.data.user)
						setReplys(res.data.replies)
						if (res.data.user.icon !== undefined) {
							const iconUrl = await UserIconGet(res.data.user.icon);
							setIcon(iconUrl);
						}
					}
				})
				.catch((err) => {
					console.log("err", err.response)
					if (err.response.data === 'Fail auth token') {
						navigate('/login');
					}
				})
		}
		TweetDetalGet()
	}, [params.id, token, navigate]);

	return (
		<div className={TweetStyleList.TweetList}>
			<Sidebar />
			<div className={TweetDetailStyleList.tweetDetail}>
				<Tweet userID={user.id} id={tweetDetail.id} userName={user.name} tweet={tweetDetail.tweet} reply={tweetDetail.replies} likes={tweetDetail.like} iconUrl={icon} />
				<ReplyPost tweetID={tweetDetail.id} iconUrl={icon} />
				{replys.map((value, key) => {
					console.log("Reply", icon)
					return (
						<Reply userID={user.id} reply={value.reply} userName={value.user.name} icon={value.user.icon} />
					)
				})}
			</div>
		</div>
	)
}