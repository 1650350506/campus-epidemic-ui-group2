export const JavaTypeArray = ['String', 'Long', 'Integer', 'Double', 'Float', 'Boolean', 'Character', 'Short', 'Byte', 'Date', 'Object']

export const FlagEnum = {
  NO: 0,
  YES: 1,
  properties: {
    0: { name: '否', value: 0, color: 'red' },
    1: { name: '是', value: 1, color: 'green' }
  }
}
// 模板类型，0:增删改查，1:仅持久层2:左树右表
export const TemplateTypeEnum = {
  CURD: 0,
  PERSISTENCE_ONLY: 1,
  LEFT_TREE_RIGHT_TABLE: 2,
  properties: {
    0: { name: '增删改查', value: 0, color: 'green' },
    1: { name: '仅持久层', value: 1, color: 'red' },
    2: { name: '左树右表', value: 2, color: 'yellow' }
  }
}

export const MatchingModeEnum = {
  RightLike: 0,
  Like: 1,
  LeftLike: 2,
  Between: 3,
  '=': 4,
  '!=': 5,
  '=>': 6,
  '=<': 7,
  '>': 8,
  '<': 9,
  properties: {
    0: { name: 'RightLike', value: 0 },
    1: { name: 'Like', value: 1 },
    2: { name: 'LeftLike', value: 2 },
    3: { name: 'Between', value: 3 },
    4: { name: '=', value: 4 },
    5: { name: '!=', value: 5 },
    6: { name: '>=', value: 6 },
    7: { name: '<=', value: 7 },
    8: { name: '>', value: 8 },
    9: { name: '<', value: 9 }
  }
}

export const FormTypeEnum = {
  单行文本: 0,
  多行文本: 1,
  下拉: 2,
  开关: 3,
  单选: 4,
  多选: 5,
  日期: 6,
  文件上传: 7,
  properties: {
    0: { name: '单行文本', value: 0 },
    1: { name: '多行文本', value: 1 },
    2: { name: '下拉', value: 2 },
    3: { name: '开关', value: 3 },
    4: { name: '单选', value: 4 },
    5: { name: '多选', value: 5 },
    6: { name: '日期', value: 6 },
    7: { name: '文件上传', value: 7 }
  }
}

export const ValidationTypeEnum = {
  唯一校验: 0,
  手机: 1,
  邮箱: 2,
  字符串: 3,
  数字: 4,
  整数: 5,
  数组: 6,
  身份证号: 7,
  URL: 8,
  properties: {
    0: { name: '唯一校验', value: 0 },
    1: { name: '手机', value: 1 },
    2: { name: '邮箱', value: 2 },
    3: { name: '字符串', value: 3 },
    4: { name: '数字', value: 4 },
    5: { name: '整数', value: 5 },
    6: { name: '数组', value: 6 },
    7: { name: '身份证号', value: 7 },
    8: { name: 'URL', value: 8 }
  }
}

export const toolTip = (h, lines, content) => {
  return h('Tooltip', {
    props: {
      placement: 'bottom-start',
      transfer: true
    }
  }, [
    h('span', {
      // 样式
      style: {
        display: '-webkit-box',
        webkitBoxOrient: 'vertical',
        webkitLineClamp: `${lines}`,
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        overflow: 'hidden'
      }
    }, content),
    h('span', {
      slot: 'content',
      style: {
        whiteSpace: 'normal',
        wordBreak: 'break-all'
      }
    }, content)
  ])
}
