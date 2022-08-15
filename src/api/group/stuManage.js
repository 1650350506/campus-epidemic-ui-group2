import request from '@/plugins/request'
import moduleName from '@/config/moduleName'
export function GetStuList(data) { // 获得学生全部信息
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/queryPageBase`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}
export function GetLocalStuList(data) { // 获得本市学生的基本信息
  return request({
    url: `${moduleName.doraemon_campus}/travelRecord/queryTravelRecordByKey`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}
export function DeleteStuInfo(data) { // 通过code 删除学生
  return request({
    url: `${moduleName.doraemon_campus}/riskPersonnel/delStudentByCode`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}
export function DeleteLocalStuInfo(data) { // 通过code 删除本市学生
  return request({
    url: `${moduleName.doraemon_campus}/travelRecord/delDailyByCode`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}
export function GetLocalStuInfoByCode(data) { // 本市的学生基本信息通过code获取
  return request({
    url: `${moduleName.doraemon_campus}/travelRecord/queryDailyDetailByCode`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}
