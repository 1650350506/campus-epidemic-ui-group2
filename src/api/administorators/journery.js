import request from '@/plugins/request'
import moduleName from '@/config/moduleName'

export function GetJourneyInfoList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/getStudentJourneyByCode`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

export function GetOutSchoolList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/getOutSchoolByCode`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}
export function BatchDelLocalBatchDailyCodeList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/travelRecord/delBatchDailyCodes`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}
// 批量删除跨市多余信息
export function BatchDelCrossBatchDailyCodeList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/riskPersonnel/delStudentByCodeList`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}
