const Setting = require('./src/setting.env')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

module.exports = {
  publicPath: Setting.publicPath,
  lintOnSave: Setting.lintOnSave,
  outputDir: Setting.outputDir,
  assetsDir: Setting.assetsDir,
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.94:8081',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      },
      '/jixian': {
        target: 'http://127.0.0.1:8081',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/jixian': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {

      }
    }
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    /**
         * 删除懒加载模块的 prefetch preload，降低带宽压力
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
         * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
         */
    config.plugins
      .delete('prefetch')
      .delete('preload')
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
    config
    // 开发环境
      .when(process.env.NODE_ENV === 'development',
        // sourcemap不包含列信息
        config => config.devtool('cheap-source-map')
      )
    // 非开发环境
      // eslint-disable-next-line no-empty-function
      .when(process.env.NODE_ENV !== 'development', config => {
      })
    // 不编译 iView Pro
    config.module
      .rule('js')
      .test(/\.jsx?$/)
      .exclude
      .add(resolve('src/libs/iview-pro'))
      .end()
    // 使用 iView Loader
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('iview-loader')
      .loader('iview-loader')
      .tap(() => {
        return Setting.iviewLoaderOptions
      })
      .end()
    // markdown
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()
    // table-import-export
    config.module
      .rule('js')
      .test(/\.jsx?$/)
      .exclude
      .add(resolve('src/components/table-import-export'))
      .end()
    // sidebar
    config.module
      .rule('js')
      .test(/\.jsx?$/)
      .exclude
      .add(resolve('src/components/sidebar'))
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg'))
      .end()
    // 重新设置 alias
    config.resolve.alias
      .set('@api', resolve('src/api'))
    // node
    config.node
      .set('__dirname', true)
      .set('__filename', true)
    // 判断是否需要加入模拟数据
    const entry = config.entry('app')
    if (Setting.isMock) {
      entry
        .add('@/mock')
        .end()
    }
  }
}
