<template>
  <div clsss='icon-container'>
    <Tabs type='card' name='tab1' @on-click='changeSelector'>
        <TabPane label='分类图标选择器' name='iconCategorySelector' tab='tab1'>
          <IconCategorySelector
          @selectedIcon='selectedIcon'
          :selectorType='selectorType' />
        </TabPane>
        <TabPane label='通用图标选择器' name='iconSelector' tab='tab1'>
          <IconSelector
          @selectedIcon='selectedIcon'
          :selectorType='selectorType' />
        </TabPane>
    </Tabs>
  </div>
</template>
<script>

    import IconCategorySelector from './components/iconCategorySelector'
    import IconSelector from './components/iconSelector'
    export default {
        name: 'IconCommonSelector',
        components: {
            IconCategorySelector,
            IconSelector
        },
        data () {
            return {
                selectorType: 'iconCategorySelector'
            }
        },
        methods: {
            selectedIcon (name) {
                this.$emit('selectedIcon', name)
            },
            changeSelector (id) {
                console.log(id)
                this.selectorType = id
                console.log(this.selectorType)
            }
        }
    }
</script>

<style lang="less" scoped>
.icon-container{
  height: 400px;
}

.icon-container{
  & /deep/ .ivu-tabs-content{
    height: 400px;
  }
}
</style>
