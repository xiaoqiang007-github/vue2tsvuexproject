import {
  request,
  MyData,
  successCode,
  formateReturnData,
  getResourcePages,
  getAllSource
} from './index'

interface SourceQuery { // 返回接口类型比联合数组数据更好用些
  id?: number
  name?: string
  startCreateTime?: string
  url?: string
  categoryId?: null | number
  endCreateTime?: string
  current?: number
  size?: number
}

export const toGetResourcePages = async (params: SourceQuery): Promise<MyData> => {
  const data = await request({
    url: getResourcePages,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
  const { state, content, message } = formateReturnData(data.data)
  return {
    error: successCode.includes(state) ? '' : 'error',
    message,
    content,
    state
  }
}

export const toGetAllSource = async (resourceId = -1): Promise<MyData> => {
  const data = await request({
    url: getAllSource,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      resourceId
    }
  })
  const { state, content, message } = formateReturnData(data.data)
  return {
    error: successCode.includes(state) ? '' : 'error',
    message,
    content,
    state
  }
}
