import request from '@/plugins/request'

// 删除教职工通过code
export function DeleteFacultyInfoByCode(data) {
  return request({
    url: `/workPerson/deleteByCode`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

export function BatchDeleteFacultyInfoByCodeList(data) {
  return request({
    url: `/workPerson/deleteByCodes`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

export function GetFacultyInfo(data) {
  return request({
    url: `/workPerson/queryWorkPersonList`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

export function GetFacultyInfoByCode(data) {
  return request({
    url: `/workPerson/queryWorkPersonDetailByCode`,
    method: 'get',
    urlType: 'jixian',
    params: {
      ...data
    }
  })
}

// 修改教职工信息
export function UpdateFacultyInfo(data) {
  return request({
    url: `/workPerson/updateByCode`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

// 上班打卡
export function ClockIn(data) {
  return request({
    url: `/workPerson/clockIn`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

// 下班打卡
export function ClockOut(data) {
  return request({
    url: `/workPerson/clockOut`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}

// 查询二级学院信息列表
export function GetDeptCodeAndName(data) {
  return request({
    url: `/workPerson/queryDept`,
    method: 'get',
    urlType: 'jixian'
  })
}

// 添加防控人员
export function InsertWorkPerson(data) {
  return request({
    url: `/workPerson/insert`,
    method: 'post',
    urlType: 'jixian',
    data
  })
}
