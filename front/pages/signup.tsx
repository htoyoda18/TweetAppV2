import { NextPage } from "next";
import { useState } from 'react';
import { client } from '../libs/axios'
import SignUpStyle from '../css/signup.module.css';
import { useRouter } from 'next/router'
import sharedStyle from '../css/shared.module.css';
import { TweetApp } from "../component/tweet_app"
import { Note } from "../component/note"
import { Formbtn } from "../component/form_btn"
import { ErrorMsg } from "../component/error_message"
import IndexStyle from '../css/index.module.css';
import { ErrorMessages } from '../shared/error'
import { SignupReqest } from '../api/type/user'

interface FomrErrors {
    mailAddressErr?: string;
    userNameErr?: string;
    passwordErr?: string;
    resErr?: string;
}

interface FormValues {
    mailAddress?: string;
    password?: string;
    userName?: string;
}

const SignUp: NextPage = () => {
    const [formValues, setFromValues] = useState<FormValues>({userName: "", mailAddress: "", password: "",});
    const [fomrErrors, setFromError] = useState<FomrErrors>({ mailAddressErr: '', userNameErr: '', passwordErr: '' });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFromValues({ ...formValues, [name]: value });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFromError(validate(formValues));
        if (Object.keys(fomrErrors).length > 0) {
            return
        }
        signUpPost()
    }

    const signUpPost = () => {
        const body: SignupReqest = {
            userName: formValues.userName.trim(),
            password: formValues.password.trim(),
            email: formValues.mailAddress.trim(),
        }
        client
            .post('v1/signup', body)
            .then((results) => {
                router.push("/login");
            })
            .catch((err) => {
                console.log("err", err)
                if (!err.response || !err.response.data) {
                    return
                }
                if (err.response.data === ErrorMessages.UserEmailDuplicate) {
                    setFromError({ resErr: "このメールアドレスは既に登録されています" })
                } else {
                    setFromError({ resErr: "予期せぬエラーです" })
                }
            })
    }

    const validate = (values: FormValues) => {
        const errors: FomrErrors = {};
        const regex: RegExp = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
        if (!values.userName) {
            errors.userNameErr = "ユーザ名を入力してください"
        }
        if (!values.mailAddress) {
            errors.mailAddressErr = "メールをアドレスを入力してください"
        } else if (!regex.test(values.mailAddress)) {
            errors.mailAddressErr = "正しいメールアドレスを入力してください"
        }
        if (!values.password) {
            errors.passwordErr = "パスワードを入力してください"
        } else if (values.password.length < 8) {
            errors.passwordErr = "パスワードは8文字以上, 20文字以下にしてください"
        } else if (values.password.length > 21) {
            errors.passwordErr = "パスワードは8文字以上, 20文字以下にしてください"
        }

        return errors
    }

    return (
        <div className={sharedStyle.background}>
            <TweetApp />
            <div className={IndexStyle.formContainer}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={SignUpStyle.uiForm}>
                        <div className={SignUpStyle.formFiled}>
                            <label>ユーザ名</label>
                            <input
                                type="text"
                                placeholder="ユーザ名"
                                name="userName"
                                onClick={() => setFromError(validate(formValues))}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <ErrorMsg err={fomrErrors.userNameErr} />
                        <div className={SignUpStyle.formFiled}>
                            <label>メールアドレス</label>
                            <input
                                type="text"
                                placeholder="メールアドレス"
                                name="mailAddress"
                                onClick={() => setFromError(validate(formValues))}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <ErrorMsg err={fomrErrors.mailAddressErr} />
                        <div className={SignUpStyle.formFiled}>
                            <label>パスワード</label>
                            <input
                                type="text"
                                placeholder="パスワード"
                                name="password"
                                onClick={() => setFromError(validate(formValues))}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <ErrorMsg err={fomrErrors.passwordErr} />
                        <ErrorMsg err={fomrErrors.resErr} />
                        <Formbtn name="新規登録" />
                    </div>
                </form>
            </div>
            <Note text="アカウントをお持ちの方は" link="ログイン" url="http://localhost:3000/login" />
        </div>
    );
};

export default SignUp;