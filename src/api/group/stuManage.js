import request from '@/plugins/request'
import moduleName from '@/config/moduleName'
// 获得学生全部信息
export function GetStuList(data) {
  return request({
    url: `${moduleName.doraemon_campus}/student/queryPageBase`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
// 通过code 删除学生
export function DeleteStuInfo(data) {
  return request({
    // url: `${moduleName.doraemon_campus}/student/queryPageBase`,
    method: 'post',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
