import request from '@/plugins/request'
import moduleName from '@/config/moduleName'

export function GetJourneyInfoList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/getStudentJourneyByCode`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}

export function GetOutSchoolList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/getOutSchoolByCode`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
export function BatchDelBatchDailyCodeList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/travelRecord/delBatchDailyCodes`,
    method: 'post',
    urlType: 'test',
    data
  })
}
