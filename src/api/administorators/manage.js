import request from '@/plugins/request'
import moduleName from '@/config/moduleName'
// 删除教职工通过code
export function DeleteFacultyInfoByCode(data) {
  return request({
    url: `${moduleName.doraemon_campus}/workPerson/deleteByCode`,
    method: 'post',
    urlType: 'test',
    data
  })
}
export function BatchDeleteFacultyInfoByCodeList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/travelRecord/delBatchDailyCodes`,
    method: 'post',
    urlType: 'test',
    data
  })
}
export function GetFacultyInfo(data) {
  return request({
    url: `${moduleName.doraemon_campus}/workPerson/queryWorkPersonList`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}

export function GetFacultyInfoByCode(data) {
  return request({
    url: `${moduleName.doraemon_campus}/workPerson/queryWorkPersonDetailByCode`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
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

// 修改教职工信息
export function UpdateFacultyInfo(data) {
  return request({
    url: `${moduleName.doraemon_campus}/workPerson/updateByCode`,
    method: 'post',
    urlType: 'test',
    data
  })
}
