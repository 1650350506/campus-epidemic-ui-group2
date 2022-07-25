<template>
  <div>
    <Card :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb" />
      <!--      {{接口数据}}-->
      <h2>你好！ 疫情防控小组组长！</h2>
    </Card>
    <Card class="card-marginTop card">
      <div slot="extra" style="display: flex; align-items: center">
        <div style="margin-right: 5px">隔离状态选择：</div>
        <Select v-model="selectModel" style="width:200px" @on-change="queryListByState(selectModel)">
          <Option v-for="item in gradeList" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <Button>查询</Button>
      </div>
      <Search :keyValue="queryInfo.keyword" @selectFun="queryRiskPreByKey"></Search>
      <Table  :border="false" :columns="columns" :data="data" class="table"></Table>
      <Page :total="total" show-elevator show-sizer class-name="page"  @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
    <Modal
      v-model="showDialogVisible"
      @on-cancel="showDialogVisible = false"
      width="720"
    >
      <p slot="header" style="text-align: center">隔离学生基本信息</p>
      <div class="modal-container">
        <div class="modal-item"  v-for="(item, index) in dialogList" :key="index">
          <div class="null"></div><div class="star" :style="item.isEdit ? {}: {opacity: 0}">*</div><div class="title" v-if="item">{{item.title}}：</div><div class="core">{{item.value}}</div>
        </div>
      </div>
      <div slot="footer">
        <Button @click="showDialogVisible = false" type="primary">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import Search from '@/components/top/search'
import { GetRiskPreInfoList } from '@api/group/riskPre'
export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, Search
  },
  data() {
    return {
      selectModel: '默认',
      gradeList: [
        '默认', '已隔离', '待隔离'
      ],
      showDialogVisible: false,
      dialogList: {
        code: {
          title: '学号', value: '199200118', isEdit: false
        },
        name: {
          title: '姓名', value: '阿非', isEdit: false
        },
        sex: {
          title: '性别', value: 0, isEdit: false
        },
        class_name: {
          title: '班级', value: '计科19', isEdit: false
        },
        phone: {
          title: '手机号', value: '12345678900', isEdit: false
        },
        start_time: {
          title: '隔离开始时间', value: '2022-05-22', isEdit: false
        },
        end_time: {
          title: '隔离结束时间', value: '2022-05-22', isEdit: false
        },
        isolation_state: {
          title: '隔离状态', value: '', isEdit: false
        },
        nucleic_result: {
          title: '核酸结果', value: '', isEdit: false
        },
        temperature: {
          title: '体温', value: 0, isEdit: false
        },
        associates: {
          title: '关联防疫人员', value: '', isEdit: false
        },
        nucleic_time: {
          title: '核酸时间', value: '', isEdit: false
        }
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '学号学号',
          key: 'code'
        },
        {
          title: '学生姓名',
          key: 'name'
        },
        {
          title: '班级',
          key: 'class_name'
        },
        {
          title: '开始时间',
          key: 'start_time',
          align: 'center',
          width: 200
        },
        {
          title: '结束时间',
          key: 'end_time',
          align: 'center',
          width: 200
        },
        {
          title: '隔离状态',
          key: 'isolation_state'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  // type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  border: '0px'
                },
                on: {
                  click: () => {
                    this.showDialogVisible = true
                    this.dialogList.code.value = params.row.code
                    this.dialogList.name.value = params.row.name
                    this.dialogList.sex.value = params.row.sex
                    this.dialogList.class_name.value = params.row.class_name
                    this.dialogList.phone.value = params.row.phone
                    this.dialogList.start_time.value = params.row.start_time
                    this.dialogList.end_time.value = params.row.end_time
                    this.dialogList.isolation_state.value = params.row.isolation_state
                    this.dialogList.nucleic_result.value = params.row.nucleic_result
                    this.dialogList.temperature.value = params.row.temperature
                    this.dialogList.associates.value = params.row.associates
                    this.dialogList.nucleic_time.value = params.row.nucleic_time
                  }
                }
              }, '查看')
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
          isolation_state: 0,
          nucleic_result: '阴性',
          temperature: 36.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          state: '隔离中',
          grade: '中风险',
          area: '杭州市西湖区留下街道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          state: '隔离中',
          grade: '中风险',
          area: '杭州市西湖区留下街道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          state: '隔离中',
          grade: '高风险',
          area: '杭州市西湖区留下街道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          state: '隔离中',
          grade: '高风险',
          area: '杭州市西湖区留下街道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          state: '隔离中',
          grade: '高风险',
          area: '杭州市西湖区留下街道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          state: '隔离中',
          grade: '高风险',
          area: '杭州市西湖区留下街道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          state: '隔离中',
          grade: '高风险',
          area: '杭州市西湖区留下街道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          state: '隔离中',
          grade: '高风险',
          area: '杭州市西湖区留下街道'
        }
      ],
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        keyword: ''
      },
      total: 0
    }
  },
  methods: {
    // 获取风险人数列表
    getRiskPreInfoList() {
      GetRiskPreInfoList(this.queryInfo).then((res) => {
        console.log(res)
        console.log('获取风险人数列表')
      })
    },
    //  通过隔离状态查询
    queryListByState(state) {
      console.log(state)
    },
    // 关键字查询
    queryRiskPreByKey(e) {
      this.data = []
      this.queryInfo.keyword = e
      this.getRiskPreInfoList()
    },
    // 修改条件页码
    editPageNum(e) {
      this.queryInfo.pageNum = e
    },
    // 修改条件单页最大条数
    editPageSize(e) {
      this.queryInfo.pageSize = e
    }
  }
}
</script>

<style lang="less" scoped>
.modal-container {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  .modal-item {
    width: 50%;
    height: 40px;
    display: flex;
    align-items: center;
    .null {
      flex-basis: 10%;
    }
    .star {
      color: #ea2969;
      flex-basis: 10%;
      text-align: right;
      font-size: 18px;
      padding-right: 5px;
      height: 50%;
    }
    .title {
      flex-basis: 30%;
      text-align-last: justify;
      text-justify: distribute-all-lines;
      text-align: justify;
    }
    .core {
      flex-basis: 50%;
    }
  }
}
.search-module {
  width: 70%;
  display: flex;
  .search-left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2em;
    i {
      font-size: 2em;
      margin-right: 5px;
    }
  }
  .btn {
    margin-right: 2em;
  }
}
.table {
  margin-top: 2em;
}
</style>
