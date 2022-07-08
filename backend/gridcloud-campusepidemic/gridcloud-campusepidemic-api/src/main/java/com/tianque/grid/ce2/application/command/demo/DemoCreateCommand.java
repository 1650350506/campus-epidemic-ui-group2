package com.tianque.grid.ce2.application.command.demo;

import com.alibaba.fastjson.annotation.JSONField;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@ApiModel("Demo 新增Command")
public class DemoCreateCommand implements Serializable {

    @NotNull(message = "名称不能为空")
    @ApiModelProperty("名称")
    private String name;

    @ApiModelProperty("类型, 枚举演示")
    private Integer type;

    @JSONField(format = "yyyy-MM-dd")
    @ApiModelProperty(value = "发生时间", required = false)
    private LocalDateTime occurTime;

    @ApiModelProperty("所属组织机构")
    private String orgCode;

}
