import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

export const request = axios.create({
  baseURL: 'http://edufront.lagounews.com'
})

function redirectToken () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

request.interceptors.request.use(function (config) {
  const { user } = store.state
  console.log('request.config', config)
  if (user && user.refresh_token) {
    config.headers =
    {
      ...config.headers,
      // Authorization: user.refresh_token
      Authorization: user.access_token
    }
  }
  return config
}, async function (error) {
  return Promise.reject(error)
})

let isRreshShing = false // 控制刷新token状态
let requests:any[] = [] // 存储刷新token 期间过来的401请求
request.interceptors.response.use(function (config) {
  console.log('response.request', config)
  return config
}, async function (error) {
  if (error.response) { // 请求收到了响应，但是超出了2xx范围
    // 和后端协商的状态码
    const { status } = error.response
    // console.log('status', status)
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // 授权失败： 重新登录，获取token
      if (!store.state.user) {
        redirectToken()
        return Promise.reject(error)
      }

      // 刷新token
      if (!isRreshShing) { // token失效，发送多个请求，多次刷请token的问题
        isRreshShing = true // 开启刷新状态
        // 尝试开始刷新token
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw (new Error('刷新 Token 失败'))
          }
          // 成功了 更新token并把本次请求发出去
          store.commit('setUser', res.data.content)
          // 还需要把 requests 队列中的请求重新发送出去
          requests.forEach(cb => cb())
          requests = [] // 重置数组
          return request(error.config)
        }).catch(error => {
          // 失败了->跳转登录页重新获取新的 token
          redirectToken()
          return Promise.reject(error)
        }).finally(() => {
          isRreshShing = false // 重置刷新状态
        })
      }

      // 刷新状态下，把请求挂起放到requests 数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求没有收到响应
    Message.error('请求超时，请刷新尝试')
  } else { // 在请求时发生了一些错误
    Message.error(`请求失败: ${error.message}`)
  }
  return Promise.reject(error)
})

export const login = '/front/user/login'

export const userInfo = '/front/user/getInfo'

export const loginOutUrl = '/front/user/logout'
