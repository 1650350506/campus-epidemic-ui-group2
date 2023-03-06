import request from '@/plugins/request'

export function SubStuRecord(data) {
  return request({
    url: `/riskPersonnel/addStudentCrossCity`,
    method: 'post',
    urlType: 'jixian',
    meta: {
      isSerialize: false
    },
    data
  })
}

// 回校
export function SubStuBack(data) {
  return request({
    url: `/travelRecord/returnSchoolSubmit`,
    method: 'post',
    urlType: 'jixian',
    meta: {
      isSerialize: false
    },
    data
  })
}

// 出校
export function SubStuLeave(data) {
  return request({
    url: `/travelRecord/leaveSchoolSubmit`,
    method: 'post',
    urlType: 'jixian',
    meta: {
      isSerialize: false
    },
    data
  })
}
