import request from '@/plugins/request'
import moduleName from '@/config/moduleName'

export function DeleteFacultyInfoByCode(data) {
  return request({
    // url: `${moduleName.doraemon_campus}/supAdmin/province`,
    method: 'post',
    urlType: 'test',
    params: {
      ...data
    }
  })
}

export function GetFacultyInfo(data) {
  return request({
    // url: `${moduleName.doraemon_campus}/supAdmin/province`,
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
