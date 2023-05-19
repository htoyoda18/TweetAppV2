import { NextPage } from "next";
import { TweetApp } from "../component/tweet_app"
import PasswordResetStyle from '../css/password_reset.module.css';
import { Formbtn } from "../component/form_btn"
import IndexStyle from '../css/index.module.css';
import SharedStyle from '../css/shared.module.css';
import { useState } from 'react';
import { publicClient } from '../libs/client/axios'
import { ErrorMsg } from "../component/error_message"
import { ErrorMessages } from '../shared/error'
import { useRouter } from 'next/router';
import { PasswordResetReqest } from '../api/type/user';
import Head from 'next/head';

interface FormValues {
	mailAddress?: string;
}

const initialValues: FormValues = {
	mailAddress: '',
}

const PasswordReset: NextPage = () => {
	const [formValues, setFromValues] = useState<FormValues>(initialValues);
	const [fomrErrors, setFromError] = useState("");
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setFromValues({ mailAddress: value });
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFromError(validate(formValues.mailAddress));
		if (fomrErrors !== "") {
			return
		}
		PasswordReset()
	}

	const PasswordReset = () => {
		const body: PasswordResetReqest = {
			email: formValues.mailAddress,
		}
		publicClient
			.post('v1/password_reset', body)
			.then((results) => {
				router.push("/password_reset_send");
			})
			.catch((err) => {
				console.log("err", err)
				if (!err.response || !err.response.data) {
					return
				}
				if (err.response.data === ErrorMessages.EmailNotFound) {
					setFromError("存在しないメールアドレスです")
				} else if (err.response.data === ErrorMessages.ShouldBindJsonErr) {
					setFromError("メールアドレスの形式が間違ってます")
				} else {
					setFromError("予期せぬエラーです")
				}
			})
	}

	const validate = (values: string) => {
		let errors = "";
		if (values === '') {
			errors = "メールをアドレスを入力してください"
		}
		return errors
	}
	return (
		<div className={SharedStyle.background}>
			<Head>
				<title>パスワードリセット</title>
			</Head>
			<TweetApp />
			<div className={IndexStyle.formContainer}>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className={PasswordResetStyle.formName}>パスワードを忘れた場合</div>
					<div className={PasswordResetStyle.formDiscription}>ご登録いただいたメールアドレスを入力してください。<br />メールアドレス宛に、パスワード変更ページのURLが記載されたメールを送信します。</div>
					<div className={PasswordResetStyle.formFiled}>
						<label>メールアドレス</label>
						<input
							type="text"
							placeholder="メールアドレス"
							name="mailAddress"
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<ErrorMsg err={fomrErrors} />
					<Formbtn name="メールを送信" />
				</form>
			</div>
		</div>
	)
}

export default PasswordReset;
