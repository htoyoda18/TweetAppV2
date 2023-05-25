import { UserLoginReqest } from '../type/user';
import { publicClient } from './axios';
import { ApiErrorMessages } from '../../shared/error';

export const LoginPost = (loginData: UserLoginReqest): Promise<void | string> => {
    const body: UserLoginReqest = {
        password: loginData.password.trim(),
        email: loginData.email.trim(),
    }

    return publicClient
        .post('v1/login', body)
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userID", res.data.userID);
            return;
        })
        .catch((err) => {
            console.log("err", err);
            if (!err.response || !err.response.data) {
                return;
            }
            if (err.response.data === ApiErrorMessages.EmailNotFound) {
                return "存在しないメールアドレスです";
            } else if (err.response.data === ApiErrorMessages.FailPassword) {
                return "パスワードが違います";
            } else {
                return "予期せぬエラーです";
            }
        });
}
