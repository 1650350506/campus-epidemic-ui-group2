import request from '@/plugins/request'

import moduleName from '@/config/moduleName'

export function updateUser(data) {
  return request({
    url: `${moduleName.doraemon_user}/user/update`,
    method: 'post',
    urlType: 'login',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}

export function updatePassword(data) {
  return request({
    url: `${moduleName.doraemon_user}/user/updatePassword`,
    method: 'post',
    data
  })
}

export function getVoByUserName(data) {
  return request({
    url: `${moduleName.doraemon_user}/user/getVoByUserName`,
    method: 'get',
    params: {
      ...data
    }
  })
}

export function RegUserInfo(data) {
  return request({
    url: `${moduleName.doraemon_campus}/registration/add`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

export function GetUserInfoByToken(data) {
  return request({
    url: `${moduleName.doraemon_userinfo}/userManage/viewUserInfo`,
    method: 'post',
    urlType: 'jixian'
  })
}
