import request from '@/plugins/request'
import moduleName from '@/config/moduleName'
// 获取风险人数列表
export function GetRiskPreInfoList(data) {
  return request({
    // url: `${moduleName.doraemon_campus}/student/queryPageBase`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}
