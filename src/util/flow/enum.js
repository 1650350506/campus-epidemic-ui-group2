export const JavaTypeArray = ['String', 'Long', 'Integer', 'Double', 'Float', 'Boolean', 'Character', 'Short', 'Byte', 'Date', 'Object']

export const ModelTypeEnum = {
  BPMN: 0,
  FORM: 2,
  APP: 3,
  DECISION_TABLE: 4,
  CMMN: 5,
  properties: {
    0: { name: 'BPMN', value: 0 },
    2: { name: 'FORM', value: 2 },
    3: { name: 'APP', value: 3 },
    4: { name: 'DECISION_TABLE', value: 4 },
    5: { name: 'CMMN', value: 5 }
  }
}

// FlowModeEnum
// /**
//  * 通用流程
//  */
// COMMON("common", 1),
//
//   /**
//    * 定制流程
//    */
//   CUSTOM("custom", 2),

export const FlowStateEnum = {
  ACTIVE: 1,
  SUSPEND: 2,
  properties: {
    0: { name: '激活', value: 0, color: 'green' },
    1: { name: '激活', value: 1, color: 'blue' },
    2: { name: '挂起', value: 2, color: 'red' }
  }
}
