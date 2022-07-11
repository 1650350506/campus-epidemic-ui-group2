<template>
  <div class='ui-fas'>
    <Tabs v-model='categoryId' name='tab1-1' @on-click='changeCategory'>
        <TabPane
          v-for='category in categories'
          :label='category.name'
          :value='category.id'
          :key='category.id'
          :name='category.id'
          tab='tab1-1'>
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
        </TabPane>
    </Tabs>
  </div>
</template>

<script>

    import { listIconCategory, listRelation } from '@/api/setup/iconCategory';
    export default {
        name: 'IconCategorySelector',
        props: {
            selectorType: {
                type: String,
                default: 'iconCategorySelector'
            }
        },
        data () {
            return {
                categoryId: '',
                categories: [],
                iconList: []
            }
        },
        watch: {
            selectorType: {
                handler (val) {
                    if (val === 'iconCategorySelector') {
                        this.getCategories()
                    }
                },
                deep: true
            }
        },
        created () {
            this.getCategories()
        },
        methods: {
            selectedIcon (name) {
                this.$emit('selectedIcon', name)
                document.body.click()
            },

            getCategories () {
                listIconCategory({ name: '' })
                    .then(rst => {
                        this.categories = rst
                        if (this.categories && this.categories.length) {
                            this.categoryId = this.categories[0].id
                            this.getIconlist()
                        }
                    })
            },

            changeCategory (categoryId) {
                this.categoryId = categoryId
                this.iconList = []
                this.getIconlist()
            },

            getIconlist () {
                listRelation({ iconCategoryId: this.categoryId })
                    .then(rst => {
                        this.iconList = rst
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
.ivu-tabs-tabpane{
  height: 240px;
}
.ivu-tabs{
  height: 300px;
}
.fas-icon-div{
  height: 100%;
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
