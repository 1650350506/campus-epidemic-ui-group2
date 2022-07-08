package com.tianque.grid.ce2.infrastructure.controller.impl;

import com.tianque.grid.ddd.ui.ResponseResult;
import com.tianque.grid.ddd.ui.ResponseResultFactory;
import com.tianque.grid.ddd.ui.vo.SimpleVo;
import com.tianque.grid.ce2.application.command.demo.DemoCreateCommand;
import com.tianque.grid.ce2.application.CampusEpidemicApplicationServiceRegistry;
import com.tianque.grid.ce2.infrastructure.controller.DemoControllerApi;
import com.tianque.grid.ce2.infrastructure.plugin.OrganizationPlugin;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

/**
 * @author: tanghao
 * @version:1.0
 * @Date 2020-01-06 下午4:55
 * @descripton: 基本人口管理
 * @menu: 综治采集-基本人口
 */
@Service
@Api(tags = "controller接口演示")
public class DemoControllerApiImpl implements DemoControllerApi {

  @Autowired
  private CampusEpidemicApplicationServiceRegistry campusEpidemicApplicationServiceRegistry;

  @Autowired
  private OrganizationPlugin organizationPlugin;

  @Override
  @ApiOperation(value = "登记基本人口", response = Long.class)
  public ResponseResult<SimpleVo<Long>> addDemo(
      @Valid @RequestBody DemoCreateCommand command) {

    Long id = campusEpidemicApplicationServiceRegistry.getDemoApplicationService().
            add(command);
    return ResponseResultFactory.successWrapperResult(id);
  }

}
