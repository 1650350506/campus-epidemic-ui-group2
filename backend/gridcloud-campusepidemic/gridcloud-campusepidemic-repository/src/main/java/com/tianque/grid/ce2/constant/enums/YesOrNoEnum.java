package com.tianque.grid.ce2.constant.enums;

import com.tianque.grid.business.constant.BaseEnums;
import com.tianque.grid.business.infrastructure.docapi.annotations.EnumKey;
import lombok.Getter;


@EnumKey(name = "是或否", desc = "系统中是或否相关类型公用枚举类")
@Getter
public enum YesOrNoEnum implements BaseEnums {
  NO(0, "N", false, "否"),

  YES(1, "Y", true, "是");

  private Integer code;
  private String value;
  private Boolean flag;
  private String hz;

  YesOrNoEnum(Integer code, String value, Boolean flag, String hz) {
    this.code = code;
    this.value = value;
    this.flag = flag;
    this.hz = hz;
  }

  public static String getHzByFlag(Boolean flag) {
    if (flag == null) {
      return null;
    }
    for (YesOrNoEnum yesOrNoEnum : YesOrNoEnum.values()) {
      if (yesOrNoEnum.flag.equals(flag)) {
        return yesOrNoEnum.hz;
      }
    }
    return null;
  }

  public static Integer getCodeByFlag(Boolean flag) {
    if (flag == null) {
      return null;
    }
    for (YesOrNoEnum yesOrNoEnum : YesOrNoEnum.values()) {
      if (yesOrNoEnum.flag.equals(flag)) {
        return yesOrNoEnum.code;
      }
    }
    return null;
  }

  public static Integer getCodeByHz(String hz) {
    if (hz == null) {
      return null;
    }
    for (YesOrNoEnum yesOrNoEnum : YesOrNoEnum.values()) {
      if (yesOrNoEnum.hz.equals(hz)) {
        return yesOrNoEnum.code;
      }
    }
    return null;
  }

  public static Boolean getFlagByHz(String hz) {
    if (hz == null) {
      return null;
    }
    for (YesOrNoEnum yesOrNoEnum : YesOrNoEnum.values()) {
      if (yesOrNoEnum.hz.equals(hz)) {
        return yesOrNoEnum.flag;
      }
    }
    return null;
  }

  public static String getHzByCode(Integer code) {
    if (code == null) {
      return null;
    }
    for (YesOrNoEnum yesOrNoEnum : YesOrNoEnum.values()) {
      if (yesOrNoEnum.code.equals(code)) {
        return yesOrNoEnum.hz;
      }
    }
    return null;
  }

  public Integer getCode() {
    return code;
  }

  public String getValue() {
    return value;
  }

  public Boolean getFlag() {
    return flag;
  }

  public String getHz() {
    return hz;
  }

  @Override
  public Integer getNumber() {
    return getCode();
  }

  @Override
  public String getName() {
    return getHz();
  }

  @Override
  public String getSimplePinYin() {
    return getFlag() ? "Y" : "N";
  }

  @Override
  public String getFullPinYin() {
    return getFlag() ? "YES" : "NO";
  }
}
