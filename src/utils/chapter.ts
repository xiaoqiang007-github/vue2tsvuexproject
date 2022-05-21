// 章节
import {
  request,
  MyData,
  successCode,
  formateReturnData,
  getSectionAndLesson,
  saveOrUpdateSectionChapter
} from './index'

export const toGetSectionAndLesson = async (courseId: number | string): Promise<MyData> => {
  const data = await request({
    url: getSectionAndLesson,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      courseId
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

export const toSaveOrUpdateSectionChapter = async (params: any): Promise<MyData> => {
  const data = await request({
    url: saveOrUpdateSectionChapter,
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
