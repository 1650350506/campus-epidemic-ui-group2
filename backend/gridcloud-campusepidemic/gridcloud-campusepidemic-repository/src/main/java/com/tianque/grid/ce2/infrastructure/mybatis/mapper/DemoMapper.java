package com.tianque.grid.ce2.infrastructure.mybatis.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tianque.grid.ce2.application.command.demo.DemoQueryPageCommand;
import com.tianque.grid.ce2.domain.model.demo.Demo;
import com.tianque.grid.ce2.infrastructure.server.vo.DemoVO;

import java.util.List;

public interface DemoMapper extends BaseMapper<Demo> {

    List<DemoVO> queryPage(DemoQueryPageCommand command);

}
