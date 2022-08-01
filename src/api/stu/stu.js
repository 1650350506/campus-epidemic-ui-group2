import request from '@/plugins/request'
import moduleName from '@/config/moduleName'
export function CheckStudent(data) {
  // 查询全部隔离或者未隔离人员全部信息
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/checkStudent`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

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