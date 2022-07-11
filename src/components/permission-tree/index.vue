<template>
  <div class='left-tree'>
    <Select
        v-model='searchText'
        filterable
        remote
        label-in-value
        placeholder='请输入搜索内容'
        :remote-method='filterPermissionTree'
        :loading='searchLoading'
        @on-change='fixedPermission'>
        <Option v-for='option in searchList' :value='option.id' :key='option.id'>{{option.cname}}</Option>
    </Select>

    <Tree
      :data='data'
      :load-data='(item, callback) => $emit("loadData",item, callback)'
      @on-select-change='(selects, tree) => $emit("on-select-change",tree)' />
  </div>
</template>
<script>
    import { listAllByName, listParentById } from '@/api/system/permission';

    export default {
        name: 'PermissionTree',
        props: {
            data: {
                type: Array,
                default: () => []
            }
        },
        data () {
            return {
                searchText: '',
                searchList: [],
                searchLoading: false
            }
        },
        methods: {
            // 模糊搜索
            filterPermissionTree (name) {
                this.searchLoading = true
                listAllByName({ cname: name })
                    .then(rst => {
                        this.searchList = rst
                        this.searchLoading = false
                    })
            },
            // 定位权限
            fixedPermission (permission) {
                const { value } = permission
                listParentById({ id: value })
                    .then(rst => {
                        const ids = rst
                        ids.unshift('0')
                        this.$emit('fixedPermission', ids)
                    })
            }
        }
    }
</script>
<style lang="less" scoped>

</style>
