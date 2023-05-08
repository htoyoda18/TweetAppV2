import React, { useEffect } from 'react';
import LoginStyle from '../css/login.module.css';
import IndexStyle from '../css/index.module.css';
import { client } from '../libs/axios'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TweetApp } from "../component/tweet_app"
import { Note } from "../component/note"
import { Formbtn } from "../component/form_btn"
import { ErrorMsg } from "../component/error_message"

export const Login = () => {
	const initialValues = { mailAddress: "", password: "" };
	const [formValues, setFromValues] = useState(initialValues);
	const [fomrErrors, setFromError] = useState({});
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:8080/v1/validate_token', {
				headers: {
					Authorization: token,
				},
			});
			if (response.ok) {
				navigate('/');
			}
		};

		if (token) {
			fetchData();
			return;
		}
	}, [token, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setFromError(validate(formValues));
		if (Object.keys(fomrErrors).length > 0) {
			return
		}
		LoginPost()
	}
	const validate = (values) => {
		const errors = {};
		if (!values.mailAddress) {
			errors.mailAddress = "メールをアドレスを入力してください"
		}
		if (!values.password) {
			errors.password = "パスワードを入力してください"
		}

		return errors
	}
	const LoginPost = () => {
		const body = {
			password: formValues.password.trim(),
			email: formValues.mailAddress.trim(),
		}
		client
			.post('v1/login', body)
			.then((res) => {
				localStorage.setItem("token", res.data.token)
				navigate("/");
			})
			.catch((err) => {
				console.log("err", err.response)
				if (err.response.data === 'User not found') {
					setFromError({ resErr: "メールアドレス又は、パスワードが違います" })
				} else {
					setFromError({ resErr: "予期せぬエラーです" })
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
			<div className={IndexStyle.formContainer}>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className={LoginStyle.uiForm}>
						<div className={LoginStyle.formFiled}>
							<label>メールアドレス</label>
							<input type="text" placeholder="メールアドレス" name="mailAddress" onChange={(e) => handleChange(e)} />
						</div>
						<ErrorMsg err={fomrErrors.mailAddress} />
						<div className={LoginStyle.formFiled}>
							<label>パスワード</label>
							<input type="text" placeholder="パスワード" name="password" onChange={(e) => handleChange(e)} />
						</div>
						<ErrorMsg err={fomrErrors.password} />
						<ErrorMsg err={fomrErrors.resErr} />
						<Formbtn name="ログイン" />
					</div>
				</form>
			</div>
			<Note text="パスワードを忘れた場合は" link="こちら" url="http://localhost:3000/password_reset" />
			<Note text="アカウントをお持ちでない場合は" link="登録" url="http://localhost:3000/signup" />
		</div>
	);
}
