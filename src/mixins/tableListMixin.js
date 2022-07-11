/**
 * 通用表格混合
 * */

import DataTable from '@/components/data-table';
import _ from 'lodash'

export default {
    components: { DataTable },
    data () {
        return {
            tableData: {}, // 表格数据
            loading: false,
            modal: false, // 显示新增弹框
            modalType: 'add',
            selectDatas: [], // 存储表格选中的数据
            selectData: {},
            params: { // 表格请求参数
                page: 1,
                rows: 10,
                sidx: 'create_date',
                sord: 'desc' // 当前排序类型，可选值为：normal（默认） || asc（升序）|| desc（降序）,
            }
        }
    },
    methods: {
        // 新增按钮
        handleOpenCreate () {
            this.modalType = 'add'
            this.modal = true
            this.selectData = {}
        },
        // 点击排序按钮时触发
        handleSortChange ({ key, order }) {
            // 将排序保存到请求参数 snakeCase：驼峰转下划线
            this.params.sidx = _.snakeCase(key);
            this.params.sord = order;
            this.fetchList()
        },
        // 修改分页查询参数，并查询分页
        getData (params) {
            if (params) {
                Object.keys(params).forEach(key => {
                    if (params[key] !== undefined) {
                        this.params[key] = params[key];
                    } else {
                        this.params[key] = '';
                    }
                });
            }
            this.fetchList()
        },
        // 查询分页
        fetchList (page = 1) {
            this.$Message.success('待写分页方法！')
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 500);
        }
    }
}
