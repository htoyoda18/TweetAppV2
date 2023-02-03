import React from 'react';
import { TweetApp } from "../component/tweet_app"
import PasswordResetStyle from '../css/password_reset.module.css';
import { Formbtn } from "../component/form_btn"

export const PasswordReset = () => {
	return (
		<div>
			<TweetApp />
			<div className={PasswordResetStyle.formContainer}>
				<form>
					<div className={PasswordResetStyle.formName}>パスワードを忘れた場合</div>
					<div className={PasswordResetStyle.formDiscription}>ご登録いただいたメールアドレスを入力してください。<br/>メールアドレス宛に、パスワード変更ページのURLが記載されたメールを送信します。</div>
					<div className={PasswordResetStyle.formFiled}>
						<label>メールアドレス</label>
						<input type="text" placeholder="メールアドレス" name="mailAddress" />
					</div>
					<Formbtn name="メールを送信" />
				</form>
			</div>
		</div>
	)
}
