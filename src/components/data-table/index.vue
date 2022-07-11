<template>
  <div class='i-table-no-border'>
    <Table
      ref='pageTable'
      :columns='columns'
      :data='limitData'
      :loading="loading"
      class="ivu-mt"
      :highlight-row ='singleElection'
      @on-row-click='rowClick'
      @on-selection-change='(selections) => $emit("on-selection-change",selections)'
      @on-sort-change='(value) => $emit("on-sort-change", value)'
      @on-filter-change='(value) => $emit("on-filter-change", value)'
    />

    <!-- 翻页 -->
    <div class="ivu-mt ivu-text-center" v-if='tableData.total>0'>
      <Page
        show-total
        show-elevator
        show-sizer
        :page-size-opts='pageSizeOpts'
        :total='+tableData.records'
        :current='+tableData.page'
        :page-size='+tableData.pagesize'
        @on-change='(page) => $emit("changePage", page)'
        @on-page-size-change='(size) => {this.$parent.params.rows = size;$emit("changePage")}'
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'data-table',
  props: {
    data: { // 表格数据
      type: Object,
      default: () => ({})
    },
    selectDatas: { // 表格选中数据
      type: Array,
      default: () => []
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    columns: { // 表格参数
      type: Array,
      default: () => []
    },
    checked: { // 默认选中
      type: Array,
      default: () => []
    },
    loading: { // 表格加载中
      type: Boolean,
      default: false
    },
    singleElection: { // 单选
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedValue: 0,
      tableData: {
        rows: []
      },
      pageSizeOpts: [10, 20, 40, 80, 100],
      tableHeight: 0,
      selectTableDatas: []
    }
  },
  computed: {
    limitData() {
      const data = [...this.tableData.rows]

      // 判断是否有选中的数据
      const selectedIds = this.selectTableDatas.map(item => item.id)
      data.map(item => {
        item._checked = selectedIds.indexOf(item.id) >= 0
        return item
      })

      return data
    }
  },
  watch: {
    data: {
      handler(newVal) {
        this.tableData = newVal
        this.$nextTick(() => {
          this.tableHeight = parseInt(this.$refs.pageTable.$el.clientHeight)
        })
      },
      deep: true
    },
    selectDatas(newVal) {
      this.selectTableDatas = newVal
    },
    selected(newVal) {
      this.selectedValue = newVal
    }
  },
  created() {
    this.selectedValue = this.selected
    this.selectTableDatas = this.selectDatas
  },
  methods: {
    rowClick(data, index) {
      this.$refs.pageTable.toggleSelect(index)
      this.$emit('rowClick', data)
    },
    handleClickItem(key) {
    },
    // 清空所有已选项
    handleClearSelect() {
      this.selectTableDatas = []
    }
  }
}
</script>
