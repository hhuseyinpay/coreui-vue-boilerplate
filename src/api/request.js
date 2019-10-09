import axios from 'axios'
import store from '@/store'
import {getToken} from '@/utils/auth'
import {ErrorMessage} from "@/shared/messages";

// create an axios instance
const request = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  //withCredentials: true, // send cookies when cross-domain requests
  timeout: 25000 // request timeout
});

// request interceptor
request.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authentication'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(this)
    console.error('request.js 29: ' + error); // for debug
    ErrorMessage(error.message, 'Servera bağlantı sırasında bir hata meydana geldi.', 5 * 1000);
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  response => {
    const res = response.data;

    return res;
  },
  async error => {
    console.error('request.js 61: ', {error}); // for debug
    if (!error.response) {
      ErrorMessage(error.message, 'Servera bağlantı sırasında bir hata meydana geldi.', 15 * 1000);
      return Promise.reject(error)
    }
    const status = error.response.status
    if (status >= 500) {
      ErrorMessage('Serverda bir hata meydana geldi.');
    } else if (status === 401) {
      ErrorMessage('Giriş hatası');
      await store.dispatch('user/resetToken').then(() => {
        this.$router.push('login')
      })
    } else if (status === 403) {
      ErrorMessage('Yetki hatası');
    } else {
      ErrorMessage(error.message, 'Bilinmeyen bir hata', 5 * 1000);
    }
    return Promise.reject(error)
  }
);

export default request
