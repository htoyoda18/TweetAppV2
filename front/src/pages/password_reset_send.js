import React, { useEffect } from 'react';
import { TweetApp } from "../component/tweet_app"
import IndexStyle from '../css/index.module.css';
import PasswordResetSendStyle from '../css/password_reset_send.module.css';
import { useNavigate } from 'react-router-dom';

export const PasswordResetSend = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (!token) {
			navigate('/login');
			return;
		}
	}, [token, navigate]);
	return (
		<div>
			<TweetApp />
			<div className={IndexStyle.formContainer}>
				<form>
					<div className={PasswordResetSendStyle.title}>メール送信完了</div>
					<div className={PasswordResetSendStyle.description}>パスワード再設定用のURLをご入力のメールアドレスに送信しました。<br />記載された内容に従って、パスワードの再設定を行なってください。</div>
				</form>
			</div>
		</div>
	)
}
