<template>
  <div>
    <Card :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb"  />
      <h2 style="margin-top: 10px;">你好！ xx学院防控人员杨刚！</h2>
    </Card>
    <Row style="margin-top: 2em">
      <Col :span="6" v-for="(item, index) in topList" :key="index" class="card-item">
        <Card class="card">
          <h2>{{item.name}}</h2>
          <h1>{{item.num}}</h1>
        </Card>
      </Col>
    </Row>
    <Card class="card">
      <Search :keyValue="queryInfo.keyword" @selectFun="queryWaitIsolationInfoBykey"></Search>
    </Card>
    <Card class="card-marginTop card">
      <Table  :columns="columns" :data="data" :border="false" class="table"></Table>
      <Page :total="total" show-elevator show-sizer class-name="page"  @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import Search from '@/components/top/search'
import { GetIsolationInfoList } from '@api/personnel/riskpremanage'
export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, Search
  },
  data() {
    return {
      topList: [
        { name: '待隔离', num: 43 },
        { name: '已隔离', num: 8 }
      ],
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
    // 查询已隔离或者未隔离信息
    getWaitIsolationInfoList() {
      GetIsolationInfoList(this.queryInfo).then((res) => {
        console.log(res)
        console.log(1)
        this.data = res.data
        this.total = res.total
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
