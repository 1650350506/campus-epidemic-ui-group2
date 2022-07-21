import request from '@/plugins/request'
import moduleName from '@/config/moduleName'

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
