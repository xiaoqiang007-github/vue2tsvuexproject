import {
  request,
  MyData,
  successCode,
  formateReturnData,
  getRoleAll,
  deleteRole,
  saveOrUpdateRole,
  getRole,
  setAllocateUserRoles,
  getMenuNodeList,
  getRoleMenus,
  queryRoleUser
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

export const toGetRole = async (id: string | number): Promise<MyData> => {
  const data = await request({
    url: getRole + id,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
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

interface SetUser {
  userId: string | number
  roleIdList: number[] | string[]
}

export const toSetAllocateUserRoles = async (params: SetUser): Promise<MyData> => {
  const data = await request({
    url: setAllocateUserRoles,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json'
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

export const toGetRoleMenus = async (id: string | number): Promise<MyData> => {
  const data = await request({
    url: getRoleMenus,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      roleId: id
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

export const toGetMenuNodeList = async (): Promise<MyData> => {
  const data = await request({
    url: getMenuNodeList,
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

export const toQueryRoleUser = async (id: string | number): Promise<MyData> => {
  const data = await request({
    url: queryRoleUser + id,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
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
