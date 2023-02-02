import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Request-Headers'] = 'access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type';

export const client = axios.create({
  baseURL: 'http://localhost:8080/',
})
