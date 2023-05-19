import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetToken } from '../../shared/localStorage';
import { privateClient } from '../client/axios'
import { ErrorMessages } from '../../shared/error'

export const useCheckToken = () => {
    const router = useRouter();

    useEffect(() => {
        const token = GetToken();
        if (!token) {
            router.push('/login');
            return
        }
        privateClient
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
                if (err.response.data === ErrorMessages.FailAuthToken) {
                    router.push('/login');
                }
            })
    }, [router]);
}