import request from '@/plugins/request'
import moduleName from '@/config/moduleName'
export function GetIsolationInfoList(data) {
  // 查询全部隔离或者未隔离人员全部信息
  return request({
    url: `${moduleName.doraemon_campus}/Isolate/findIsolateperson`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}

export function DeleteIsolationInfo(data) {
  return request({
    url: `${moduleName.doraemon_campus}/Isolate/delete`,
    method: 'delete',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
