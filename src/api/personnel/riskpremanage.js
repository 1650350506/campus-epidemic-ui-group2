import request from '@/plugins/request'

// 查询全部隔离或者未隔离人员全部信息
export function GetIsolationInfoList(data) {
  return request({
    url: `/areaPersonnel/findIsolateperson`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

// 通过code查询全部隔离或者未隔离人员全部信息
export function GetIsolationInfoListByCode(data) {
  return request({
    url: `/areaPersonnel/findIsolaterecord`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

// 解除隔离
export function DeleteIsolationInfo(data) {
  return request({
    url: `/riskPersonnel/delete`,
    method: 'delete',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

// 修改隔离状态
export function EditIsolationState(data) {
  return request({
    url: `/riskPersonnel/notice`,
    method: 'put',
    urlType: 'jixian',
    params: { ...data }
  })
}

// 获取全部防疫人员姓名
export function GetEpidemicPreventionPersonnel() {
  return request({
    url: `/areaPersonnel/getEpidemicPreventionPersonnel`,
    method: 'get',
    urlType: 'jixian'
  })
}

// 添加隔离记录
export function AddIsolationRecord(data) {
  console.log('data', data)
  return request({
    url: `/riskPersonnel/addIsolaterecord`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

// 获得卡片的数据（治疗中）
export function GetTreatedTotal() {
  return request({
    url: `/areaPersonnel/selectPeopleTreatedNumber`,
    method: 'get',
    urlType: 'jixian'
  })
}

// 获得卡片的数据（待隔离）
export function GetToBeTotal() {
  return request({
    url: `/areaPersonnel/toBeIsolateperson`,
    method: 'get',
    urlType: 'jixian'
  })
}

// 获得卡片的数据（已隔离）
export function GetQuarantinedTotal() {
  return request({
    url: `/areaPersonnel/QuarantinedIsolateperson`,
    method: 'get',
    urlType: 'jixian'
  })
}

// 获得卡片隔离结束数据
export function GetIsolatedTotal() {
  return request({
    url: `/areaPersonnel/selectIsolatedPersonEndNumber`,
    method: 'get',
    urlType: 'jixian'
  })
}

// 新增隔离人员
export function NewIsolatePre(data) {
  return request({
    url: `/riskPersonnel/addIsolatePersonnel`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

// 根据学号查询学生基本信息
export function GetStuInfoByCode(data) {
  return request({
    url: `/areaPersonnel/findStudent`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

// 根据id删除一条隔离记录
export function DeleteRecordById(data) {
  return request({
    url: `/riskPersonnel/deleteIsolaterecord`,
    method: 'delete',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}
