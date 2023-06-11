import { NextPage } from "next";
import { TweetApp } from "../../component/tweet_app"
import PasswordResetStyle from '../../styles/password_reset.module.css';
import { Formbtn } from "../../component/form_btn"
import IndexStyle from '../../styles/index.module.css';
import SharedStyle from '../../styles/shared.module.css';
import { useState } from 'react';
import { publicClient } from '../../api/client/axios'
import { ErrorMsg } from "../../component/error_message"
import { ApiErrorMessages } from '../../shared/error'
import { useRouter } from 'next/router';
import { PasswordResetReqest } from '../../api/type/user';
import Head from 'next/head';

interface FormValues {
	email?: string;
}

const initialValues: FormValues = {
	email: '',
}

const PasswordReset: NextPage = () => {
	const [formValues, setFromValues] = useState<FormValues>(initialValues);
	const [fomrErrors, setFromError] = useState("");
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { value } = e.target;
		setFromValues({ email: value });
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFromError(validate(formValues.email));
		if (fomrErrors !== "") {
			return
		}
		PasswordReset()
	}

	const PasswordReset = () => {
		const body: PasswordResetReqest = {
			email: formValues.email,
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
				if (err.response.data === ApiErrorMessages.EmailNotFound) {
					setFromError("存在しないメールアドレスです")
				} else if (err.response.data === ApiErrorMessages.ShouldBindJsonErr) {
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
					<div className={PasswordResetStyle.formField}>
						<label>メールアドレス</label>
						<input
							type="text"
							placeholder="メールアドレス"
							name="email"
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
