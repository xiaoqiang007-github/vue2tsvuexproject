import {
  request,
  MyData,
  successCode,
  formateReturnData,
  getRoleResources,
  getAllResourceCategory,
  setResource
} from './index'

export const toGetAssestAll = async (id: string | number): Promise<MyData> => {
  const data = await request({
    url: getRoleResources,
    method: 'get',
    params: {
      roleId: id
    },
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

export const toGetAllResourceCategory = async (): Promise<MyData> => {
  const data = await request({
    url: getAllResourceCategory,
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

interface SetResource {
  roleId: string | number
  resourceIdList: number[] | string[]
}

export const toSetResource = async (params: SetResource): Promise<MyData> => {
  const data = await request({
    url: setResource,
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
