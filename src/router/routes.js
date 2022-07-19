
import dashboard from './modules/dashboard'
import BasicLayout from '@/layouts/basic-layout'

/**
 * 在主框架内显示
 */

const frameIn = [
  {
    path: '/',
    redirect: {
      name: 'login'
    },
    component: BasicLayout,
    children: [
      {
        path: 'index',
        name: 'index',
        redirect: {
          name: 'dashboard-workplace'
        }
      },
      {
        path: '/isolationAnalysis',
        name: 'isolationAnalysis',
        component: () => import('@/pages/administrators/analysis')
      },
      {
        path: '/riskAreaManage',
        name: 'riskArea',
        component: () => import('@/pages/administrators/area')
      },
      {
        path: '/highestPreManage',
        name: 'highestPre',
        component: () => import('@/pages/administrators/college')
      },
      {
        path: '/studentMessage',
        name: 'studentMessage',
        component: () => import('@/pages/groupleader/stumanage/stubasic')
      },
      {
        path: '/riskPreMessage',
        name: 'riskPreMessage',
        component: () => import('@/pages/groupleader/stumanage/riskpre')
      },
      {
        path: '/outRecord',
        name: 'outRecord',
        component: () => import('@/pages/groupleader/stumanage/outrecord')
      },
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志'
        },
        component: () => import('@/pages/system/log')
      },
      {
        path: '/setting/account',
        name: 'account',
        meta: {
          title: '个人中心'
        },
        component: () => import('@/pages/setting/account')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            next(instance => instance.$router.replace(from.fullPath))
          },
          render: h => h()
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            next(instance => instance.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h()
        }
      },
      {
        path: '/iframe-page/:menuId',
        name: 'iframe-page',
        meta: {
          auth: true,
          title: ''
        },
        component: () => import('@/pages/inner-page')
      }
    ]
  },
  dashboard
]

/**
 * 在主框架之外显示
 */

const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/pages/account/login')
  }
]

/**
 * 错误页面
 */

const errorPage = [
  {
    path: '/403',
    name: '403',
    meta: {
      title: '403'
    },
    component: () => import('@/pages/system/error/403')
  },
  {
    path: '/500',
    name: '500',
    meta: {
      title: '500'
    },
    component: () => import('@/pages/system/error/500')
  },
  {
    path: '*',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import('@/pages/system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
