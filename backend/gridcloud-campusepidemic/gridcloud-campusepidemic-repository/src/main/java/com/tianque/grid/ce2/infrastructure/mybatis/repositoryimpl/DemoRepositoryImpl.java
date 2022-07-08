package com.tianque.grid.ce2.infrastructure.mybatis.repositoryimpl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tianque.grid.ce2.application.command.demo.DemoQueryPageCommand;
import com.tianque.grid.ce2.domain.model.demo.Demo;
import com.tianque.grid.ce2.domain.model.demo.DemoRepository;
import com.tianque.grid.ce2.infrastructure.mybatis.mapper.DemoMapper;
import com.tianque.grid.ce2.infrastructure.server.vo.DemoVO;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("demoRepository")
public class DemoRepositoryImpl extends ServiceImpl<DemoMapper, Demo>
    implements DemoRepository {

  @Override
  public List<DemoVO> queryPage(DemoQueryPageCommand command) {
    return getBaseMapper().queryPage(command);
  }

}
