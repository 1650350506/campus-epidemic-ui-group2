package com.tianque.grid.ce2.constant.enums;

import cn.hutool.core.util.PinyinUtil;
import com.tianque.grid.business.constant.BaseEnums;
import com.tianque.grid.business.infrastructure.docapi.annotations.EnumKey;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;

@Getter
@AllArgsConstructor
@EnumKey(name = "枚举演示", desc = "枚举演示")
public enum DemoTypeEnum implements BaseEnums {
  LOW(1, "低"),
  NORMAL(2, "中"),
  HIGH(3, "高"),
  ;
  private Integer code;

  private String desc;

  @Override
  public Integer getNumber() {
    return getCode();
  }

  @Override
  public String getName() {
    return getDesc();
  }

  @Override
  public String getSimplePinYin() {
    return PinyinUtil.getAllFirstLetter(getDesc());
  }

  @Override
  public String getFullPinYin() {
    return PinyinUtil.getPinYin(getDesc());
  }

  public static DemoTypeEnum valueOfCode(Integer code ){
    if (Objects.isNull(code)) {
      return null;
    }
    for (DemoTypeEnum item : values()) {
      if (item.code.equals(code)) {
        return item;
      }
    }
    return null;
  }

  public static String getNameIfAbsent(DemoTypeEnum e) {
    return Objects.nonNull(e)?e.getDesc() : null;
  }
}
