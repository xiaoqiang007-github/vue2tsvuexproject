// 课时
import {
  request,
  MyData,
  successCode,
  formateReturnData,
  saveOrUpdateClassHour
} from './index'

export const toSaveOrUpdateClassHour = async (params: any): Promise<MyData> => {
  const data = await request({
    url: saveOrUpdateClassHour,
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
