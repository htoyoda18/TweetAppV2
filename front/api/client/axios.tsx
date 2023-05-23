import axios from 'axios'
import { GetToken } from '../../shared/localStorage';
import { url } from '../../shared/url';

const baseConfig = {
    baseURL: url.LocalBaseURL,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Headers': 'access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
    },
}

export const publicClient = axios.create(baseConfig);

export const privateClient = axios.create(baseConfig);

privateClient.interceptors.request.use((config) => {
    const token = GetToken();
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});