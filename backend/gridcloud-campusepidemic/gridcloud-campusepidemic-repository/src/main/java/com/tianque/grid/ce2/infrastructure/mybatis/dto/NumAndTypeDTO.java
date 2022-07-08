package com.tianque.grid.ce2.infrastructure.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
public class NumAndTypeDTO implements Serializable {
    /**
     * 数量
     */
    private Integer numbers;
    /**
     * 类型id
     */
    private Integer typeId;
}
