<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { on, off } from 'view-design/src/utils/dom'
import { setMatchMedia } from 'view-design/src/utils/assist'

import { mapMutations } from 'vuex'

setMatchMedia()

export default {
  name: 'app',
  methods: {
    ...mapMutations('admin/layout', [
      'setDevice'
    ]),
    handleWindowResize() {
      this.handleMatchMedia()
    },
    handleMatchMedia() {
      const { matchMedia } = window

      if (matchMedia('(max-width: 600px)').matches) {
        this.setDevice('Mobile')
      } else if (matchMedia('(max-width: 992px)').matches) {
        this.setDevice('Tablet')
      } else {
        this.setDevice('Desktop')
      }
    }
  },
  // eslint-disable-next-line vue/order-in-components
  mounted() {
    on(window, 'resize', this.handleWindowResize)
    this.handleMatchMedia()
  },
  // eslint-disable-next-line vue/order-in-components
  beforeDestroy() {
    off(window, 'resize', this.handleWindowResize)
  }
}
</script>
