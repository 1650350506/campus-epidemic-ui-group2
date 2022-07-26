import request from '@/plugins/request'
import moduleName from '@/config/moduleName'

export function GetProvinceList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/areaRisk/province`,
    method: 'get',
    urlType: 'test',
    data
  })
}
export function GetCityList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/areaRisk/getCityByProvince`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
// 获取区县
export function GetCountyList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/areaRisk/queryCommunityByStreetPage`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
// 获取街道
export function GetStreetList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/areaRisk/queryTownByCounty`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
