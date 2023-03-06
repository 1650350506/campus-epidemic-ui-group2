import request from '@/plugins/request'

// 模糊查询权限列表
export function listByName(data) {
  return request({
    url: `/permission/listTopNByCname`,
    method: 'get',
    params: {
      ...data
    }
  })
}

// 树结构
export function getPermissionTree(data) {
  return request({
    url: `/permission/listTree`,
    method: 'post',
    data
  })
}

// 获取所有父ID
export function listParentIdsById(data) {
  return request({
    url: `/permission/listParentIdsById`,
    method: 'post',
    data
  })
}

// 获取所有父
export function listParentById(data) {
  return request({
    url: `/permission/listParentById`,
    method: 'get',
    params: {
      ...data
    }
  })
}

// 模糊查询所有权限列表
export function listAllByName(data) {
  return request({
    url: `/permission/listByCname`,
    method: 'get',
    params: {
      ...data
    }
  })
}
