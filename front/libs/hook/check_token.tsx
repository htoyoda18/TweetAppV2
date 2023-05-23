import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetToken } from '../../shared/localStorage';
import { privateClient } from '../../api/client/axios'
import { ApiErrorMessages } from '../../shared/error'
import { ValidateToken } from '../../api/client/validate_token'

export const useCheckToken = () => {
    const router = useRouter();

    useEffect(() => {
        const token = GetToken();
        if (!token) {
            router.push('/login');
            return
        }

        const validateToken = async () => {
            const ValidateTokenErr = await ValidateToken();
            if (typeof ValidateTokenErr === 'string' && ValidateTokenErr === ApiErrorMessages.FailAuthToken) {
                router.push('/login');
            } else {
                return
            }
        }

        validateToken()
    }, [router]);
}