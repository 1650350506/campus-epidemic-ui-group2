package com.tianque.grid.ce2.infrastructure.plugin.impl;

import cn.hutool.core.util.StrUtil;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.tianque.grid.ddd.ui.ResponseResult;
import com.tianque.grid.ddd.ui.vo.SimpleVo;
import com.tianque.grid.usercenteradapter.infrastructure.server.dubbo.resources.OrganizationResourceDubboApi;
import com.tianque.grid.usercenteradapter.infrastructure.server.vo.OrganizationVo;
import com.tianque.grid.ce2.infrastructure.plugin.OrganizationPlugin;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.Reference;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class OrganizationPluginImpl implements OrganizationPlugin {

  @Reference(interfaceClass = OrganizationResourceDubboApi.class, check = false)
  private OrganizationResourceDubboApi organizationResourceDubboApi;

  @Override
  public OrganizationVo getOrgNotDeleteByOrgCode(String orgCode) {
    if (StrUtil.isEmpty(orgCode)) {
      return null;
    }
    ResponseResult<OrganizationVo> result = organizationResourceDubboApi
        .getOrgNotDeleteByOrgCode(orgCode);
    return result.getData();
  }

  @Override
  public String getOrgFullNameByOrgCode(String orgCode) {
    if (StrUtil.isEmpty(orgCode)) {
      return null;
    }
    ResponseResult<SimpleVo<String>> result = organizationResourceDubboApi
        .findAllParentNameByCode(orgCode);
    return result.getData().getField();
  }

  @Override
  public Map<String, String> getOrgFullNameByOrgCodeList(List<String> orgCodeList) {
    if (CollectionUtils.isEmpty(orgCodeList)) {
      return Maps.newHashMap();
    }
    ResponseResult<Map<String, String>> result = organizationResourceDubboApi
        .getOrgFullNameByOrgCodeList(orgCodeList);
    return result.getData();
  }

  @Override
  public List<OrganizationVo> getListByOrgCodes(List<String> orgCodeList) {
    if (CollectionUtils.isEmpty(orgCodeList)) {
      return Lists.newArrayList();
    }
    ResponseResult<List<OrganizationVo>> listResponseResult = organizationResourceDubboApi
        .listByOrgCodes(orgCodeList);
    return listResponseResult.getData();
  }

  @Override
  public String getParentToChildOrgName(String orgCode, String joinStr) {
    if (StringUtils.isEmpty(orgCode)) {
      return "";
    }
    ResponseResult<OrganizationVo> orgResult = organizationResourceDubboApi
        .getOrgNotDeleteByOrgCode(orgCode);
    OrganizationVo org = orgResult.getData();
    ResponseResult<List<OrganizationVo>> parentResult = null;
    List<OrganizationVo> parents = null;
    if (org == null) {
      parents = new ArrayList<>();
    } else {
      parentResult = organizationResourceDubboApi
          .findAllParentOrgNotDeleteById(org.getId());
      parents = parentResult.getData();
    }
    parents = parents.stream().sorted(Comparator.comparing(OrganizationVo::getOrgCode))
        .collect(Collectors.toList());
    if (parents == null || parents.size() == 0) {
      return "";
    }

    List<String> orgNameList = parents.stream().map(OrganizationVo::getOrgName).distinct()
        .collect(Collectors.toList());
    return StringUtils.join(orgNameList, joinStr);
  }

  @Override
  public OrganizationVo getOrgByCode(String orgCode) {
    OrganizationVo result = organizationResourceDubboApi.getOrgByCode(orgCode).getData();
    return result;
  }

  @Override
  public OrganizationVo getParentByOrgCode(String orgCode) {
    OrganizationVo org = getOrgByCode(orgCode);
    OrganizationVo parent = organizationResourceDubboApi.getOrgNotDeleteById(org.getParentId())
        .getData();
    return parent;
  }

  @Override
  public List<OrganizationVo> listAllParentById(Long orgId) {
    ResponseResult<List<OrganizationVo>> parentResult = organizationResourceDubboApi
        .findAllParentOrgNotDeleteById(orgId);
    if (!parentResult.isSuccess()) {
      return Lists.newArrayList();
    }
    return parentResult.getData();
  }
}
