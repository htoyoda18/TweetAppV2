import React from 'react';
import { useState } from 'react';
import { client } from '../libs/axios'
import SignUpStyle from '../css/signup.module.css';
import { useNavigate } from "react-router-dom";
import {TweetApp} from "../component/tweet_app"


export const SignUp = () => {
	const initialValues = { userName: "", mailAddress: "", password: "" };
	const [formValues, setFromValues] = useState(initialValues);
	const [fomrErrors, setFromError] = useState({});
	const navigate = useNavigate();

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
		signUpPost()
	}

	const signUpPost = () => {
		const body = {
			userName: formValues.userName.trim(),
			password: formValues.password.trim(),
			email: formValues.mailAddress.trim(),
		}
		client
		.post('v1/signup', body)
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

	const validate = (values) => {
		const errors = {};
		const regex = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
		if (!values.userName) {
			errors.userName = "ユーザ名を入力してください"
		}
		if (!values.mailAddress) {
			errors.mailAddress = "メールをアドレスを入力してください"
		} else if (!regex.test(values.mailAddress)) {
			errors.mailAddress = "正しいメールアドレスを入力してください"
		}
		if (!values.password) {
			errors.password = "パスワードを入力してください"
		} else if (values.password.length < 8) {
			errors.password = "パスワードは8文字以上, 20文字以下にしてください"
		} else if (values.password.length > 21) {
			errors.password = "パスワードは8文字以上, 20文字以下にしてください"
		}

		return errors
	}

	return (
		<div className={SignUpStyle}>
			<TweetApp />
			<div className={SignUpStyle.formContainer}>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className={SignUpStyle.uiForm}>
						<div className={SignUpStyle.formFiled}>
							<label>ユーザ名</label>
							<input type="text" placeholder="ユーザ名" name="userName" onClick={() => setFromError(validate(formValues))} onChange={(e) => handleChange(e)} />
						</div>
						<p className={SignUpStyle.errorMsg}>{fomrErrors.userName}</p>
						<div className={SignUpStyle.formFiled}>
							<label>メールアドレス</label>
							<input type="text" placeholder="メールアドレス" name="mailAddress" onClick={() => setFromError(validate(formValues))} onChange={(e) => handleChange(e)} />
						</div>
						<p className={SignUpStyle.errorMsg}>{fomrErrors.mailAddress}</p>
						<div className={SignUpStyle.formFiled}>
							<label>パスワード</label>
							<input type="text" placeholder="パスワード" name="password" onClick={() => setFromError(validate(formValues))} onChange={(e) => handleChange(e)} />
						</div>
						<p className={SignUpStyle.errorMsg}>{fomrErrors.password}</p>
						<p className={SignUpStyle.errorMsg}>{fomrErrors.resErr}</p>
						<button className="submintButton">新規登録</button>
					</div>
				</form>
			</div>
		</div>
	);
}
