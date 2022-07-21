import request from '@/plugins/request'
import moduleName from '@/config/moduleName'

export function GetMenus(data) {
  return request({
    url: `${moduleName.doraemon_system}/menu/listAppMenuByAppKey`,
    method: 'get',
    urlType: 'login',
    params: {
      ...data
    }
  })
}

export function GetPermissionBtns(data) {
  return request({
    url: `${moduleName.doraemon_system}/menu/listButtonByParentId`,
    method: 'get',
    urlType: 'login',
    params: {
      ...data
    }
  })
}

// listBaseMenu
export function listBaseMenu(data) {
  return request({
    url: `${moduleName.doraemon_system}/menu/listAppBaseMenu`,
    method: 'get',
    urlType: 'login',
    params: {
      ...data
    }
  })
}
