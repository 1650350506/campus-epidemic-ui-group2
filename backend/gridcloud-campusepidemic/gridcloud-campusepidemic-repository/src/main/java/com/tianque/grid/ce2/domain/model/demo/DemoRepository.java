package com.tianque.grid.ce2.domain.model.demo;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tianque.grid.ce2.application.command.demo.DemoQueryPageCommand;
import com.tianque.grid.ce2.infrastructure.server.vo.DemoVO;

import java.util.List;


public interface DemoRepository extends IService<Demo> {

  List<DemoVO> queryPage(DemoQueryPageCommand command);

}
