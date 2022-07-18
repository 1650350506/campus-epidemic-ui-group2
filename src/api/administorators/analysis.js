import request from '@/plugins/request'
import moduleName from '@/config/moduleName'
export function GetAllIsolationTotal(data) {
  return request({
    url: `${moduleName.doraemon_campus}/analysis/total`,
    method: 'get',
    urlType: 'test',
    data
  })
}
