<template>
  <div class="i-layout-menu-head-title">
    <span class="i-layout-menu-head-title-icon" v-if="(item.icon || item.custom || item.img) && !hideIcon">
      <Icon :type="item.icon" style="font-size: 15px;" v-if="item.icon" />
      <Icon :custom="item.custom" style="font-size: 15px;" v-else-if="item.custom" />
      <img :src="item.img" style="font-size: 15px;" v-else-if="item.img" />
    </span>
    <span class="i-layout-menu-head-title-text">{{ tTitle(item.title) }}</span>
  </div>
</template>
<script>
/**
     * 该组件除了 Menu，也被 Breadcrumb 使用过
     * */
import tTitle from '../mixins/translate-title'
// 方法
export default {
  name: 'iMenuHeadTitle',
  mixins: [tTitle],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    hideIcon: {
      type: Boolean,
      default: false
    }
  }
}
</script>
