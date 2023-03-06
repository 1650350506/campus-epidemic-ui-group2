import request from '@/plugins/request'

export function GetJourneyInfoList(data) {
  return request({
    url: `/areaPersonnel/getStudentJourneyByCode`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

export function GetOutSchoolList(data) {
  return request({
    url: `/areaPersonnel/getOutSchoolByCode`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

export function BatchDelLocalBatchDailyCodeList(data) {
  return request({
    url: `/travelRecord/delBatchDailyCodes`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

// 批量删除跨市多余信息
export function BatchDelCrossBatchDailyCodeList(data) {
  return request({
    url: `/riskPersonnel/delStudentByCodeList`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}
