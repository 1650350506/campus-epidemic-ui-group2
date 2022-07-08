package com.tianque.grid.ce2.application.command.demo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@ApiModel("Demo 条件查询Command")
public class DemoQueryByKeyCommand implements Serializable {

    @NotNull(message = "关键字不能为空")
    @ApiModelProperty("关键字")
    private String key;
}
