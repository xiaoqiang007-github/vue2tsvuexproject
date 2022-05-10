import { request, login } from './index'
import qs from 'qs'
import { AxiosResponse } from 'axios'

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
