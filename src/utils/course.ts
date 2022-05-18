import {
  request,
  MyData,
  successCode,
  formateReturnData,
  getQueryCourses,
  changeState
} from './index'

interface CourseQuery {
  currentPage: number
  pageSize: number
  courseName: string
  status: number
}

export const toGetQueryCourses = async (params: CourseQuery): Promise<MyData> => {
  const data = await request({
    url: getQueryCourses,
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

interface CourseState {
  courseId: number | string
  status: number | string
}

export const toChangeState = async (params: CourseState): Promise<MyData> => {
  const data = await request({
    url: changeState,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: params
  })
  const { state, content, message } = formateReturnData(data.data)
  return {
    error: successCode.includes(state) ? '' : 'error',
    message,
    content,
    state
  }
}
