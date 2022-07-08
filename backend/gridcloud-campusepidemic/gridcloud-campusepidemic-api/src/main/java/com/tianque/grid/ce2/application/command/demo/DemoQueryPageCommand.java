package com.tianque.grid.ce2.application.command.demo;

import com.tianque.grid.ddd.application.command.GridPageCommand;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;


@Data
@ApiModel("Demo 搜索并分页Command")
public class DemoQueryPageCommand extends GridPageCommand implements Serializable {

  @ApiModelProperty(value = "所属行政区域", required = true)
  @NotNull(message = "所属行政区域不能为空")
  private String belongOrgCode;

  @ApiModelProperty("关键字查询")
  private String keyword;

  @ApiModelProperty("类型")
  private Integer type;

}
