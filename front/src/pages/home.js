import React from 'react'
import Sidebar from '../component/sidebar'
import TweetStyleList from '../css/tweet_list.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';

export const Home = () => {
	return (
		<div className={TweetStyleList.TweetList}>
			<Sidebar />
			<form>
				<div className={TweetStyleList.Section1}>
					<img className={TweetStyleList.icon} src='https://sp-akiba-souken.k-img.com/images/vote/000/170/170628.jpg'></img>
					<div className={TweetStyleList.content}>
						<div className={TweetStyleList.userName}>コマさん</div>
						<div className={TweetStyleList.tweet}>オラ、コマさんズラ！オラ、コマさんズラ！オラ、コマさんズラ！オラ、コマさんズラ！オラ、コマさんズラ！オラ、コマさんズラ！オラ、コマさんズラ！オラ、コマさんズラ！オラ、コマさんズラ！</div>
					</div>
				</div>
				<div className={TweetStyleList.Section2}>
					<div className={TweetStyleList.reply}><CommentIcon /></div>
					<div className={TweetStyleList.like}><FavoriteBorderIcon /></div>
				</div>
			</form>
		</div>
	)
}
