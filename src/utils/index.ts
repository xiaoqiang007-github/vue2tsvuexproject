import axios from 'axios'
import store from '@/store'

const request0 = axios.create({
  baseURL: 'http://edufront.lagounews.com'
})

request0.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export const request = request0

export const login = '/front/user/login'

export const userInfo = '/front/user/getInfo'

export const loginOut = '/front/user/logout'
