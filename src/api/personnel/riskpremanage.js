import request from '@/plugins/request'
import moduleName from '@/config/moduleName'
export function GetIsolationInfoList(data) {
  // 查询全部隔离或者未隔离人员全部信息
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/findIsolateperson`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
// 通过code查询全部隔离或者未隔离人员全部信息
export function GetIsolationInfoListByCode(data) {
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/findIsolaterecord`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}

export function DeleteIsolationInfo(data) {
  return request({
    url: `${moduleName.doraemon_campus}/riskPersonnel/delete`,
    method: 'delete',
    urlType: 'test',
    params: {
      ...data
    }
  })
}

// 修改隔离状态

export function EditIsolationState(data) {
  return request({
    url: `${moduleName.doraemon_campus}/riskPersonnel/notice`,
    method: 'post',
    urlType: 'test',
    params: data
  })
}

// 获取全部防疫人员姓名
export function GetEpidemicPreventionPersonnel() {
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/getEpidemicPreventionPersonnel`,
    method: 'get',
    urlType: 'test'
  })
}
