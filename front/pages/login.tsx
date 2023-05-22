import { useState, useEffect } from 'react';
import { NextPage } from "next";
import { useRouter } from 'next/router';
import LoginStyle from '../css/login.module.css';
import IndexStyle from '../css/index.module.css';
import sharedStyle from '../css/shared.module.css';
import { publicClient, privateClient } from '../libs/client/axios';
import { TweetApp } from "../component/tweet_app";
import { Note } from "../component/note";
import { Formbtn } from "../component/form_btn";
import { ErrorMsg } from "../component/error_message";
import { ErrorMessages } from '../shared/error';
import { UserLoginReqest } from '../api/type/user';
import Head from 'next/head';
import { FormField } from '../component/login_form_fileds'
import { url } from '../shared/url'

interface FormValues {
    mailAddress?: string;
    password?: string;
}

interface Errors {
    mailAddressErr?: string;
    passwordErr?: string;
    apiErr?: string;
}

const Login: NextPage = () => {
    const [formValues, setFormValues] = useState<FormValues>({ mailAddress: '', password: '' });
    const [loginErrors, setLoginErrors] = useState<Errors>({ mailAddressErr: '', passwordErr: '', apiErr: '' });
    const router = useRouter();

    useEffect(() => {
        const validateToken = async () => {
            privateClient
                .get('v1/validate_token')
                .then((results) => {
                    router.push("/");
                })
                .catch((err) => {
                    console.log("err", err)
                })
        };
        validateToken()
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validate(formValues);
        setLoginErrors(errors);
        if (Object.keys(errors).length !== 0) {
            return;
        }
        loginPost();
    }

    const validate = (values: FormValues): Errors => {
        const errors: Errors = {};
        if (!values.mailAddress) {
            errors.mailAddressErr = "メールアドレスを入力してください";
        }
        if (!values.password) {
            errors.passwordErr = "パスワードを入力してください";
        }

        return errors;
    }

    const loginPost = () => {
        const body: UserLoginReqest = {
            password: formValues.password.trim(),
            email: formValues.mailAddress.trim(),
        }
        publicClient
            .post('v1/login', body)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userID", res.data.userID);
                router.push("/");
            })
            .catch((err) => {
                console.log("err", err);
                if (!err.response || !err.response.data) {
                    return;
                }
                if (err.response.data === ErrorMessages.UserNotFound) {
                    setLoginErrors({ apiErr: "存在しないメールアドレスです" });
                } else if (err.response.data === ErrorMessages.FailPassword) {
                    setLoginErrors({ apiErr: "パスワードが違います" });
                } else {
                    setLoginErrors({ apiErr: "予期せぬエラーです" });
                }
            })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({ ...prevValues, [name]: value }));
    }

    return (
        <div className={sharedStyle.background}>
            <Head>
                <title>ログイン</title>
            </Head>
            <TweetApp />
            <div className={IndexStyle.formContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={LoginStyle.uiForm}>
                        <FormField
                            label='メールアドレス'
                            placeholder='メールアドレス'
                            name='mailAddress'
                            onChange={handleChange}
                        />
                        <ErrorMsg err={loginErrors.mailAddressErr} />
                        <FormField
                            label='パスワード'
                            placeholder='パスワード'
                            name='password'
                            onChange={handleChange}
                        />
                        <ErrorMsg err={loginErrors.passwordErr} />
                        <ErrorMsg err={loginErrors.apiErr} />
                        <Formbtn name="ログイン" />
                    </div>
                </form>
            </div>
            <Note
                text="パスワードを忘れた場合は"
                link="こちら"
                url={url.PasswordResetPage}
            />
            <Note
                text="アカウントをお持ちでない場合は"
                link="登録"
                url={url.SinupPage}
            />
        </div>
    );
}

export default Login;