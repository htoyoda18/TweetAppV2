import React from 'react';
import LoginStyle from '../css/login.module.css';
import { client } from '../libs/axios'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {TweetApp} from "../component/tweet_app"

export const Login = () => {
	const initialValues = { userName: "", mailAddress: "", password: "" };
	const [formValues, setFromValues] = useState(initialValues);
	const [fomrErrors, setFromError] = useState({});
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formValues.password) {
			setFromError({nullErr: "パスワードを入力してください"})
			return
		} else if (!formValues.mailAddress) {
			setFromError({nullErr: "メールアドレスを入力してください"})
			return
		}
		LoginPost()
	}
	const LoginPost = () => {
		const body = {
			password: formValues.password.trim(),
			email: formValues.mailAddress.trim(),
		}
		client
		.post('v1/login', body)
		.then((results) => {
			console.log("results", results)
			navigate("/");
		})
		.catch((err) => {
			console.log("err", err.response)
			if (err.response.data === 'User not found' ) {
				setFromError({resErr: "メールアドレス又は、パスワードが違います"})
			} else {
				setFromError({resErr: "予期せぬエラーです"})
			}
		})
	}
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFromValues({ ...formValues, [name]: value });
	}

	return (
		<div className={LoginStyle}>
			<TweetApp />
			<div className={LoginStyle.formContainer}>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className={LoginStyle.uiForm}>
						<div className={LoginStyle.formFiled}>
							<label>メールアドレス</label>
							<input type="text" placeholder="メールアドレス" name="mailAddress" onChange={(e) => handleChange(e)}/>
						</div>
						<div className={LoginStyle.formFiled}>
							<label>パスワード</label>
							<input type="text" placeholder="パスワード" name="password" onChange={(e) => handleChange(e)}/>
						</div>
						<p className={LoginStyle.errorMsg}>{fomrErrors.nullErr}</p>
						<p className={LoginStyle.errorMsg}>{fomrErrors.resErr}</p>
						<button className="submintButton">ログイン</button>
					</div>
				</form>
			</div>
		</div>
	);
}
