import { GetToken } from '../../shared/localStorage';
import { privateClient } from './axios'
import { ApiErrorMessages, FrontErrorMessages } from '../../shared/error';

export const ValidateToken = (): Promise<void | string> => {
        return privateClient
            .get('v1/validate_token')
            .then((res) => {
                if (res.status === 200) {
                    return
                }
            })
            .catch((err) => {
                console.log("err", err)
                if (!err.response || !err.response.data) {
                    return
                }
                if (err.response.data === ApiErrorMessages.FailAuthToken) {
                    return ApiErrorMessages.FailAuthToken
                } else {
                    return err.response.data
                }
            })
}