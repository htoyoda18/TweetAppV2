import { NextPage } from "next";
import { useState } from "react";
import { publicClient } from "../../api/client/axios";
import SignUpStyle from "../../styles/signup.module.css";
import { useRouter } from "next/router";
import sharedStyle from "../../styles/shared.module.css";
import { TweetApp } from "../../component/tweet_app";
import { Note } from "../../component/note";
import { Formbtn } from "../../component/form_btn";
import { ErrorMsg } from "../../component/error_message";
import IndexStyle from "../../styles/index.module.css";
import { ApiErrorMessages } from "../../shared/error";
import { SignupReqest } from "../../api/type/user";
import Head from "next/head";
import { url } from "../../shared/url";

interface FomrErrors {
  emailErr?: string;
  userNameErr?: string;
  passwordErr?: string;
  resErr?: string;
}

interface FormValues {
  email?: string;
  password?: string;
  userName?: string;
}

const SignUp: NextPage = () => {
  const [formValues, setFromValues] = useState<FormValues>({
    userName: "",
    email: "",
    password: "",
  });
  const [fomrErrors, setFromError] = useState<FomrErrors>({
    emailErr: "",
    userNameErr: "",
    passwordErr: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFromValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFromError(validate(formValues));
    if (Object.keys(fomrErrors).length > 0) {
      return;
    }
    signUpPost();
  };

  const signUpPost = () => {
    const body: SignupReqest = {
      userName: formValues.userName.trim(),
      password: formValues.password.trim(),
      email: formValues.email.trim(),
    };
    publicClient
      .post("v1/signup", body)
      .then((results) => {
        router.push("/login");
      })
      .catch((err) => {
        console.log("err", err);
        if (!err.response || !err.response.data) {
          return;
        }
        if (err.response.data === ApiErrorMessages.UserEmailDuplicate) {
          setFromError({ resErr: "このメールアドレスは既に登録されています" });
        } else if (err.response.data === ApiErrorMessages.InvalidPassword) {
          setFromError({
            resErr: "パスワードはメールアドレスと異なるものにしてください",
          });
        } else {
          setFromError({ resErr: "予期せぬエラーです" });
        }
      });
  };

  const validate = (values: FormValues) => {
    const errors: FomrErrors = {};
    const regex: RegExp =
      /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (!values.userName) {
      errors.userNameErr = "ユーザ名を入力してください";
    }
    if (!values.email) {
      errors.emailErr = "メールをアドレスを入力してください";
    } else if (!regex.test(values.email)) {
      errors.emailErr = "正しいメールアドレスを入力してください";
    }
    if (!values.password) {
      errors.passwordErr = "パスワードを入力してください";
    } else if (values.password.length < 8) {
      errors.passwordErr = "パスワードは8文字以上, 20文字以下にしてください";
    } else if (values.password.length > 21) {
      errors.passwordErr = "パスワードは8文字以上, 20文字以下にしてください";
    }

    return errors;
  };

  return (
    <div className={sharedStyle.background}>
      <Head>
        <title>新規登録</title>
      </Head>
      <TweetApp />
      <div className={IndexStyle.formContainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={SignUpStyle.uiForm}>
            <div className={SignUpStyle.formField}>
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
            <div className={SignUpStyle.formField}>
              <label>メールアドレス</label>
              <input
                type="text"
                placeholder="メールアドレス"
                name="email"
                onClick={() => setFromError(validate(formValues))}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <ErrorMsg err={fomrErrors.emailErr} />
            <div className={SignUpStyle.formField}>
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
      <Note
        text="アカウントをお持ちの方は"
        link="ログイン"
        url={url.LoginPage}
      />
    </div>
  );
};

export default SignUp;
