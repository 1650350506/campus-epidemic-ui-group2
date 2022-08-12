import request from '@/plugins/request'
import moduleName from '@/config/moduleName'
export function GetIsolationInfoList(data) {  // 查询全部隔离或者未隔离人员全部信息
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/findIsolateperson`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

export function GetIsolationInfoListByCode(data) { // 通过code查询全部隔离或者未隔离人员全部信息
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/findIsolaterecord`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

export function DeleteIsolationInfo(data) { // 解除隔离
  return request({
    url: `${moduleName.doraemon_campus}/riskPersonnel/delete`,
    method: 'delete',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

export function EditIsolationState(data) { // 修改隔离状态
  return request({
    url: `${moduleName.doraemon_campus}/riskPersonnel/notice`,
    method: 'put',
    urlType: 'jixian',
    params: { ...data }
  })
}

export function GetEpidemicPreventionPersonnel() { // 获取全部防疫人员姓名
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/getEpidemicPreventionPersonnel`,
    method: 'get',
    urlType: 'jixian'
  })
}

export function AddIsolationRecord(data) { // 添加隔离记录
  console.log('data', data)
  return request({
    url: `${moduleName.doraemon_campus}/riskPersonnel/addIsolaterecord`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

export function GetTreatedTotal() { // 获得卡片的数据（治疗中）
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/selectPeopleTreatedNumber`,
    method: 'get',
    urlType: 'jixian'
  })
}

export function GetToBeTotal() { // 获得卡片的数据（待隔离）
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/toBeIsolateperson`,
    method: 'get',
    urlType: 'jixian'
  })
}

export function GetQuarantinedTotal() { // 获得卡片的数据（已隔离）
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/QuarantinedIsolateperson`,
    method: 'get',
    urlType: 'jixian'
  })
}

export function GetIsolatedTotal() { // 获得卡片隔离结束数据
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/selectIsolatedPersonEndNumber`,
    method: 'get',
    urlType: 'jixian'
  })
}

export function NewIsolatePre(data) { // 新增隔离人员
  return request({
    url: `${moduleName.doraemon_campus}/riskPersonnel/addIsolatePersonnel`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

export function GetStuInfoByCode(data) { // 根据学号查询学生基本信息
  return request({
    url: `${moduleName.doraemon_campus}/areaPersonnel/findStudent`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

export function DeleteRecordById(data) { // 根据id删除一条隔离记录
  return request({
    url: `${moduleName.doraemon_campus}/riskPersonnel/deleteIsolaterecord`,
    method: 'delete',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}
