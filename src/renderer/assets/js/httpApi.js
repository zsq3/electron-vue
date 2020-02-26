import axios from 'axios'
import { Notification } from 'element-ui';

const httpApi = axios.create({
    baseURL: 'http://localhost:8089',
    timeout: 10000
});

//请求拦截
//返回拦截
httpApi.interceptors.response.use(res => {
    if(res.data.retCode > 0){
        return Promise.resolve(res.data);
    } else{
        Notification({
            title: '错误',
            message: '请求失败，请稍后重试',
            type: 'error'
        });

        return Promise.reject(res.data)
    }
}, error => {
    Notification({
        title: '错误',
        message: '网络出了点问题，请稍后重试'+ error,
        type: 'error'
    });

    return Promise.reject(error)
});


//get请求
const get = (url, params) => httpApi.get(url, { params });

//post请求
const post = (url, params) => httpApi.post(url, params);

//delete请求
const deletes = (url, params) => httpApi.delete(url, { params });



export default {
    get,
    post,
    deletes
}
