import {
  request,
  saveOrUpdate,
  MyData,
  successCode,
  getEditMenuInfo,
  formateReturnData,
  getAllMenu,
  deleteMenu
} from './index'

interface UpdateMenu {
  parentId: number
  name: string
  href: string
  icon: string
  orderNum: number
  description: string
  shown: boolean
}

export const toSaveOrUpdate = async (params: UpdateMenu): Promise<MyData> => {
  const data = await request({
    url: saveOrUpdate,
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

export const toGetEditMenuInfo = async (id: string | number = -1): Promise<MyData> => {
  const data = await request({
    url: getEditMenuInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      id: id
    }
  })
  // 默认得到是front格式数据，如MyData格式，如果不是则
  const { state, content, message } = formateReturnData(data.data)
  console.log('formateReturnData(data.data)', formateReturnData(data.data))
  return {
    error: successCode.includes(state) ? '' : 'error',
    message,
    content,
    state
  }
}

export const toGetAllMenu = async (): Promise<MyData> => {
  const data = await request({
    url: getAllMenu,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
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

export const toDeleteMenu = async (id: string): Promise<MyData> => {
  const data = await request({
    url: deleteMenu + id,
    method: 'delete',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
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
