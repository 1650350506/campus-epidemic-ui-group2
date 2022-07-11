/**
 * @description 鉴权指令
 * 当传入的权限当前用户没有时，会移除该组件
 * 用例：<Tag v-auth="['admin']">text</Tag>
 * */
import store from '@/store'
import { includeArray } from '@/libs/system'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const { permissionButtons } = store.state.admin.menu
    const access = []
    permissionButtons.forEach(element => {
      access.push(element.ename)
    })

    if (value && value instanceof Array && value.length) {
      const isPermission = includeArray(value, access)
      if (!isPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
}
