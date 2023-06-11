import { useState, useEffect } from 'react';
import { NextPage } from "next";
import { useRouter } from 'next/router';
import LoginStyle from '../../css/login.module.css';
import IndexStyle from '../../css/index.module.css';
import sharedStyle from '../../css/shared.module.css';
import { TweetApp } from "../../component/tweet_app";
import { Note } from "../../component/note";
import { Formbtn } from "../../component/form_btn";
import { ErrorMsg } from "../../component/error_message";
import { ApiErrorMessages } from '../../shared/error';
import { UserLoginReqest } from '../../api/type/user';
import Head from 'next/head';
import { FormField } from '../../component/login_form_fileds'
import { url } from '../../shared/url'
import { LoginPost } from '../../api/client/login'
import { ValidateToken } from '../../api/client/validate_token'
import { GetToken } from '../../shared/localStorage';

interface Errors {
    emailErr?: string;
    passwordErr?: string;
    apiErr?: string;
}

const Login: NextPage = () => {
    const [loginRequestData, setLoginRequestData] = useState<UserLoginReqest>({ email: '', password: '' });
    const [loginErrors, setLoginErrors] = useState<Errors>({ emailErr: '', passwordErr: '', apiErr: '' });
    const router = useRouter();

    useEffect(() => {
        const validateToken = async () => {
            const token = GetToken();
            if (!token) {
                return
            }
            const ValidateTokenErr = await ValidateToken();
            if (typeof ValidateTokenErr === 'string' && ValidateTokenErr === ApiErrorMessages.FailAuthToken) {
                return
            } else {
                router.push("/");
            }
        };
        validateToken()
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validate(loginRequestData);
        setLoginErrors(errors);
        if (Object.keys(errors).length !== 0) {
            return;
        }
        const login = async () => {
            const loginErr = await LoginPost(loginRequestData);
            if (typeof loginErr === 'string' && loginErr !== '') {
                setLoginErrors({ apiErr: loginErr })
            } else {
                router.push("/");
            }
        }
        login()
    }

    const validate = (values: UserLoginReqest): Errors => {
        const errors: Errors = {};
        if (!values.email) {
            errors.emailErr = "メールアドレスを入力してください";
        }
        if (!values.password) {
            errors.passwordErr = "パスワードを入力してください";
        }
        return errors;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginRequestData(prevValues => ({ ...prevValues, [name]: value }));
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
                            name='email'
                            onChange={handleChange}
                        />
                        <ErrorMsg err={loginErrors.emailErr} />
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