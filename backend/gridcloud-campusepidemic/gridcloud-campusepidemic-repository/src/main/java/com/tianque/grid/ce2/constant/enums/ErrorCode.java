package com.tianque.grid.ce2.constant.enums;

import com.tianque.grid.core.exception.Error;
import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum ErrorCode implements Error {
  DEMO_ERROR("campusepidemic.error.demo")
  ;

  private String error;

  @Override
  public String getName() {
    return getError();
  }
}
