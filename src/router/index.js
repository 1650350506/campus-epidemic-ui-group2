import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'view-design'

import util from '@/libs/util'

import Setting from '@/setting'

import store from '@/store/index'

// 路由数据
import routes from './routes'

import { GetPermissionBtns } from '@api/system/menu'

// 方法
import { getHeaderName, getMenuSider, getSiderSubmenu } from '@/libs/system'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes,
  mode: Setting.routerMode,
  base: Setting.routerBase
})

/**
 * 路由拦截
 * 权限验证
 */

router.beforeEach((to, from, next) => {
  if (Setting.showProgressBar) iView.LoadingBar.start()

  if (to.path === '/' || to.path === '/login' || to.path === '/login/back' || to.path === '/login/leave' || to.path === '/login/record' || to.path === '/login/openCard') {
    next()
  } else {
    // 这里依据 token 判断是否登录，可视情况修改
    const token = util.cookies.get('token')

    if (token && token !== 'undefined') {
      // 通过路由名ename与根据用户查询所得菜单比较完成权限判断
      let dispatch = false
      // 第一次登录是获取用户菜单
      if (from.path === '/' || from.path === '/login') {
        // 菜单组装
        store.dispatch('admin/menu/getMenus').then(res => {
          const menuSider = res
          let { path } = to
          // 判断是否有权限才可以进入
          if (to.matched.some(_ => _.meta.auth)) {
            // 权限判断跳转
            menuSider.forEach(menu => {
              if (menu.children) {
                menu.children.forEach(item => {
                  if (to.path === item.path) {
                    dispatch = true
                  }
                })
              }
            })
            if (!dispatch) {
              next('/404')
            }
          } else {
            if (from.path !== '/login') {
              path = util.cookies.get('menuPath')
            }
            // 不需要身份校验 直接通过
            next()
          }
          let headerName = getHeaderName(path, menuSider)
          if (headerName === null) {
            path = to.path
            headerName = getHeaderName(path, menuSider)
          }
          // 在 404 时，是没有 headerName 的
          if (headerName !== null) {
            store.commit('admin/menu/setHeaderName', headerName)
            const filterMenuSider = getMenuSider(menuSider, headerName)
            store.commit('admin/menu/setSider', filterMenuSider)
            store.commit('admin/menu/setAllSider', filterMenuSider)
            store.commit('admin/menu/setActivePath', path)
            const openNames = getSiderSubmenu(path, menuSider)
            store.commit('admin/menu/setOpenNames', openNames)
            util.cookies.set('menuPath', path)
          }
        })
          .catch(error => {
            console.log(error)
            next({
              name: 'login',
              query: {
                redirect: to.fullPath
              }
            })
          })
      } else {
        const { path } = to
        const menus = localStorage.getItem('menusList')
        // 判断是否需要登录才可以进入
        if (to.matched.some(_ => _.meta.auth)) {
          menus.forEach(menu => {
            if (menu.children) {
              menu.children.forEach(item => {
                if (to.path === item.path) {
                  GetPermissionBtns({ parentId: item.id }).then(res => {
                    store.commit('admin/menu/setPermissionButtons', res)
                    next()
                  })
                    .catch(error => {
                      console.log(error)
                      next({
                        name: 'login',
                        query: {
                          redirect: to.fullPath
                        }
                      })
                    })
                  dispatch = true
                }
              })
            }
          })
          if (!dispatch) {
            next('/404')
          }
        } else {
          // 不需要身份校验 直接通过
          next()
        }
        const headerName = getHeaderName(path, menus)
        // 在 404 时，是没有 headerName 的
        if (headerName !== null) {
          store.commit('admin/menu/setHeaderName', headerName)
          store.commit('admin/menu/setActivePath', path)
          const openNames = getSiderSubmenu(path, menus)
          store.commit('admin/menu/setOpenNames', openNames)
          util.cookies.set('menuPath', path)
        }
      }
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})

router.afterEach(to => {
  if (Setting.showProgressBar) iView.LoadingBar.finish()
  // 多页控制 打开新的页面
  if (to.path.indexOf('/iframe-page/') === 0 && to.params.menuId) {
    let { title } = to.meta
    const { sider } = store.state.admin.menu
    sider.forEach(item => item.children.forEach(page => {
      if (to.path === page.path) {
        title = page.title
        to.meta.title = page.title
      }
    }))
    store.dispatch('admin/page/open', to)
    // 更改标题
    util.title({
      title: title
    })
  } else {
    store.dispatch('admin/page/open', to)
    // 更改标题
    util.title({
      title: to.meta.title
    })
  }
  // 返回页面顶端
  window.scrollTo(0, 0)
})

export default router
