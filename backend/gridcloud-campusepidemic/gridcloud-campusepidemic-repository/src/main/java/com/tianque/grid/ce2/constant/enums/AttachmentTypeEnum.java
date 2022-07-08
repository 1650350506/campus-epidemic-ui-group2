package com.tianque.grid.ce2.constant.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum AttachmentTypeEnum {
  DEMO("demo", "演示附件类型"),
  ;
  private String type;
  private String desc;
}
