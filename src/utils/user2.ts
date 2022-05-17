import {
  request,
  MyData,
  successCode,
  formateReturnData,
  getUserPages
} from './index'

interface UserQuery {
  currentPage: number
  pageSize: number
  phone: string
  userId: string
  startCreateTime: string
  endCreateTime: string
}

export const toGetUserPages = async (params: UserQuery): Promise<MyData> => {
  const data = await request({
    url: getUserPages,
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
