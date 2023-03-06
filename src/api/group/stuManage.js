import request from '@/plugins/request'

// 获得学生全部信息
export function GetStuList(data) {
  return request({
    url: `/areaPersonnel/queryPageBase`,
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
    url: `/travelRecord/queryTravelRecordByKey`,
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
    url: `/riskPersonnel/delStudentByCode`,
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
    url: `/travelRecord/delDailyByCode`,
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
    url: `/travelRecord/queryDailyDetailByCode`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}
