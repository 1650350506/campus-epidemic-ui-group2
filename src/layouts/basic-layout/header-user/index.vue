<template>
  <span class="i-layout-header-trigger i-layout-header-trigger-min">
    <Dropdown :trigger="isMobile ? 'click' : 'hover'" class="i-layout-header-user" :class="{ 'i-layout-header-user-mobile': isMobile }" @on-click="handleClick">
      <Avatar size="small" :src="info.avatar" v-if="info.avatar" />
      <span class="i-layout-header-user-name" v-if="!isMobile">{{ info.name }}</span>
      <DropdownMenu slot="list">
        <DropdownItem divided name="logout">
          <Icon type="ios-log-out" />
          <span>退出登录</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </span>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'iHeaderUser',
  computed: {
    ...mapState('admin/user', [
      'info'
    ]),
    ...mapState('admin/layout', [
      'isMobile',
      'logoutConfirm'
    ])
  },
  created() {
    console.log(this.info)
  },
  methods: {
    ...mapActions('admin/account', [
      'logout'
    ]),
    handleClick(name) {
      if (name === 'logout') {
        this.logout({
          confirm: this.logoutConfirm,
          vm: this
        })
      }
    }
  }
}
</script>
