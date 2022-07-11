module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // 禁止 for 循环出现方向错误的循环
    'for-direction': 'error',
    // 禁止循环中的await
    // @off 业务需要
    'no-await-in-loop': 'off',
    // 禁止与-0比较 0 === -0,Object.is(0, -0)
    'no-compare-neg-zero': 'error',
    // 禁止条件语句中的赋值，除非赋值被圆括号包起来
    'no-cond-assign': [
      'error',
      'except-parens',
    ],
    // 禁用console
    // @warn
    'no-console': 'off',
    // 禁止在条件语句中使用常量表达式
    'no-constant-condition': [
      'error',
      { checkLoops: false },
    ],
    // 禁止正则中出现控制字符
    'no-control-regex': 'error',
    // 禁用debugger
    // @fix
    'no-debugger': 'error',
    // 禁止函数中的重复参数
    'no-dupe-args': 'error',
    // 禁止Object中出现重复的key
    'no-dupe-keys': 'error',
    // 禁止重复的case
    'no-duplicate-case': 'error',
    // 禁止空block
    // @warn 空catch
    'no-empty': 'warn',
    // 精致修改catch入参
    'no-ex-assign': 'error',
    // 禁止不不要的布尔值转换
    // @fix
    'no-extra-boolean-cast': 'error',
    // 禁止多余括号
    // @fix
    'no-extra-parens': [
      'error',
      'functions',
    ],
    // 禁止多余分号
    // @fix
    'no-extra-semi': 'error',
    // 禁止对函数声明重新赋值
    'no-func-assign': 'error',
    // 禁止块作用域变量提升
    'no-inner-declarations': [
      'error',
      'both',
    ],
    // 禁止非法正则表达式
    'no-invalid-regexp': 'error',
    // 禁止多余空格
    'no-irregular-whitespace': [
      'error', {
        skipStrings: true,
        skipComments: true,
        skipRegExps: true,
        skipTemplates: true,
      },
    ],
    // 禁止错误对象调用
    'no-obj-calls': 'error',
    // 禁止正则中多个连续空格
    // @fix
    'no-regex-spaces': 'error',
    // 禁止数组中连续逗号
    'no-sparse-arrays': 'error',
    // 禁止非字符串模板中的插值占位符
    // off 业务需要
    'no-template-curly-in-string': 'off',
    // 在需要分号时加入分号
    /*
      该语句有一个没有闭合的括号，数组字面量或对象字面量或其他某种方式，不是有效结束一个语句的方式。（比如，以 . 或 , 结尾）
      该行是 -- 或 ++（在这种情况下它将减量/增量的下一个标记）
      它是个 for()、while()、do、if() 或 else，并且没有 {
      下一行以 [、(、+、*、/、-、,、. 或一些其它在单个表达式中两个标记之间的二元操作符。
    */
    'no-unexpected-multiline': 'error',
    // 禁止出现不可达代码
    'no-unreachable': 'error',
    // 禁止finally中出现流程控制
    'no-unsafe-finally': 'error',
    // 禁止遍历迭代器时直接使用取反操作符
    'no-unsafe-negation': 'error',
    'use-isnan': 'error',
    // 禁止typeof与无效字符串比较
    'valid-typeof': 'error',

    // getter必须有setter,setter可以没有getter
    'accessor-pairs': [
      'error',
      {
        setWithoutGet: true,
        getWithoutSet: false,
      },
    ],
    // 数组方法需要返回值
    'array-callback-return': 'error',
    // 强制var在块作用域范围内被使用
    'block-scoped-var': 'error',
    // 禁止函数环境复杂度超过10
    'complexity': [
      'error',
      { max: 20 },
    ],
    // 函数在不同分支必须返回相同类型的值
    // @off
    'consistent-return': 'off',
    // 能写{}则{}不能省略
    'curly': 'error',
    // switch 必须有 default
    // @off 无收益
    'default-case': 'off',
    // 强制点号在新的一行
    // @fix
    'dot-location': [
      'error',
      'property',
    ],
    // 尽可能使用点号访问对象属性
    // @off 灵活性太差
    'dot-notation': 'off',
    // 强制 ===
    'eqeqeq': [
      'error',
      'always',
    ],
    // for in 中必须判断是否是原型链属性
    'guard-for-in': 'error',
    // 禁用 alert confirm prompt
    // @off 业务需要
    'no-alert': 'off',
    // switch中禁止直接的变量或函数申明，如需声明，用大括号包裹
    'no-case-declarations': 'error',
    // 禁止空函数
    'no-empty-function': [
      'error',
      {
        allow: [
          'methods',
          'constructors'
        ],
      },
    ],
    // 禁止空解构
    'no-empty-pattern': 'error',
    // 禁止不检测类型与null比较
    'no-eq-null': 'error',
    // 禁用eval
    'no-eval': 'error',
    // 禁止不必要的bind
    // @fix
    'no-extra-bind': 'error',
    // 禁止不必要的标签
    // @fix
    'no-extra-label': 'error',
    // case不需要有break，return或throw
    'no-fallthrough': 'error',
    // 禁止覆盖原生全局对象
    'no-global-assign': 'error',
    // 禁止全局变量或函数申明
    'no-implicit-globals': 'error',
    // 禁止在类或对象方法之外使用this
    // @off 动态绑定的情况不能满足
    'no-invalid-this': 'off',
    // 禁止直接使用意义不明确的数字
    'no-magic-numbers': 'off',
    // 禁止连续空格
    // @fix
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: true,
        exceptions: {
          Property: true,
          BinaryExpression: false,
          VariableDeclarator: true,
          ImportDeclaration: true,
        },
      },
    ],
    // 禁止使用\创建多行字符串
    'no-multi-str': 'error',
    // 禁止空实例
    'no-new': 'error',
    // 禁止new Function
    'no-new-func': 'error',
    // 禁止使用原始类型的构造函数
    'no-new-wrappers': 'error',
    // 禁止八进制字面量
    'no-octal': 'error',
    'no-octal-escape': 'error',
    // 禁止对函数参数重新赋值
    'no-param-reassign': 'error',
    // 禁止重新声明变量
    'no-redeclare': 'error',
    // 禁止在return中进行赋值操作
    'no-return-assign': 'error',
    // 禁止自我比较
    'no-self-compare': 'error',
    // 禁止使用逗号操作符，除初始化for
    'no-sequences': 'error',
    // throw必须抛出一个Error对象实例
    'no-throw-literal': 'error',
    // 不允许非变变量作为循环条件
    'no-unmodified-loop-condition': 'error',
    // 禁用无用表达式
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    // 禁用未使用过的label
    // @fix
    'no-unused-labels': 'error',
    // 禁用不必要的call和apply
    'no-useless-call': 'error',
    // 禁用不必要的字符串连接
    'no-useless-concat': 'error',
    // async函数要有await
    // @off async函数需要没有await使用
    'require-await': 'off',

    // 禁止删除变量
    'no-delete-var': 'error',
    // 禁止覆盖undefined
    'no-undefined': 'error',
    // 禁止出现未使用的变量
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'all',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
      },
    ],

    // 数组元素超过3个时必须换行
    // @off
    'array-bracket-newline': 'off',
    // 代码快中必须使用一致的空格数量
    // @fix
    'block-spacing': [
      'error',
      'always',
    ],
    // 第一个大括号不要换行
    // @fix
    'brace-style': [
      'error',
      '1tbs',
      { allowSingleLine: true },
    ],
    // 多行属性或数组结尾必须添加逗号
    // @fix
    // 'comma-dangle': [
    //   'error',
    //   'always-multiline',
    // ],
    // 强制逗号前空格
    // @fix
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    // 禁止行首逗号
    // @fix
    'comma-style': [
      'error',
      'last',
    ],
    // 计算属性禁止空格
    'computed-property-spacing': [
      'error',
      'never',
    ],
    // 调用函数时函数名和括号之间禁止有空格
    // @fix
    'func-call-spacing': [
      'error',
      'never',
    ],
    // 缩进必须为2个空格
    // @fix
    'indent': [
      'error',
      2,
      { SwitchCase: 1 },
    ],
    // 对象字面量冒号后必须有一个空格，冒号前不能有空格
    // @fix
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],
    // 关键字前后必须有空格
    // @fix
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    // 方法链中同一个行最多只能写2个方法
    'newline-per-chained-call': [
      'error',
      { ignoreChainWithDepth: 2 },
    ],
    // 禁止空格tab混用
    'no-mixed-spaces-and-tabs': 'error',
    // 禁止多行空行
    'no-multiple-empty-lines': 'error',
    // 禁止行尾空格
    // @fix
    'no-trailing-spaces': 'error',
    // 禁止无用的三元运算
    // @fix
    'no-unneeded-ternary': 'error',
    // 禁止属性前空格
    // @fix
    'no-whitespace-before-property': 'error',
    // 大括号收尾必须有换行
    // @fix
    // 'object-curly-newline': [
    //   'warn',
    //   {
    //     multiline: true,
    //     // consistent: true,
    //     minProperties: 3,
    //   },
    // ],
    // 大括号首尾必须要有空格
    // @fix
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: false,
      },
    ],
    // 对象每一个属性必须在同一行或不同行
    // @fix
    'object-property-newline': [
      'error',
      { allowMultiplePropertiesPerLine: true },
    ],
    // 操作符需换行时必须放在行尾
    // @fix
    'operator-linebreak': [
      'error',
      'after',
    ],
    // 必须使用单引号
    'quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    // 一行多条语句分号之前无空格，之后必须有空格
    // @fix
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    // 语句块大括号之前必须要有空格
    // @fix
    'space-before-blocks': [
      'error',
      'always',
    ],
    // 函数申明和括号之间必须要有空格
    // @fix
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    // 小括号首尾禁止空格
    // @fix
    'space-in-parens': [
      'error',
      'never',
    ],
    // 操作符左右必须有空格
    // @fix
    'space-infix-ops': 'error',
    // 一元操作符强制空格
    // @fix
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false,
      },
    ],
    // case冒号前禁止空格，冒号后必须有空格
    // @fix
    'switch-colon-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    // 模板字符串tag后禁止空格
    // @fix
    'template-tag-spacing': [
      'error',
      'never',
    ],
    // 禁止BOM
    // @fix
    'unicode-bom': [
      'error',
      'never',
    ],


    // 箭头函数必须用大括号包裹
    // @off 直接返回没必要用花括号
    'arrow-body-style': 'off',
    // 箭头函数必须使用圆括号
    // @off 违背语法初衷
    'arrow-parens': 'off',
    // 箭头函数箭头前后必须有空格
    // @fix
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    // 构造函数中必须调用super
    'constructor-super': 'error',
    // generator 的 * 前面禁止有空格，后面必须有空格
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    // 禁止对类重新赋值
    'no-class-assign': 'error',
    // 禁止对const变量重新赋值
    'no-const-assign': 'error',
    // 禁止类成员重复
    'no-dupe-class-members': 'error',
    // 禁止重复import模块
    'no-duplicate-imports': 'error',
    // 禁止new Symbol
    'no-new-symbol': 'error',
    // 禁止在调用super前使用this
    'no-this-before-super': 'error',
    // 禁止无意义的非单纯键名
    'no-useless-computed-key': 'error',
    // 禁止无意义的构造函数
    'no-useless-constructor': 'error',
    // 禁止无意义的重命名
    // @fix
    'no-useless-rename': 'error',
    // 尽量使用const
    // @fix
    'prefer-const': 'error',
    // 尽量使用解构
    // @fix
    'prefer-destructuring': 'warn',
    // 必须使用模板字符串做字符串拼接
    // @fix
    'prefer-template': 'error',
    // 展开运算符后禁止空格
    // @fix
    'rest-spread-spacing': [
      'error',
      'never',
    ],
    // 禁止使用var
    // @fix
    'no-var': 'error',
    // 创建Symbol时必须传入参数
    'symbol-description': 'error',
    // 模板字符串变量占位符大括号首尾禁止空格
    'template-curly-spacing': [
      'error',
      'never',
    ],
    // yield* 后必须有空格
    'yield-star-spacing': [
      'error',
      'after',
    ],
    // 禁止计算属性包含异步方法
    'vue/no-async-in-computed-properties': 'error',
    // 静止重复的key
    'vue/no-dupe-keys': 'error',
    // 禁止重复的属性
    'vue/no-duplicate-attributes': 'error',
    // 禁止模板渲染错误
    'vue/no-parsing-error': [
      'warn',
      { 'x-invalid-end-tag': false },
    ],
    // 禁止覆盖保留字
    'vue/no-reserved-keys': 'error',
    // render函数必须有返回值
    'vue/require-render-return': 'error',
    // v-for必须指定key
    'vue/require-v-for-key': 'error',
    // prop默认值类型必须和type相同
    'vue/require-valid-default-prop': 'error',
    // 计算属性必须有返回值
    'vue/return-in-computed-property': 'error',
    // template模板只能有一个根元素
    'vue/valid-template-root': 'error',
    // v-bind必须合法
    'vue/valid-v-bind': 'error',
    // v-cload必须合法
    'vue/valid-v-cloak': 'error',
    // v-else-if必须合法
    'vue/valid-v-else-if': 'error',
    // v-else必须合法
    'vue/valid-v-else': 'error',
    // v-for必须合法
    'vue/valid-v-for': 'error',
    // v-html必须合法
    'vue/valid-v-html': 'error',
    // v-if必须合法
    'vue/valid-v-if': 'error',
    // v-model必须合法
    'vue/valid-v-model': 'error',
    // v-on必须合法
    'vue/valid-v-on': 'error',
    // v-once必须合法
    'vue/valid-v-once': 'error',
    // v-pre必须合法
    'vue/valid-v-pre': 'error',
    // v-show必须合法
    'vue/valid-v-show': 'error',
    // v-text必须合法
    'vue/valid-v-text': 'error',
    'vue/order-in-components': 'error',
    // template中禁止出现this
    'vue/this-in-template': 'error',
    // 模板反小括号禁止单独换行
    // @fix
    'vue/html-closing-bracket-newline': 'error',
    // good: <div></div> <img src='src' />
    // bad: <div ></div> <img src='src'/>
    // @fix
    'vue/html-closing-bracket-spacing': 'error',
    "vue/html-indent": ["error", 2, {
      // "attribute": 1,
      // "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": [],
      // "caseSensitive": true // <= new option
    }]
    // 'vue/script-indent': [
    //   'error',
    //   4,
    //   {
    //     'baseIndent': 1
    //   }
    // ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
