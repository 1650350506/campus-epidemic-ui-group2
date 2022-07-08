package com.tianque.grid.ce2.infrastructure.server.vo;

import com.alibaba.fastjson.annotation.JSONField;
import com.tianque.grid.ddd.ui.vo.BaseVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@ApiModel("一个演示vo")
@Data
@NoArgsConstructor
public class DemoVO extends BaseVO {

    @ApiModelProperty("名称")
    private String name;

    @ApiModelProperty(value = "类型, 字典：", example = "1")
    private Integer type;

    @ApiModelProperty("发生时间")
    @JSONField(format = "yyyy-MM-dd")
    private LocalDateTime occurTime;

}
