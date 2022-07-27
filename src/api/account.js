import request from '@/plugins/request'
import website from '@/config/website'
import moduleName from '@/config/moduleName'

export function AccountLogin(data) {
  // data['tenant_id'] = '000000'
  data.client_id = website.clientId
  data.client_secret = website.clientSecret
  data.grant_type = 'password'
  data.scope = 'all'
  return request({
    url: `${moduleName.doraemon_oauth}/oauth/token`,
    method: 'post',
    urlType: 'login',
    data
  })
}

export function AccountReg(data) {
  return request({
    url: `${moduleName.doraemon_oauth}/userManage/registerUser`,
    method: 'post',
    urlType: 'login',
    params: {
      ...data
    }
  })
}
// export function Demo(data) {
//   return request({
//     url: `${moduleName.doraemon_demo}/analysis/total`,
//     method: 'get',
//     urlType: 'test',
//     data
//   })
// }
