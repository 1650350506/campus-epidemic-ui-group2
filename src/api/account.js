import request from '@/plugins/request'

export function AccountLogin(data) {
  // data['tenant_id'] = '000000'
  return request({
    url: `/user/userlogin`,
    method: 'post',
    data
  })
}

export function AccountReg(data) {
  return request({
    url: `/userManage/registerUser`,
    method: 'post',
    urlType: 'login',
    params: {
      ...data
    }
  })
}
