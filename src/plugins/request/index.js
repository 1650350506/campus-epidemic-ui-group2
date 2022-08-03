import store from '@/store'
import axios from 'axios'
import util from '@/libs/util'
import Setting from '@/setting'
import { serialize } from '@/utils/util'
import { Message, Notice } from 'view-design'

// 创建一个错误
function errorCreate(msg) {
  const err = new Error(msg)
  errorLog(err)
  throw err
}
const BaseURL = ''
// 记录和显示错误
function errorLog(err) {
  // 添加到日志
  store.dispatch('admin/log/push', {
    message: '数据请求异常',
    type: 'error',
    meta: {
      error: err
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.error('>>>>>> Error >>>>>>')
    console.log(err)
  }
  // 显示提示，可配置使用 iView 的 $Message 还是 $Notice 组件来显示
  if (Setting.errorModalType === 'Message') {
    Message.error({
      content: err.message,
      duration: Setting.modalDuration
    })
  } else if (Setting.errorModalType === 'Notice') {
    Notice.error({
      title: '提示',
      desc: err.message,
      duration: Setting.modalDuration
    })
  }
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: BaseURL,
  timeout: 10000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (config.urlType === 'login') {
      config.baseURL = '/api'
      config.headers.Authorization = 'Basic dXNlcmNlbnRlcjoxMTg2MDQ1ZDU1OTlkZTZlZjJjYTI4MjM0N2E1NWNhMg=='
      const mete = (config.meta || {})
      // 在请求发送之前做一些处理
      if (config.method === 'post' && mete.isSerialize !== false) {
        config.data = serialize(config.data)
        // encode 解决提交中文乱码 post
        config.data = encodeURI(config.data)
      }
    } else if (config.urlType === 'jixian') {
      config.baseURL = '/jixian'
      config.headers.Authorization = util.cookies.get('token')
    }
    const token = util.cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers.auth = `bearer ${token}`
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { url } = response.config
    console.log(response.data)
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    console.log(response)
    // 这个状态码是和后端约定的
    const { code } = dataAxios

    // 区分获取token的返回参数不一致
    if (url.endsWith('oauth/token')) {
      return dataAxios
    }
    // 根据 code 进行判断
    // eslint-disable-next-line no-undefined
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 200:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios.data
        case 400:
          // [ 示例 ] 其它和后台约定的 code
          errorCreate(`${dataAxios.msg}`)
          break
        default:
          // 不是正确的 code
          errorCreate(`${dataAxios.msg}`)
          break
      }
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          if (error.response.data.error_description) {
            error.message = error.response.data.error_description; break
          }
          error.message = error.response.data.msg; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    return Promise.reject(error)
  }
)

export default service
