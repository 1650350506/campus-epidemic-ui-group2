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
    <Card class="card-marginTop card">
      <Search></Search>
    </Card>
    <Card class="card-marginTop">
      <Table border :columns="columns" :data="data" :border="false" class="table"></Table>
      <Page :total="100" show-elevator show-sizer class-name="page"></Page>
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
          key: 'class_name',
          align: 'center'
        },
        {
          title: '联系方式',
          key: 'phone',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: '300',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  backgroundColor: '#e0e0e0',
                  border: '0px',
                  color: '#01b0ff',
                  background: 'transparent'
                },
                on: {
                  click: () => {
                    this.addIsolation(params.row)
                  }
                }
              }, '待隔离')
            ])
          }
        }
      ],
      data: [
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: '0',
          nucleic_result: '阳性',
          temperature: 36.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        },
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: 0,
          nucleic_result: '阴性',
          temperature: 36.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        },
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: 0,
          nucleic_result: '阴性',
          temperature: 36.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        },
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: 0,
          nucleic_result: '阴性',
          temperature: 36.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        },
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: 0,
          nucleic_result: '阴性',
          temperature: 36.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        },
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: 0,
          nucleic_result: '阴性',
          temperature: 67.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        },
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: 0,
          nucleic_result: '阴性',
          temperature: 36.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        }]
    }
  },
  created() {
    this.getAllRiskInfoList()
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
    getAllRiskInfoList() {
      const data = {
        pageNum: '1',
        pageSize: '10',
        keyword: ''
      }
      GetIsolationInfoList(data).then((res) => {
        console.log(res)
      })
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
