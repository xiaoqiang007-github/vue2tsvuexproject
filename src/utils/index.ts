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
  return config
}, async function (error) {
  if (error.response) { // 请求收到了响应，但是超出了2xx范围
    // 和后端协商的状态码
    const { status } = error.response
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

// 两个服务的成功状态码
export const successCode = [1, '000000']

export interface MyData { // 返回接口类型比联合数组数据更好用些
  success?: boolean
  time?: string
  state: number | string
  error: string
  message: string
  content: any
  [propName: string]: any
}

// 定义接口函数统一返回的数据格式
export interface MyData2 { // 返回接口类型比联合数组数据更好用些
  success: boolean
  state: number
  message: string
  content: any
  [propName: string]: any
}

export interface MyData3 { // 返回接口类型比联合数组数据更好用些
  code: string
  mesg: string
  time: string
  data: any
  [propName: string]: any
}

// 处理接口返回的数据格式
export const formateReturnData = (data: MyData2 | MyData3): MyData => {
  let result: MyData = {
    error: '',
    message: '',
    state: '',
    content: {}
  }
  try {
    if (data.data) {
      result = {
        state: data.code,
        error: '',
        message: data.mesg,
        content: data.data
      }
    } else {
      result = {
        state: data.state,
        error: '',
        message: data.message,
        content: data.content
      }
    }
    return result
  } catch (e) {
    console.log('formateReturnDate error: ', e)
    return result
  }
}

export const login = '/front/user/login'

export const userInfo = '/front/user/getInfo'

export const loginOutUrl = '/front/user/logout'

export const saveOrUpdate = '/boss/menu/saveOrUpdate'

export const getEditMenuInfo = '/boss/menu/getEditMenuInfo'

export const getAllMenu = '/boss/menu/getAll'

// 删除菜单
export const deleteMenu = '/boss/menu/'

// 按条件分页查询资源
export const getResourcePages = '/boss/resource/getResourcePages'

// 查询资源分类列表
export const getAllSource = '/boss/resource/category/getAll'

// 获取所有角色
export const getRoleAll = '/boss/role/all'

// 删除角色
export const deleteRole = '/boss/role/'

// 添加或更新角色
export const saveOrUpdateRole = '/boss/role/saveOrUpdate'

// 获取角色
export const getRole = '/boss/role/'

// 获取所有菜单并按层级展示
export const getMenuNodeList = '/boss/menu/getMenuNodeList'

// 获取角色拥有的菜单列表
export const getRoleMenus = '/boss/menu/getRoleMenus'

// 给用户分配角色
export const setAllocateUserRoles = '/boss/role/allocateUserRoles'

// 查询资源分类列表
export const getAllResourceCategory = '/boss/resource/category/getAll'

// 获取角色拥有的资源列表
export const getRoleResources = '/boss/resource/getRoleResources'

// 给角色分配资源
export const setResource = '/boss/resource/allocateRoleResources'

// 分页查询用户信息
export const getUserPages = '/boss/user/getUserPages'

// 查询用户角色
export const queryRoleUser = '/boss/role/user/'

// 分页查询课程信息
export const getQueryCourses = '/boss/course/getQueryCourses'

// 课程上下架
export const changeState = '/boss/course/changeState'
