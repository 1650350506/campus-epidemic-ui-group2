<template>
  <div  style="margin:84px 24px 0 24px">
    <Card  :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb"  />
      <h2 style="margin-top: 10px;">你好！ {{userInfo.roleName}}！</h2>
    </Card>
    <Card class="card">
      <div class="search-container">
        <div class="left-search">
          <div></div>
          <Input placeholder="请输入学生学号、学生姓名" v-on:keyup.enter.native="queryEnter" style="width: 220px;flex: 1" v-model="queryInfo.keyword">
          </Input>
        </div>
        <Button type="primary" class="btn" @click="queryWaitIsolationInfoByKey">查询</Button>
        <Button class="btn" @click="resetQuery">重置</Button>
      </div>
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
import { GetIsolationInfoList, EditIsolationState } from '@api/personnel/riskpremanage'
import NewContent from '../newModal'
import { mapState } from 'vuex'
export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, NewContent
  },
  data() {
    return {
      columns: [
        {
          title: '学生学号',
          key: 'code',
          align: 'left'
        },
        {
          title: '学生姓名',
          key: 'name',
          align: 'left'
        },
        {
          title: '班级',
          key: 'classname',
          align: 'left'
        },
        {
          title: '联系方式',
          key: 'phoneNumber',
          align: 'left'
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
                  }
                }
              }, [
                h('Button', {
                  class: 'deleteHover',
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    title: '确认隔离'
                  },
                  style: {
                    color: '#01b0ff',
                    marginRight: '5px',
                    border: '0px',
                    background: 'transparent'
                  },
                  on: {
                  }
                }, '确认隔离')
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
    // 关闭新增对话框
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
      EditIsolationState(data).then(() => {
        this.$Message.success('修改隔离状态成功!')
        this.queryInfo.keyword = ''
        this.getWaitIsolationInfoList()
      })
    },
    // 回车查询
    queryEnter(e) {
      const keyCode = window.event ? e.keyCode : e.which
      if (keyCode === 13) {
        this.queryWaitIsolationInfoByKey()
      }
    },
    // 重置处理
    resetQuery() {
      this.queryInfo.pageNum = 1
      this.queryInfo.pageSize = 10
      this.queryInfo.keyword = ''
      this.getWaitIsolationInfoList()
    },
    // 关键字查询隔离人员信息
    queryWaitIsolationInfoByKey() {
      this.queryInfo.pageNum = 1
      this.queryInfo.pageSize = 10
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
.search-container {
  display: flex;
  border: 0;
  .left-search {
    display: flex;
    align-items: center;
    margin-right: 2em;
  }
  .btn {
    margin-right: 2em;
  }
}
</style>
