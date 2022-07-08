package com.tianque.grid.ce2.ce.infrastructure.resources;

import com.tianque.grid.ddd.application.command.IdCommand;
import com.tianque.grid.ddd.ui.ResponseResult;
import com.tianque.grid.ddd.ui.vo.PageVO;
import com.tianque.grid.ce2.application.command.demo.DemoQueryByKeyCommand;
import com.tianque.grid.ce2.application.command.demo.DemoQueryPageCommand;
import com.tianque.grid.ce2.infrastructure.server.vo.DemoDetailVO;
import com.tianque.grid.ce2.infrastructure.server.vo.DemoVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.validation.Valid;
import java.util.List;

/**
 * @author ：yangruixin
 * @description：
 * @date ：2020/1/10 10:41
 * @version: 1.0
 * @menu: WEB-综治采集-吸毒人员
 */
@Api(tags = "演示resource接口")
public interface DemoResourceApi {
  @ApiOperation(value = "演示查询接口")
  public ResponseResult<PageVO<DemoVO>> queryPage(@Valid DemoQueryPageCommand command);

  @ApiOperation("演示查询接口")
  public ResponseResult<List<DemoVO>> findDemoByName(@Valid DemoQueryByKeyCommand command);

  @ApiOperation("演示查询接口")
  public ResponseResult<DemoDetailVO> view(@Valid IdCommand command);
}
