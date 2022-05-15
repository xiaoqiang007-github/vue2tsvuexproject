import { request, login, userInfo, loginOutUrl } from './index'
import qs from 'qs'
import axios, { AxiosResponse, AxiosError } from 'axios'

interface Login {
    phone: string
    code?: string
    password: string
}

interface MyData {
    state: number
    success: boolean
    message: string
    content: any
    [propName: string]: any // 允许有其它任意类型的属性
}

interface MyData2 { // 返回接口类型比联合数组数据更好用些
    error: string
    message: string
    content: any
}

export const userLogin = async (params: Login): Promise<AxiosResponse<MyData>> => {
  return await request({
    url: login,
    method: 'post',
    data: qs.stringify(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const getInfo = async (): Promise<MyData2> => {
  try {
    const data = await request({
      url: userInfo,
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const { state, content, message } = data.data
    console.log('getInfo...', state, content, message)
    return {
      error: state !== 1 ? 'error' : '',
      message,
      content
    }
  } catch (_e) {
    const e = _e as Error | AxiosError
    let message: string
    if (axios.isAxiosError(e) && e.response) {
      message = ''
    } else {
      message = (e as Error).message
    }
    return {
      error: 'error',
      message,
      content: ''
    }
  }
}

export const loginOut = async (): Promise<MyData2> => {
  const data = await request({
    url: loginOutUrl,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  const { state, content, message } = data.data
  if (state !== 1) {
    return {
      error: 'error',
      message,
      content
    }
  } else {
    return {
      error: '',
      message,
      content
    }
  }
}
