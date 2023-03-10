import request from '@/plugins/request'

// 获得总隔离人数
export function GetAllIsolationTotal(data) {
  return request({
    url: `/analysis/totalPerson`,
    method: 'get',
    urlType: 'jixian',
    data
  })
}

// 获得新增隔离人数
export function GetNewIsolationTotal(data) {
  return request({
    url: `/analysis/add`,
    method: 'get',
    urlType: 'jixian',
    data
  })
}

// 获得新增解除人数
export function GetRelieveIsolationTotal(data) {
  return request({
    url: `/analysis/relieve`,
    method: 'get',
    urlType: 'jixian',
    data
  })
}

// 获得过去一周或者14天新增的隔离人数（传参： 7 或者 14）
export function GetIsolationListByDate(data) {
  return request({
    url: `/analysis/newlyAnalysis`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

// 获得各个学院防疫人员分析
export function GetEachEpidemicListAnalysis(data) {
  return request({
    url: `/analysis/epidemic`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

// 获得各个学院隔离人员分析
export function GetEachIsolationListAnalysis(data) {
  return request({
    url: `/analysis/isolate`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}
