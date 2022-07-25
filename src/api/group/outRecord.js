import request from '@/plugins/request'
import moduleName from '@/config/moduleName'
// 获得学生外出信息
export function GetOutRecordList(data) {
  return request({
    // url: `${moduleName.doraemon_campus}/student/queryPageBase`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
