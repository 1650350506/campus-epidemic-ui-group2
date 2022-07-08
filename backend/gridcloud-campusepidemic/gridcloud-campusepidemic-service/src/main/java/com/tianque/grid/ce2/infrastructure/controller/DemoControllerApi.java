package com.tianque.grid.ce2.infrastructure.controller;

import com.tianque.grid.ddd.ui.ResponseResult;
import com.tianque.grid.ddd.ui.vo.SimpleVo;
import com.tianque.grid.ce2.application.command.demo.DemoCreateCommand;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;


@Api(tags = "controller接口演示")
public interface DemoControllerApi {

  @ApiOperation(value = "controller接口演示", response = Long.class)
  public ResponseResult<SimpleVo<Long>> addDemo(
          @Valid @RequestBody DemoCreateCommand command);

}
