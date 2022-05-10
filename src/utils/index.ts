import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://edufront.lagounews.com'
})

export const login = '/front/user/login'
