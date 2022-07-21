import request from '@/plugins/request'
import moduleName from '@/config/moduleName'
export function GetStuList(data) {
  // 获得总隔离人数
  return request({
    url: `${moduleName.doraemon_campus}/student/queryPageBase`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
