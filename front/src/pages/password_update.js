import React, { useEffect } from 'react';
import { TweetApp } from "../component/tweet_app"
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMsg } from "../component/error_message"
import PasswordUpdateStyle from '../css/password_update.module.css';
import { Formbtn } from "../component/form_btn"
import IndexStyle from '../css/index.module.css';
import { client } from '../libs/axios'

export const PasswordUpdate = () => {
	const initialValues = { password: "", passwordConfirm: "" };
	const [formValues, setFromValues] = useState(initialValues);
	const [fomrErrors, setFromError] = useState({});
	const navigate = useNavigate();
	const params = useParams();
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (!token) {
			navigate('/login');
			return;
		}
	}, [token, navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFromValues({ ...formValues, [name]: value });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setFromError(validate(formValues));
		if (Object.keys(fomrErrors).length > 0) {
			return
		}
		passwordUpdatePost()
	}

	const passwordUpdatePost = () => {
		const url = 'v1/password_update/' + params.token
		const body = {
			password: formValues.password.trim(),
		}
		client
			.post(url, body)
			.then((results) => {
				console.log("results", results)
				navigate("/login");
			})
			.catch((err) => {
				console.log("err", err)
				if (!err.response || !err.response.data) {
					return
				}
				if (err.response.data === 'User email duplicate') {
					setFromError({ resErr: "このメールアドレスは既に登録されています" })
				} else if (err.response.data === 'Fail auth token') {
					navigate('/login');
				} else {
					setFromError({ resErr: "予期せぬエラーです" })
				}
			})
	}

	const validate = (values) => {
		const errors = {};
		if (!values.password) {
			errors.password = "パスワードを入力してください"
		} else if (values.password.length < 8) {
			errors.password = "パスワードは8文字以上, 20文字以下にしてください"
		} else if (values.password.length > 21) {
			errors.password = "パスワードは8文字以上, 20文字以下にしてください"
		}
		if (values.password !== values.passwordConfirm) {
			errors.password = "パスワードが一致しません"
		}

		return errors
	}

	return (
		<div className={PasswordUpdateStyle}>
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
						<ErrorMsg err={fomrErrors.password} />
						<ErrorMsg err={fomrErrors.resErr} />
						<Formbtn name="新規登録" />
					</div>
				</form>
			</div>
		</div>
	);
}
