import React from 'react';
import { TweetApp } from "../component/tweet_app"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ErrorMsg } from "../component/error_message"
import PasswordUpdateStyle from '../css/password_update.module.css';
import { Formbtn } from "../component/form_btn"
import IndexStyle from '../css/index.module.css';
import { client } from '../libs/axios'

export const PasswordUpdate = () => {
	const [formValues, setFromValues] = useState("");
	const [fomrErrors, setFromError] = useState({});
	const navigate = useNavigate();
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFromValues({ ...formValues, [name]: value });
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		setFromError(validate(formValues.password));
		if (!fomrErrors) {
			PasswordUpdatePost()
			return
		}
	}
	const validate = (values) => {
		let error = "";
		if (!values.password) {
			error = "パスワードを入力してください"
		} else if (values.password.length < 8) {
			error = "パスワードは8文字以上, 20文字以下にしてください"
		} else if (values.password.length > 21) {
			error = "パスワードは8文字以上, 20文字以下にしてください"
		}
		if (!values.passwordConfirm) {
			error = "確認用のパスワードを入力してください"
		}
		if (values.password !== values.passwordConfirm) {
			error = "パスワードが一致しません"
		}
		return error
	}
	const PasswordUpdatePost = () => {
		const body = {
			password: formValues.password,
		}
		client
		.post('v1/update_password', body)
		.then((results) => {
			console.log("results", results)
			navigate("/login");
		})
		.catch((err) => {
			console.log("err", err.response)
			if (err.response.data === 'User email duplicate' ) {
				setFromError({resErr: "このメールアドレスは既に登録されています"})
			} else {
				setFromError({resErr: "予期せぬエラーです"})
			}
		})
	}

	return (
		<div>
			<TweetApp />
			<div className={IndexStyle.formContainer}>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className={PasswordUpdateStyle.uiForm}>
						<div className={PasswordUpdateStyle.formFiled}>
							<label>パスワード</label>
							<input type="text" placeholder="パスワード" name="password" onClick={() => setFromError(validate(formValues))} onChange={(e) => handleChange(e)} />
						</div>
						<div className={PasswordUpdateStyle.formFiled}>
							<label>パスワード確認用</label>
							<input type="text" placeholder="パスワード" name="passwordConfirm" onClick={() => setFromError(validate(formValues))} onChange={(e) => handleChange(e)} />
						</div>
						<ErrorMsg err={fomrErrors} />
						<ErrorMsg err={fomrErrors.resErr} />
						<Formbtn name="パスワードを再設定" />
					</div>
				</form>
			</div>
		</div>
	)
}
