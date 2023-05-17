import { useState, useEffect } from 'react';
import { NextPage } from "next";
import { useRouter } from 'next/router';
import LoginStyle from '../css/login.module.css';
import IndexStyle from '../css/index.module.css';
import sharedStyle from '../css/shared.module.css';
import { client } from '../libs/axios';
import { TweetApp } from "../component/tweet_app";
import { Note } from "../component/note";
import { Formbtn } from "../component/form_btn";
import { ErrorMsg } from "../component/error_message";
import { ErrorMessages } from '../shared/error';
import { GetToken } from '../shared/localStorage'

interface FormValues {
    mailAddress?: string;
    password?: string;
    resErr?: string;
}

interface Errors {
    mailAddress?: string;
    password?: string;
    resErr?: string;
}

const initialValues: FormValues = {
    mailAddress: '',
    password: '',
}

const Login: NextPage = () => {
    const [formValues, setFormValues] = useState<FormValues>(initialValues);
    const [formErrors, setFormErrors] = useState<FormValues>(initialValues);
    const router = useRouter();
    const token = GetToken()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/v1/validate_token', {
                headers: {
                    Authorization: token,
                },
            });
            if (response.ok) {
                router.push('/');
            }
        };

        if (token) {
            fetchData();
        }
    }, [router]);

    const handleSubmit = (e: React.FormEvent) => {
        console.log('これは実行されている？')
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        if (Object.keys(formErrors).length > 0) {
            return;
        }
        loginPost();
    }

    const validate = (values: FormValues): Errors => {
        const errors: Errors = {};
        if (!values.mailAddress) {
            errors.mailAddress = "メールアドレスを入力してください";
        }
        if (!values.password) {
            errors.password = "パスワードを入力してください";
        }

        return errors;
    }

    const loginPost = () => {
        const body = {
            password: formValues.password.trim(),
            email: formValues.mailAddress.trim(),
        }
        client
            .post('v1/login', body)
            .then((res) => {
                console.log('これで上手くいってる？？？？？')
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
                    setFormErrors({ resErr: "メールアドレスまたはパスワードが違います" });
                } else {
                    setFormErrors({ resErr: "予期せぬエラーです" });
                }
            })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({ ...prevValues, [name]: value }));
    }

    return (
        <div className={sharedStyle.background}>
            <TweetApp />
            <div className={IndexStyle.formContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={LoginStyle.uiForm}>
                        <div className={LoginStyle.formFiled}>
                            <label>メールアドレス</label>
                            <input
                                type="text"
                                placeholder="メールアドレス"
                                name="mailAddress"
                                onChange={handleChange}
                            />
                        </div>
                        <ErrorMsg err={formErrors.mailAddress} />
                        <div className={LoginStyle.formFiled}>
                            <label>パスワード</label>
                            <input
                                type="password"
                                placeholder="パスワード"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <ErrorMsg err={formErrors.password} />
                        <ErrorMsg err={formErrors.resErr} />
                        <Formbtn name="ログイン" />
                    </div>
                </form>
            </div>
            <Note
                text="パスワードを忘れた場合は"
                link="こちら"
                url="http://localhost:3000/password_reset"
            />
            <Note
                text="アカウントをお持ちでない場合は"
                link="登録"
                url="http://localhost:3000/signup"
            />
        </div>
    );
}

export default Login;