package com.tianque.grid.ce2.domain.model;

import com.tianque.grid.util.DozerUtils;
import com.tianque.grid.ce2.application.command.demo.DemoCreateCommand;
import com.tianque.grid.ce2.domain.model.demo.Demo;
import com.tianque.grid.ce2.domain.model.demo.DemoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("demoDomainService")
public class DemoDomainService {

  @Autowired
  private DemoRepository demoRepository;

  public Long add(DemoCreateCommand command) {
    Demo demo = DozerUtils.convert(command, Demo.class);
    demoRepository.save(demo);
    return demo.getId();
  }

}
