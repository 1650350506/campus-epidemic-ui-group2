<template>
  <div class='ui-fas'>
    <div class='fas-icon-div'>
        <div
            class='fas-icons'
            v-for='icon in iconList'
            :key='icon.id'
            @click='selectedIcon(icon.fullIcon)'>
          <div class='icons-item'>
            <Icon :custom='icon.fullIcon' size='32' />
          </div>
        </div>
    </div>
  </div>
</template>
<script>

    import { listIcon } from '@/api/setup/icon';
    export default {
        name: 'IconSelector',
        props: {
            selectorType: {
                type: String,
                default: 'iconSelector'
            }
        },
        data () {
            return {
                iconList: []
            }
        },
        watch: {
            selectorType: {
                handler (val) {
                    if (val === 'iconSelector') {
                        this.getIconList()
                    }
                },
                deep: true
            }
        },
        methods: {
            selectedIcon (name) {
                this.$emit('selectedIcon', name)
                document.body.click()
            },

            getIconList () {
                listIcon({ })
                    .then(rst => {
                        this.iconList = rst
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
.ivu-tabs{
  height: 300px;
}
.fas-icon-div{
  height: 300px;
  width: 100%;
  overflow-y:auto;
  overflow-x:hidden;
  margin: 0;
  top: 10px;
  padding: 0
}
.icons-item {
    float: left;
    margin: 6px 6px 6px 0;
    width: 80px;
    text-align: center;
    list-style: none;
    cursor: pointer;
    height: 60px;
    color: #5c6b77;
    transition: all .2s ease;
    position: relative;
    padding-top: 10px;
}
</style>
