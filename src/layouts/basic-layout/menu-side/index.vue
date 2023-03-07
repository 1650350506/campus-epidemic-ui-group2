<template>
  <div>
    <div class="i-layout-sider-logo" :class="{ 'i-layout-sider-logo-dark': siderTheme === 'dark' }">
      <transition name="fade-quick">
        <!--        <i-link to="/index" v-show="!hideLogo">-->
        <!--          <img src="@/assets/images/logo-small.png" v-if="!menuCollapse">-->
        <!--          <img src="@/assets/images/logo.png" v-else-if="siderTheme === 'light'">-->
        <!--          <img src="@/assets/images/logo-dark.png" v-else>-->
        <!--        </i-link>-->
      </transition>
    </div>
    <Menu
      ref="menu"
      class="i-layout-menu-side i-scrollbar-hide"
      :class="{ 'i-layout-menu-side-collapse': menuCollapse }"
      :theme="siderTheme"
      :accordion="menuAccordion"
      :active-name="activePath"
      :open-names="openNames"
      width="auto"
    >
      <template>
        <template v-for="(item, index) in applist">
          <i-menu-side-item v-if="item.children === undefined || !item.children.length" :menu="item" :key="index" />
          <i-menu-side-submenu v-else :menu="item" :key="index + 'submenu'" />
        </template>
      </template>
    </Menu>
  </div>
</template>
<script>
import iMenuSideItem from './menu-item'
import iMenuSideSubmenu from './submenu'
import iMenuSideCollapse from './menu-collapse'
import tTitle from '../mixins/translate-title'

import { mapState, mapGetters } from 'vuex'

// 元素是否在可视区域
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth))
}

export default {
  name: 'iMenuSide',
  components: { iMenuSideItem, iMenuSideSubmenu, iMenuSideCollapse },
  mixins: [tTitle],
  props: {
    hideLogo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      applist: [],
      allapplist: [],
      selectData: [],
      menusList: []
    }
  },
  computed: {
    ...mapState('admin/layout', [
      'siderTheme',
      'menuAccordion',
      'menuCollapse'
    ]),
    ...mapState('admin/menu', [
      'activePath',
      'openNames'
    ]),
    ...mapGetters('admin/menu', [
      'filterSider'
    ])
  },
  watch: {
    $route: {
      handler() {
        console.log('this is menu ')
        this.handleUpdateMenuState()
      },
      immediate: true
    },
    // 在展开/收起侧边菜单栏时，更新一次 menu 的状态
    menuCollapse() {
      this.handleUpdateMenuState()
    }
  },
  created() {
    this.listBaseMenuT()
  },
  methods: {
    listBaseMenuT() {
      const list = JSON.parse(localStorage.getItem('menusList'))
      console.log(list)
      list.forEach(item => {
        console.log(item)
        this.applist.push({
          // 后续改为title
          title: item.name,
          path: item.path,
          icon: item.icon
        })
      })
    },
    searchQuery(query) {
      if (query) {
        this.selectData = []
        this.allapplist.forEach(item => {
          const apps = item.children.filter(app => app.title.indexOf(query) === 0)
          if (apps.length > 0) {
            this.selectData.push({
              title: item.title,
              custom: item.custom,
              children: apps
            })
          }
        })
      } else {
        this.selectData = this.allapplist
      }
    },
    handleUpdateMenuState() {
      this.$nextTick(() => {
        if (this.$refs.menu) {
          this.$refs.menu.updateActiveName()
          if (this.menuAccordion) this.$refs.menu.updateOpened()
          // 聚焦当前项
          this.$nextTick(() => {
            const $activeMenu = document.getElementsByClassName('ivu-menu-item ivu-menu-item-active ivu-menu-item-selected')
            if ($activeMenu && $activeMenu.length && !isElementInViewport($activeMenu[0])) {
              const activeMenuTop = $activeMenu[0].getBoundingClientRect().top
              const $menu = this.$refs.menu.$el
              setTimeout(() => {
                this.$ScrollTop($menu, {
                  to: activeMenuTop,
                  time: 0
                })
              }, 300)
            }
          })
        }
      })
    }
  }
}
</script>
