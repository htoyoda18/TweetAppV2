import React from 'react';
import { TweetApp } from "../component/tweet_app"
import IndexStyle from '../css/index.module.css';
import PasswordResetSendStyle from '../css/password_reset_send.module.css';

export const PasswordResetSend = () => {
	return (
		<div>
			<TweetApp />
			<div className={IndexStyle.formContainer}>
				<form>
					<div className={PasswordResetSendStyle.title}>メール送信完了</div>
					<div className={PasswordResetSendStyle.description}>パスワード再設定用のURLをご入力のメールアドレスに送信しました。<br/>記載された内容に従って、パスワードの再設定を行なってください。</div>
				</form>
			</div>
		</div>
	)
}
