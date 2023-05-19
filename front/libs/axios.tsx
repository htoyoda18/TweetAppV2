import axios from 'axios'
import { GetToken } from '../shared/localStorage';

const baseConfig = {
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Headers': 'access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
    },
}

export const publicClient = axios.create(baseConfig);

export const privateClient = axios.create({
    ...baseConfig,
    headers: {
        ...baseConfig.headers,
        // 例えば以下のようにヘッダーにトークンを付与します。
        Authorization: GetToken(),
    },
});