<template>
  <div  style="margin:84px 24px 0 24px">
    <Card  :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb"  />
      <h2 style="margin-top: 10px;">你好！ {{userInfo.roleName}}！</h2>
    </Card>
    <Card class="card">
      <Search title="请输入学生学号、学生姓名" :keyValue="queryInfo.keyword" @selectFun="queryWaitIsolationInfoBykey"></Search>
    </Card>
    <Card class="card-marginTop card" dis-hover>
      <Button type="primary" style="margin-bottom: 10px" @click="addDialogVisible = true">+ 新增 </Button>
      <div class="table-box">
        <Table  :columns="columns" :data="data" :border="false" class="table"></Table>
      </div>
      <Page :total="total" :current="queryInfo.pageNum" show-elevator show-sizer class-name="page"  @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
    <NewContent :newSwitch="addDialogVisible" @addClose="closeByNew"></NewContent>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import Search from '@/components/top/search'
import { GetIsolationInfoList, EditIsolationState } from '@api/personnel/riskpremanage'
import NewContent from './../newPre'
import { mapState } from 'vuex'
export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, Search, NewContent
  },
  data() {
    return {
      columns: [
        {
          title: '学生学号',
          key: 'code',
          align: 'center'
        },
        {
          title: '学生姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '班级',
          key: 'classname',
          align: 'center'
        },
        {
          title: '联系方式',
          key: 'phoneNumber',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: '300',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Poptip', {
                props: {
                  placement: 'top-start',
                  confirm: true,
                  transfer: true,
                  title: '确定修改隔离状态吗？'
                },
                on: {
                  'on-ok': () => {
                    this.editIsolationStateByCode(params.row.code)
                  },
                  // eslint-disable-next-line no-empty-function
                  'on-cancel': () => {
                  }
                }
              }, [
                h('Button', {
                  class: 'deleteHover',
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    title: '解除'
                  },
                  style: {
                    color: '#01b0ff',
                    marginRight: '5px',
                    border: '0px'
                  },
                  on: {
                  }
                }, '待隔离')
              ])
            ])
          }
        }
      ],
      addDialogVisible: false,
      data: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        keyword: '',
        state: 0
      },
      total: 0
    }
  },
  computed: {
    ...mapState('admin/account', ['userInfo'])
  },
  created() {
    this.getWaitIsolationInfoList()
  },
  methods: {
    // 点击修改该人状态（变成已隔离)
    addIsolation(obj) {
      let state
      if (obj.nucleic_result === '阴性') {
        state = 0
      } else if (obj.nucleic_result === '阳性') {
        state = 1
      }
      obj.nucleic_result = state
      obj.isolation_state = 1
      console.log(obj)
    },
    closeByNew() {
      this.addDialogVisible = false
    },
    // 查询已隔离或者未隔离信息
    getWaitIsolationInfoList() {
      GetIsolationInfoList(this.queryInfo).then((res) => {
        console.log(res)
        this.data = res.data
        this.total = res.total
      })
    },
    // 修改隔离状态
    editIsolationStateByCode(code) {
      const data = {
        code: code
      }
      EditIsolationState(data).then((res) => {
        this.$Message.success('修改隔离状态成功!')
        this.queryInfo.keyword = ''
        this.getWaitIsolationInfoList()
      })
    },
    // 关键字查询隔离人员信息
    queryWaitIsolationInfoBykey(e) {
      this.data = []
      this.queryInfo.keyword = e
      this.getWaitIsolationInfoList()
    },
    // 选择页码
    editPageNum(e) {
      this.queryInfo.pageNum = e
      this.getWaitIsolationInfoList()
    },
    // 选择当页最大条数
    editPageSize(e) {
      this.queryInfo.pageSize = e
      this.getWaitIsolationInfoList()
    }
  }
}
</script>

<style lang="less" scoped>
.card-item {
  margin-right: 2em;
  .card {
    height: 120px;
    h1 {
      font-size: 3em;
    }
  }
}
</style>
