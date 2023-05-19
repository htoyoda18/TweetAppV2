import { NextPage } from "next";
import { useState, useEffect } from 'react';
import Sidebar from '../../component/sidebar';
import { UserInfo } from '../../component/user_info';
import TweetStyle from '../../css/tweet.module.css';
import { privateClient } from '../../libs/client/axios';
import { useCheckToken } from '../../libs/hook/check_token';
import { Tweet } from "../../component/tweet";
import { useRouter } from 'next/router';
import UserInfoStyle from '../../css/user_info.module.css';
import { UserIconGet } from "../../api/client/icon_get";
import { ErrorMessages } from '../../shared/error';
import { UserResponse } from '../../api/type/user';

const User: NextPage = () => {
	const router = useRouter();
	const [user, setUser] = useState<UserResponse>({id: 0, name : '', email: '', introduction: '', icon: ''});
	const [tweets, setTweets] = useState([]);
	const { userID } = router.query
	const [iconUrl, setIconUrl] = useState('');

	useCheckToken()

	useEffect(() => {
		const UserGet = () => {
			const url: string = 'v1/user/' + userID
			privateClient
				.get(url)
				.then(async (res) => {
					if (res.data !== undefined) {
						setUser(res.data);
						if (res.data.icon !== undefined) {
							const iconUrl = await UserIconGet(res.data.icon);
							setIconUrl(iconUrl);
						}
					}
				})
				.catch((err) => {
					console.log("err", err)
					if (!err.response || !err.response.data) {
						return
					}
					switch (err.response.data) {
						case ErrorMessages.FailAuthToken:
							router.push('/login');
							break;
						case ErrorMessages.RecordNotFound:
							router.push('/not_found');
							break;
						default:
							console.log("err", err.response)
					}
				})
		}
		const TweetList = () => {
			const url: string = 'v1/tweet/' + userID
			privateClient
				.get(url)
				.then((res) => {
					setTweets(res.data)
				})
				.catch((err) => {
					console.log("err", err.response)
					if (err.response.data === ErrorMessages.FailAuthToken) {
						router.push('/login');
					}
				})
		}

		UserGet();
		TweetList();
	}, [userID, router]);
	return (
		<div className={TweetStyle.Tweet}>
			<Sidebar />
			<div className={UserInfoStyle.userTweets}>
				<UserInfo userName={user.name} userID={user.id} userIntroduction={user.introduction} iconUrl={iconUrl} userIconFileName={user.icon} />
				{tweets.map((tweet, key) => {
					return (
						<Tweet
							key={key}
							userID={tweet.user.id}
							userName={tweet.user.name}
							tweet={tweet.tweet}
							tweetID={tweet.id}
							replies={tweet.replies}
							likes={tweet.likes}
							iconUrl={iconUrl}
						/>
					)
				})}
			</div>
		</div>
	)
};

export default User;
