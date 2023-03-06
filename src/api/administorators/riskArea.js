import request from '@/plugins/request'

export function GetProvinceList(data) {
  return request({
    url: `/areaRisk/province`,
    method: 'get',
    urlType: 'jixian',
    data
  })
}

export function GetCityList(data) {
  return request({
    url: `/areaRisk/getCityByProvince`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

// 获取区县
export function GetCountyList(data) {
  return request({
    url: `/areaRisk/queryCommunityByStreetPage`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

// 获取街道
export function GetStreetList(data) {
  return request({
    url: `/areaRisk/queryTownByCounty`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

export function UpdateRiskAreaByCode(data) {
  return request({
    url: `/riskArea/updateRiskAreaByCode`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

// 批量修改风险地区
export function BatchUpdateRiskAreaByCode(data) {
  return request({
    url: `/riskArea/changeRiskAreaList`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

// 下拉框省级别查询
export function GetRiskInfoListByProvince(data) {
  return request({
    url: `/areaRisk/RederByProvince`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

export function GetRiskInfoListByTown(data) {
  return request({
    url: `/areaRisk/queryVillageByTown`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}
