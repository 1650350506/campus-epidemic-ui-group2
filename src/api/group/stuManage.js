import request from '@/plugins/request'
import moduleName from '@/config/moduleName'

// 获得学生全部信息
export function GetStuList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/queryPageBase`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

// 获得本市学生的基本信息
export function GetLocalStuList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/travelRecord/queryTravelRecordByKey`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

// 通过code 删除学生
export function DeleteStuInfo(data) {
  return request({
    url: `${moduleName.doraemon_campus}/riskPersonnel/delStudentByCode`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

// 通过code 删除本市学生
export function DeleteLocalStuInfo(data) {
  return request({
    url: `${moduleName.doraemon_campus}/travelRecord/delDailyByCode`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

// 本市的学生基本信息通过code获取
export function GetLocalStuInfoByCode(data) {
  return request({
    url: `${moduleName.doraemon_campus}/travelRecord/queryDailyDetailByCode`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}
