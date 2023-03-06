import request from '@/plugins/request'

export function updateUser(data) {
  return request({
    url: `/user/update`,
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
    url: `/user/updatePassword`,
    method: 'post',
    data
  })
}

export function getVoByUserName(data) {
  return request({
    url: `/user/getVoByUserName`,
    method: 'get',
    params: {
      ...data
    }
  })
}

export function RegUserInfo(data) {
  return request({
    url: `/userManage/registerUser`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

export function GetUserInfoByToken() {
  return request({
    url: `/userManage/viewUserInfo`,
    method: 'post',
    urlType: 'jixian'
  })
}

export function ActiveUserInfo(data) {
  return request({
    url: `/userManage/account/active`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

export function GetUserInfoByUsername(data) {
  return request({
    url: `/userManage/viewUser/userName`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}
