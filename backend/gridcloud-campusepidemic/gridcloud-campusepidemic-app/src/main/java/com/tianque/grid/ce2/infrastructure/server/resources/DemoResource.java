package com.tianque.grid.ce2.infrastructure.server.resources;

import com.tianque.grid.ddd.application.command.IdCommand;
import com.tianque.grid.ddd.ui.ResponseResult;
import com.tianque.grid.ddd.ui.vo.PageVO;
import com.tianque.grid.ce2.application.command.demo.DemoQueryByKeyCommand;
import com.tianque.grid.ce2.application.command.demo.DemoQueryPageCommand;
import com.tianque.grid.ce2.ce.infrastructure.resources.DemoResourceApi;
import com.tianque.grid.ce2.infrastructure.server.vo.DemoDetailVO;
import com.tianque.grid.ce2.infrastructure.server.vo.DemoVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;


@RequestMapping("/demo")
@RestController
@Api(tags = "WEB-查询接口演示")
public class DemoResource {

  @Autowired
  private DemoResourceApi demoResourceApi;

  @RequestMapping(value = "/queryPage", method = RequestMethod.GET)
  @ApiOperation(value = "分页查询")
  public ResponseResult<PageVO<DemoVO>> queryPage(@Valid DemoQueryPageCommand command) {
    return demoResourceApi.queryPage(command);
  }

  @GetMapping("/findSimpleList")
  @ApiOperation(value = "查询返回列表", response = DemoVO.class)
  public ResponseResult<List<DemoVO>> findByKeyword(
      @Valid DemoQueryByKeyCommand command) {
    return demoResourceApi.findDemoByName(command);
  }

  @GetMapping("/view")
  @ApiOperation(value = "查询返回对象", response = DemoVO.class)
  public ResponseResult<DemoDetailVO> view(
      @Valid IdCommand command) {
    return demoResourceApi.view(command);
  }

}
