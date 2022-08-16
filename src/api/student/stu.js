import request from '@/plugins/request'
import moduleName from '@/config/moduleName'

export function SubStuRecord(data) {
  return request({
    url: `${moduleName.doraemon_campus}/riskPersonnel/addStudentCrossCity`,
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
    url: `${moduleName.doraemon_campus}/travelRecord/returnSchoolSubmit`,
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
    url: `${moduleName.doraemon_campus}/travelRecord/leaveSchoolSubmit`,
    method: 'post',
    urlType: 'jixian',
    meta: {
      isSerialize: false
    },
    data
  })
}
