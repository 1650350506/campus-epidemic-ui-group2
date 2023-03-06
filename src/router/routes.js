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
        path: '/journey/local',
        name: '/journey/local',
        component: () => import('@/pages/administrators/journey/local')
      },
      {
        path: '/journey/cross',
        name: '/journey/cross',
        component: () => import('@/pages/administrators/journey/cross')
      },
      {
        path: '/highestPreManage',
        name: 'highestPre',
        component: () => import('@/pages/administrators/college')
      },
      {
        path: '/quarantinedManage',
        name: 'quarantinedManage',
        component: () => import('@/pages/administrators/riskpremanage/premanage')
      },
      {
        path: '/waitIsolation',
        name: 'waitIsolation',
        component: () => import('@/pages/administrators/riskpremanage/waitisolation')
      },
      {
        path: '/back',
        name: 'back',
        component: () => import('@/pages/student/back')
      },
      {
        path: '/leave',
        name: 'leave',
        component: () => import('@/pages/student/leave')
      },
      {
        path: '/record',
        name: 'record',
        component: () => import('@/pages/student/record')
      },
      {
        path: '/openCard',
        name: 'record',
        component: () => import('@/pages/administrators/punch')
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
  {
    path: '/login/back',
    component: () => import('@/pages/student/back')
  },
  {
    path: '/login/leave',
    component: () => import('@/pages/student/leave')
  },
  {
    path: '/login/record',
    component: () => import('@/pages/student/record')
  },
  {
    path: '/login/openCard',
    component: () => import('@/pages/administrators/punch')
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
