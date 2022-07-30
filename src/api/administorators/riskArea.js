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

}

export function UpdateRiskAreaByCode(data) {
  return request({
    url: `${moduleName.doraemon_campus}/riskArea/updateRiskAreaByCode`,
    method: 'post',
    urlType: 'test',
    data
  })
}
// 批量修改风险地区
export function BatchUpdateRiskAreaByCode(data) {
  return request({
    url: `${moduleName.doraemon_campus}/riskArea/changeRiskAreaList`,
    method: 'post',
    urlType: 'test',
    data
  })
}
