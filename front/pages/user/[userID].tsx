import { NextPage } from "next";
import { useState, useEffect } from 'react';
import Sidebar from '../../component/sidebar';
import { UserInfo } from '../../component/user_info';
import TweetStyle from '../../css/tweet.module.css';
import { client } from '../../libs/axios';
import { Tweet } from "../../component/tweet";
import { useRouter } from 'next/router';
import UserInfoStyle from '../../css/user_info.module.css';
import { UserIconGet } from "../../api/client/icon_get";
import { ErrorMessages } from '../../shared/error';
import { GetToken } from '../../shared/localStorage';

interface UserRecode {
	name?: string,
	id?: number,
	introduction?: string,
	icon?: string,
}

const User: NextPage = () => {
	const router = useRouter();
	const token = GetToken()
	const [user, setUser] = useState<UserRecode>({});
	const [tweets, setTweets] = useState([]);
	const { userID } = router.query
	const [iconUrl, setIconUrl] = useState('');

	useEffect(() => {
		if (!token) {
			router.push('/login');
			return;
		}
		const UserGet = () => {
			const url: string = 'v1/user/' + userID
			client
				.get(url, { headers: { Authorization: token } })
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
			client
				.get(url, { headers: { Authorization: token } })
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
	}, [userID, token, router]);
	return (
		<div className={TweetStyle.Tweet}>
			<Sidebar />
			<div className={UserInfoStyle.userTweets}>
				<UserInfo userName={user.name} userID={user.id} userIntroduction={user.introduction} iconUrl={iconUrl} userIconFileName={user.icon} />
				{tweets.map((value, key) => {
					return (
						<Tweet
							key={key}
							userID={value.user.id}
							userName={value.user.name}
							tweet={value.tweet}
							tweetID={value.id}
							replies={value.replies}
							likes={value.likes}
							iconUrl={iconUrl}
						/>
					)
				})}
			</div>
		</div>
	)
};

export default User;
