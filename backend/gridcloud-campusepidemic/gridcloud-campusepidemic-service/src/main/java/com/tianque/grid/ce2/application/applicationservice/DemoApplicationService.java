package com.tianque.grid.ce2.application.applicationservice;

import com.tianque.grid.core.exception.BusinessException;
import com.tianque.grid.ce2.application.command.demo.DemoCreateCommand;
import com.tianque.grid.ce2.domain.model.DemoDomainService;
import com.tianque.grid.ce2.constant.enums.DemoTypeEnum;
import com.tianque.grid.ce2.constant.enums.ErrorCode;
import com.tianque.grid.ce2.domain.model.demo.DemoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service("demoApplicationService")
public class DemoApplicationService {
  @Autowired private DemoDomainService demoDomainService;

  @Autowired private DemoRepository demoRepository;

  @Transactional(rollbackFor = Exception.class)
  public Long add(DemoCreateCommand command) {

    DemoTypeEnum type = DemoTypeEnum.valueOfCode(command.getType());
    if (Objects.isNull(type)) {
      throw new BusinessException(ErrorCode.DEMO_ERROR);
    }

    return demoDomainService.add(command);
  }

}
