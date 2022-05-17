import {
  request,
  MyData,
  successCode,
  formateReturnData,
  getQueryCourses
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
