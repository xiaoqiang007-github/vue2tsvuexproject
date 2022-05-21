import {
  request,
  MyData,
  successCode,
  formateReturnData,
  getQueryCourses,
  changeState,
  uploadCourse,
  saveOrUpdateCourse,
  getCourseById
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

export const toUploadCourse = async (params: FormData, cb?: (e: ProgressEvent)=>void): Promise<MyData> => {
  const data = await request({
    url: uploadCourse,
    method: 'post',
    headers: {
      // 遇到需要传递From URL Encoded 格式 formData， 需要 手动设置 content-type：application/x-www-form-urlencoded ，
      // 并且使用 qs.stringify （data） 将data转换为url格式，才能正常使用
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: params,
    onUploadProgress: (e: ProgressEvent) => {
      cb && cb(e)
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

export const toSaveOrUpdateCourse = async (params: any): Promise<MyData> => {
  const data = await request({
    url: saveOrUpdateCourse,
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
export const toGetCourseById = async (courseId: number | string): Promise<MyData> => {
  const data = await request({
    url: getCourseById,
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
