import React from 'react';
import { TweetApp } from "../component/tweet_app"
import PasswordResetStyle from '../css/password_reset.module.css';
import { Formbtn } from "../component/form_btn"
import IndexStyle from '../css/index.module.css';
import { useState } from 'react';
import { client } from '../libs/axios'
import { useNavigate } from "react-router-dom";
import { ErrorMsg } from "../component/error_message"

export const PasswordReset = () => {
	const [formValues, setFromValues] = useState({});
	const [fomrErrors, setFromError] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFromValues({ ...formValues, [name]: value });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setFromError(validate(formValues.mailAddress));
		console.log("formValues", formValues);
		if (fomrErrors !== "") {
			return
		}
		PasswordReset()
	}

	const PasswordReset = () => {
		const body = {
			email: formValues.mailAddress,
		}
		client
			.post('v1/password_reset', body)
			.then((results) => {
				console.log("results", results)
				navigate("/login");
			})
			.catch((err) => {
				console.log("err", err.response)
				if (err.response.data === 'Email not found') {
					setFromError({ resErr: "存在しないメールアドレスです" })
				} else {
					setFromError({ resErr: "予期せぬエラーです" })
				}
			})
	}

	const validate = (values) => {
		let errors = "";
		if (!values) {
			errors = "メールをアドレスを入力してください"
		}
		return errors
	}
	return (
		<div>
			<TweetApp />
			<div className={IndexStyle.formContainer}>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className={PasswordResetStyle.formName}>パスワードを忘れた場合</div>
					<div className={PasswordResetStyle.formDiscription}>ご登録いただいたメールアドレスを入力してください。<br />メールアドレス宛に、パスワード変更ページのURLが記載されたメールを送信します。</div>
					<div className={PasswordResetStyle.formFiled}>
						<label>メールアドレス</label>
						<input type="text" placeholder="メールアドレス" name="mailAddress" onChange={(e) => handleChange(e)} />
					</div>
					<ErrorMsg err={fomrErrors} />
					<Formbtn name="メールを送信" />
				</form>
			</div>
		</div>
	)
}
