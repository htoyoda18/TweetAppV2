import { NextPage } from "next";
import { TweetApp } from "../../component/tweet_app"
import { useState } from 'react';
import { ErrorMsg } from "../../component/error_message"
import PasswordUpdateStyle from '../../css/password_update.module.css';
import { Formbtn } from "../../component/form_btn"
import IndexStyle from '../../css/index.module.css';
import { publicClient } from '../../libs/client/axios'
import { ErrorMessages } from '../../shared/error'
import { useRouter } from 'next/router';
import sharedStyle from '../../css/shared.module.css';
import { PasswordUpdateReqest } from '../../api/type/user';
import Head from 'next/head';

interface FormValues {
	password?: string;
	passwordConfirm?: string;
}

interface Errors {
	resErr?: string;
}

const initialValues: FormValues = {
	password: '',
	passwordConfirm: '',
}

const initialErrors: Errors = {
	resErr: '',
}

const PasswordUpdate: NextPage = () => {
	const [formValues, setFormValues] = useState<FormValues>(initialValues);
	const [formError, setFormError] = useState<Errors>(initialErrors);
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFormError(validate(formValues));
		if (formError.resErr !== '') {
			return
		}
		passwordUpdatePost()
	}

	const passwordUpdatePost = () => {
		const { token } = router.query
		const url: string = 'v1/password_update/' + token
		const body: PasswordUpdateReqest = {
			password: formValues.password.trim(),
		}
		publicClient
			.post(url, body)
			.then((results) => {
				console.log("results", results)
				router.push("/login");
			})
			.catch((err) => {
				console.log("err", err)
				if (!err.response || !err.response.data) {
					return
				}
				if (err.response.data === ErrorMessages.UserEmailDuplicate) {
					setFormError({ resErr: "このメールアドレスは既に登録されています" })
				} else if (err.response.data === ErrorMessages.TokenIsExpired) {
					setFormError({ resErr: "トークンの有効期限が切れています。再度、やり直してください。" })
				} else {
					setFormError({ resErr: "予期せぬエラーです" })
				}
			})
	}

	const validate = (values: FormValues) => {
		const errors = initialErrors;
		if (!values.password) {
			errors.resErr = "パスワードを入力してください"
		} else if (values.password.length < 8) {
			errors.resErr = "パスワードは8文字以上, 20文字以下にしてください"
		} else if (values.password.length > 21) {
			errors.resErr = "パスワードは8文字以上, 20文字以下にしてください"
		}
		if (values.password != values.passwordConfirm) {
			errors.resErr = "パスワードが一致しません"
		}

		return errors
	}

	return (
		<div className={sharedStyle.background}>
			<Head>
				<title>パスワードを更新</title>
			</Head>
			<TweetApp />
			<div className={IndexStyle.formContainer}>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className={PasswordUpdateStyle.uiForm}>
						<div className={PasswordUpdateStyle.formField}>
							<label>パスワード</label>
							<input
								type="text"
								placeholder="パスワード"
								name="password"
								onClick={() => setFormError(validate(formValues))}
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className={PasswordUpdateStyle.formField}>
							<label>パスワード確認用</label>
							<input
								type="text"
								placeholder="パスワード"
								name="passwordConfirm"
								onClick={() => setFormError(validate(formValues))}
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<ErrorMsg err={formError.resErr} />
						<Formbtn name="パスワードリセット" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default PasswordUpdate;
