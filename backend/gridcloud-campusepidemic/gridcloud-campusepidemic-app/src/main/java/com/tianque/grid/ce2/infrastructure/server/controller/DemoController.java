package com.tianque.grid.ce2.infrastructure.server.controller;

import com.tianque.grid.ddd.ui.ResponseResult;
import com.tianque.grid.ddd.ui.vo.SimpleVo;
import com.tianque.grid.ce2.application.command.demo.DemoCreateCommand;
import com.tianque.grid.ce2.infrastructure.controller.DemoControllerApi;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RequestMapping("/demo")
@RestController
@Api(tags = "web-演示controller")
public class DemoController {

  @Autowired
  private DemoControllerApi demoInfoControllerApi;

  @RequestMapping(value = "/add", method = RequestMethod.POST)
  @ApiOperation(value = "演示一个新增接口", response = Long.class)
  public ResponseResult<SimpleVo<Long>> register(@Valid @RequestBody DemoCreateCommand command) {
    return demoInfoControllerApi.addDemo(command);
  }

}
