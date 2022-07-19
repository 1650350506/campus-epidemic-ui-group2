import request from '@/plugins/request'
import moduleName from '@/config/moduleName'
export function GetAllIsolationTotal(data) {
  return request({
    url: `${moduleName.doraemon_campus}/analysis/total`,
    method: 'get',
    urlType: 'test',
    data
  })
}
export function GetNewIsolationTotal(data) {
  return request({
    url: `${moduleName.doraemon_campus}/orgManage/belongOrg`,
    method: 'get',
    urlType: 'test',
    data
  })
}
export function GetIsolationList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/newlyAnalysis`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
export function GetProvinceList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/supAdmin/province`,
    method: 'get',
    urlType: 'test',
    data
  })
}
export function GetCityList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/supAdmin/getCityByProvince`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
