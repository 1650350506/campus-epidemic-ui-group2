package com.tianque.grid.ce2.infrastructure.plugin;


import com.tianque.grid.usercenteradapter.infrastructure.server.vo.OrganizationVo;

import java.util.List;
import java.util.Map;


public interface OrganizationPlugin {

  /**
   * @param orgCode
   * @return com.tianque.grid.usercenteradapter.infrastructure.server.vo.OrganizationVo
   * @Author roy
   * @Description 根据组织机构code查询组织机构
   * @Date 2021/6/7 5:49 PM
   **/
  OrganizationVo getOrgNotDeleteByOrgCode(String orgCode);

  /**
   * @param orgCode
   * @return java.lang.String
   * @Author roy
   * @Description 根据orgCode获取组织机构全名
   * @Date 2021/6/7 5:49 PM
   **/
  String getOrgFullNameByOrgCode(String orgCode);


  /**
   * @param orgCodeList
   * @return java.util.Map<java.lang.String, java.lang.String>
   * @Author roy
   * @Description 根据组织机构列表获取组织机构名
   * @Date 2021/6/7 5:49 PM
   **/
  Map<String, String> getOrgFullNameByOrgCodeList(List<String> orgCodeList);

  /**
   * @return java.util.List<com.tianque.grid.usercenteradapter.infrastructure.server.vo.OrganizationVo>
   * @Author fzy
   * @Description 批量查询组织机构
   * @Date 2:01 下午 2021/11/5
   * @Param [orgCodeList]
   **/
  List<OrganizationVo> getListByOrgCodes(List<String> orgCodeList);


  String getParentToChildOrgName(String orgCode, String joinStr);

  /**
   * @return com.tianque.grid.usercenteradapter.infrastructure.server.vo.OrganizationVo
   * @Author fzy
   * @Description 通过当前层级orgCode获得组织机构
   * @Date 8:57 上午 2021/10/20
   * @Param [orgCode]
   **/
  OrganizationVo getOrgByCode(String orgCode);

  /**
   * @return com.tianque.grid.usercenteradapter.infrastructure.server.vo.OrganizationVo
   * @Author fzy
   * @Description 通过当前层级orgCode获取上层组织机构
   * @Date 8:57 上午 2021/10/20
   * @Param [orgCode]
   **/
  OrganizationVo getParentByOrgCode(String orgCode);

  /**
   * @param orgId
   * @return java.util.List<com.tianque.grid.usercenteradapter.infrastructure.server.vo.OrganizationVo>
   * @Author roy
   * @Description 获取所有的父级
   * @Date 2022/4/2 10:16 AM
   **/
  List<OrganizationVo> listAllParentById(Long orgId);
}
