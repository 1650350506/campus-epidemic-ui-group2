import request from '@/plugins/request'
import moduleName from '@/config/moduleName'
export function GetAllIsolationTotal(data) {
  // 获得总隔离人数
  return request({
    url: `${moduleName.doraemon_campus}/analysis/totalPerson`,
    method: 'get',
    urlType: 'test',
    data
  })
}
// 获得新增隔离人数
export function GetNewIsolationTotal(data) {
  return request({
    url: `${moduleName.doraemon_campus}/analysis/add`,
    method: 'get',
    urlType: 'test',
    data
  })
}
// 获得新增解除人数
export function GetRelieveIsolationTotal(data) {
  return request({
    url: `${moduleName.doraemon_campus}/analysis/relieve`,
    method: 'get',
    urlType: 'test',
    data
  })
}
// 获得各学院防疫人员分布
export function GetEachCollegeTotal(data) {
  return request({
    url: `${moduleName.doraemon_campus}/analysis/relieve`,
    method: 'get',
    urlType: 'test',
    data
  })
}
// 获得过去一周或者14天新增的隔离人数（传参： 7 或者 14）
export function GetIsolationListByDate(data) {
  return request({
    url: `${moduleName.doraemon_campus}/analysis/newlyAnalysis`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
// 获得各个学院防疫人员分析/analysis/epidemic
export function GetEachEpidemicListAnalysis(data) {
  return request({
    url: `${moduleName.doraemon_campus}/analysis/epidemic`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
// 获得各个学院隔离人员分析/analysis/epidemic
export function GetEachIsolationListAnalysis(data) {
  return request({
    url: `${moduleName.doraemon_campus}/analysis/isolate`,
    method: 'get',
    urlType: 'test',
    params: {
      ...data
    }
  })
}
