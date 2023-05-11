import React, { useEffect } from 'react';
import Sidebar from '../component/sidebar'
import TweetStyleList from '../css/tweet_list.module.css';
import TweetDetailStyleList from '../css/tweet_detail.module.css';
import { client } from '../libs/axios'
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { Tweet } from "../component/tweet"
import { ReplyPost } from "../component/reply"
import { useNavigate } from "react-router-dom";
import { UserIconGet } from "../api/icon_get"

export const TweetDetail = () => {
	const params = useParams();
	const [tweetDetail, setTweetDetail] = useState({});
	const [replies, setReplies] = useState([]);
	const [user, setUser] = useState({});
	const token = localStorage.getItem('token');
	const navigate = useNavigate();
	const [icon, setIcon] = useState('');
	const [iconUrls, setIconUrls] = useState({});

	useEffect(() => {
		if (!token) {
			navigate('/login');
			return;
		}
		const TweetDetalGet = () => {
			const url = 'v1/tweet_detail/' + params.id
			client
				.get(url, { headers: { Authorization: token } })
				.then(async (res) => {
					if (res.data !== undefined) {
						setTweetDetail(res.data)
						setUser(res.data.user)
						setReplies(res.data.replies)
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

	useEffect(() => {
		const fetchIcons = async () => {
			let newIconUrls = { ...iconUrls }; // 現在のiconUrlsをコピー
			for (const reply of replies) {
				if (reply.user.icon !== '' && !(reply.user.id in newIconUrls)) { // 既に取得済みのユーザーのアイコンは取得しない
					const iconUrl = await UserIconGet(reply.user.icon);
					newIconUrls = { ...newIconUrls, [reply.user.id]: iconUrl };
				}
			}
			setIconUrls(newIconUrls);
		};
		fetchIcons();
	}, [replies]);

	return (
		<div className={TweetStyleList.TweetList}>
			<Sidebar />
			<div className={TweetDetailStyleList.tweetDetail}>
				<Tweet
					userID={user.id}
					id={tweetDetail.id}
					userName={user.name}
					tweet={tweetDetail.tweet}
					replies={tweetDetail.replies}
					like={tweetDetail.like}
					iconUrl={icon}
					isReply={true}
					isLike={true}
				/>
				<ReplyPost tweetID={tweetDetail.id} iconUrl={icon} />
				{replies.map((value, key) => {
					return (
						<Tweet
							key={key}
							userID={user.id}
							userName={user.name}
							tweet={value.reply}
							iconUrl={iconUrls[value.user.id]}
							isReply={false}
							isLike={false}
						/>
					)
				})}
			</div>
		</div>
	)
}