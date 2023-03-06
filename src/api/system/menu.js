import request from '@/plugins/request'

export function GetMenus(data) {
  return request({
    url: `/user/listMenu`,
    method: 'get',
    urlType: 'login',
    params: {
      ...data
    }
  })
}

export function GetPermissionBtns(data) {
  return request({
    url: `/menu/listButtonByParentId`,
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
    url: `/menu/listAppBaseMenu`,
    method: 'get',
    urlType: 'login',
    params: {
      ...data
    }
  })
}
