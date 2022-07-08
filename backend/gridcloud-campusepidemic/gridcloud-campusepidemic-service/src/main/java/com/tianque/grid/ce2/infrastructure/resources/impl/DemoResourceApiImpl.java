package com.tianque.grid.ce2.infrastructure.resources.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tianque.grid.ce2.constant.enums.DemoTypeEnum;
import com.tianque.grid.ce2.infrastructure.plugin.OrganizationPlugin;
import com.tianque.grid.ddd.application.command.IdCommand;
import com.tianque.grid.ddd.ui.ResponseResult;
import com.tianque.grid.ddd.ui.ResponseResultFactory;
import com.tianque.grid.ddd.ui.vo.PageVO;
import com.tianque.grid.usercenteradapter.infrastructure.server.vo.OrganizationVo;
import com.tianque.grid.util.DozerUtils;
import com.tianque.grid.ce2.application.command.demo.DemoQueryByKeyCommand;
import com.tianque.grid.ce2.application.command.demo.DemoQueryPageCommand;
import com.tianque.grid.ce2.ce.infrastructure.resources.DemoResourceApi;
import com.tianque.grid.ce2.domain.model.demo.Demo;
import com.tianque.grid.ce2.domain.model.demo.DemoRepository;
import com.tianque.grid.ce2.infrastructure.server.vo.DemoDetailVO;
import com.tianque.grid.ce2.infrastructure.server.vo.DemoVO;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

import static com.tianque.grid.ce2.constant.enums.DemoTypeEnum.getNameIfAbsent;


@Service
@Api(tags = "演示查询接口")
public class DemoResourceApiImpl implements DemoResourceApi {

  @Autowired private DemoRepository demoRepository;

  @Autowired private OrganizationPlugin organizationPlugin;

  @Override
  public ResponseResult<PageVO<DemoVO>> queryPage(@Valid DemoQueryPageCommand command) {
    PageInfo<DemoVO> page = PageHelper
            .startPage(command.getPageNum(), command.getPageSize(), "create_date desc nulls last")
            .doSelectPageInfo(() -> demoRepository
                    .queryPage(command));
    return ResponseResultFactory.successResult(new PageVO<>(page, page.getList()));
  }

  @Override
  public ResponseResult<List<DemoVO>> findDemoByName(@Valid DemoQueryByKeyCommand command) {
    return null;
  }

  @Override
  public ResponseResult<DemoDetailVO> view(@Valid IdCommand command) {
    Demo demo = demoRepository.getById(command.getId());
    if (Objects.isNull(demo)) {
      return ResponseResultFactory.successResult();
    }

    DemoDetailVO demoVO = DozerUtils.convert(demo, DemoDetailVO.class);
    OrganizationVo org = organizationPlugin.getOrgByCode(demo.getOrgCode());
    demoVO.setBelongOrgName(Objects.isNull(org) ? "" : org.getOrgName());
    if (Objects.nonNull(demo.getType())) {
      demoVO.setTypeName(getNameIfAbsent(DemoTypeEnum.valueOfCode(demo.getType())));
    }
    return ResponseResultFactory.successResult(demoVO);
  }
}
