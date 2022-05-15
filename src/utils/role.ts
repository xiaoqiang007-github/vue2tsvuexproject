import {
  request,
  MyData,
  successCode,
  formateReturnData,
  getRoleAll,
  deleteRole,
  saveOrUpdateRole
} from './index'

export const toGetRoleAll = async (): Promise<MyData> => {
  const data = await request({
    url: getRoleAll,
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

export const toDeleteRole = async (id: number): Promise<MyData> => {
  const data = await request({
    url: deleteRole + id,
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

interface RoleQuery {
  id: number | string
  code: string
  name: string
  description: string
}

export const toSaveOrUpdateRole = async (params: RoleQuery): Promise<MyData> => {
  const data = await request({
    url: saveOrUpdateRole,
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
