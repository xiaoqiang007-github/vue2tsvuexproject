import { request, saveOrUpdate } from './index'

interface MyData2 { // 返回接口类型比联合数组数据更好用些
    error: string
    message: string
    content: any
}

export const toSaveOrUpdate = async (): Promise<MyData2> => {
  const data = await request({
    url: saveOrUpdate,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
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