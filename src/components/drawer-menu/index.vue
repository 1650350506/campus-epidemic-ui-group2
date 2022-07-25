<template>
  <Drawer
    class='drawer-menu'
    :transfer='false'
    placement='left'
    :closable='false'
    v-model='visible'
    @on-close='visible=false, $emit("input", false)'
  >
    <div slot='header'>
      <i class='iconfont icon-product' />  产品与服务
    </div>
    <Menu
      :active-name='activeName'
      :open-names='openNames'
      @on-select='selectPro'
      theme='light'
      width='auto'
    >
      <Submenu :name='index' v-for='(item, index) in data' :key='index'>
        <template slot='title'>
          <Icon :custom='item.ico' />{{item.moduleName}}
        </template>
        <div v-for='child in item.permissions' :key='child.id'>
          <div v-if='child.jumpType==="open"'>
            <MenuItem
              :name='child.id'
              target='_blank'
              :to='child.normalUrl'
            >
              <Icon :custom='child.ico' />{{child.cname}}
            </MenuItem>
          </div>
          <div v-else>
            <MenuItem :name='child.id' :to='child.normalUrl'>
              <Icon :custom='child.ico' />{{child.cname}}
            </MenuItem>
          </div>
        </div>
      </Submenu>
    </Menu>
  </Drawer>
</template>
<script>
export default {
  name: 'DrawerMenu',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: this.value,
      activeName: '',
      openNames: []
    }
  },
  watch: {
    value(newVal) {
      this.visible = newVal
    }
  },
  created() {},
  methods: {
    selectPro(path) {
      this.visible = false
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="less" scoped>
  .drawer-menu {
    --aa: #aaa;
    & /deep/ .ivu-drawer-content{
      // background: #515a6e;
    }
    & /deep/ .ivu-drawer-body{
      padding: 0;
    }

    & /deep/ .ivu-drawer-header{
      font-size: 14px;
      color: #17233d;
    }
  }
</style>
