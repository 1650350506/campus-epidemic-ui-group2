package com.tianque.grid.ce2.domain.model.demo;

import com.baomidou.mybatisplus.annotation.TableName;
import com.tianque.grid.ddd.domain.model.MysqlGridDomain;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@TableName("DEMO")
@ApiModel("演示对象")
public class Demo extends MysqlGridDomain {

  @ApiModelProperty("类型")
  private String name;

  @ApiModelProperty("类型")
  private Integer type;

  @ApiModelProperty("发生时间")
  private LocalDateTime occurTime;

  @ApiModelProperty("所属组织机构")
  private String orgCode;
}
