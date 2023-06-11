import { NextPage } from "next";
import { TweetApp } from "../../component/tweet_app"
import IndexStyle from '../css/index.module.css';
import SharedStyle from '../css/shared.module.css';
import PasswordResetSendStyle from '../css/password_reset_send.module.css';
import Head from 'next/head';

const PasswordResetSend: NextPage = () => {
	return (
		<div className={SharedStyle.background}>
			<Head>
				<title>パスワードリセットのメールを送信完了</title>
			</Head>
			<TweetApp />
			<div className={IndexStyle.formContainer}>
				<form>
					<div className={PasswordResetSendStyle.title}>メール送信完了</div>
					<div className={PasswordResetSendStyle.description}>パスワード再設定用のURLをご入力のメールアドレスに送信しました。<br />記載された内容に従って、パスワードの再設定を行なってください。</div>
				</form>
			</div>
		</div>
	)
};

export default PasswordResetSend
