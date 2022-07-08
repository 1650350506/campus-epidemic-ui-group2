package com.tianque.grid.ce2.application;

import com.tianque.grid.ce2.application.applicationservice.*;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Getter
@Component
public class CampusEpidemicApplicationServiceRegistry {

  @Autowired
  DemoApplicationService demoApplicationService;

}
