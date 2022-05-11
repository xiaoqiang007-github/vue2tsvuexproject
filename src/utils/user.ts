import { request, login, userInfo, loginOut } from './index'
import qs from 'qs'
import { AxiosResponse } from 'axios'

interface Login {
    phone: string
    code?: string
    password: string
}

interface MyData1 {
    state: number
    success: boolean
    message: string
    content: any
    [propName: string]: any // 允许有其它任意类型的属性
}

interface MyData2 {
  message?: string
  content: any
  error: any
}

export const userLogin = async (params: Login): Promise<AxiosResponse<MyData1>> => {
  return await request({
    url: login,
    method: 'post',
    data: qs.stringify(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const getUserInfo = async (Authorization: string): Promise<MyData2> => {
  const data = await request({
    url: userInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization
    }
  })
  const { state, message, content } = data.data
  if (state !== 1) {
    // this.$message.error(message)
    return { error: '', content }
  } else {
    return { error: message, content }
  }
}

export const toLoginOut = async (Authorization: string): Promise<MyData2> => {
  const data = await request({
    url: loginOut,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization
    }
  })
  const { state, message, content } = data.data
  if (state !== 1) {
    // this.$message.error(message)
    return { error: '', content }
  } else {
    return { error: message, content }
  }
}
