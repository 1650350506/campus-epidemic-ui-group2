<template>
  <div>
    <Card :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2 class="bread-title">你好！ 疫情防控小组组长！</h2>
    </Card>
    <Card class="card">
      <div slot="extra">
        风险等级查询
        <Select v-model="selectModel" style="width:200px" @on-change="queryListByGrade(selectModel)">
          <Option v-for="item in gradeList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </div>
      <Search title="请输入学生学号、学生姓名、二级学院" :keyValue="queryInfo.keyword" @selectFun="queryStuInfoByKey"></Search>
    </Card>
    <Card class="card-marginTop card">
      <div class="batch-box">
        <div class="select-text">已选择 <span style="color: #0e92e7; font-size: 18px">{{batchNum}}</span> 项</div>
        <Button class="btn" @click="batchSubmit" size="small">删除</Button>
      </div>
      <div class="table-box">
        <Table  :border="false" :columns="columns" :data="data" class="table"></Table>
      </div>
      <Page :total="total" show-elevator show-sizer class-name="page"  @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
    <CheckModal :checkSwitch="showDialogVisible" :checkList1="checkList1" @switchCheck="closeCheck"></CheckModal>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import Search from '@/components/top/search'
import CheckModal from './checkModal'
import {
  GetStuList, DeleteStuInfo
} from '@api/group/stuManage'
export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, Search, CheckModal
  },
  data() {
    return {
      batchNum: 0,
      selectModel: '默认',
      gradeList: [
        '默认', '只看中风险', '只看高风险'
      ],
      showDialogVisible: false,
      checkList1: {
        code: {
          title: '学号', value: ''
        },
        name: {
          title: '姓名', value: ''
        },
        sex: {
          title: '性别', value: 0
        },
        idCard: {
          title: '身份证', value: ''
        },
        deptName: {
          title: '二级学院', value: ''
        },
        className: {
          title: '班级', value: ''
        },
        phoneNumber: {
          title: '手机号', value: ''
        },
        address: {
          title: '居住地址', value: ''
        },
        emergencyContact: {
          title: '联系人', value: ''
        },
        emergencyContactPhone: {
          title: '联系人电话', value: ''
        }
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '学生学号',
          key: 'code'
        },
        {
          title: '学生姓名',
          key: 'name'
        },
        {
          title: '二级学院',
          key: 'deptName'
        },
        {
          title: '离校时间',
          align: 'center',
          key: 'leaveTime',
          render: (h, params) => {
            let timeName
            if (params.row.leaveTime === null) {
              timeName = '------'
            } else {
              timeName = params.row.leaveTime
            }
            return h('div', [timeName])
          }
        },
        {
          title: '风险地区等级',
          key: 'riskLevel',
          sortable: true,
          align: 'center',
          render: (h, params) => {
            let types
            let typeName
            if (params.row.riskLevel === 0) {
              types = 'success'
              typeName = '低风险'
            } else if (params.row.riskLevel === 1) {
              types = 'warning'
              typeName = '中风险'
            } else if (params.row.riskLevel === 2) {
              types = 'error'
              typeName = '高风险'
            }
            return h('div', [
              h('Button', {
                props: {
                  type: types,
                  size: 'small'
                },
                style: {
                  padding: '0 10px'
                },
                on: {
                  // eslint-disable-next-line no-empty-function
                  click: () => {
                  }
                }
              }, typeName)])
          }
        },
        {
          title: '风险地区',
          key: 'riskArea',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
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
                  border: '0px',
                  color: '#01b0ff',
                  background: 'transparent'
                },
                on: {
                  click: () => {
                    this.showDialogVisible = true
                    this.checkList1.code.value = params.row.code
                    this.checkList1.name.value = params.row.name
                    this.checkList1.sex.value = params.row.sex
                    this.checkList1.phoneNumber.value = params.row.phoneNumber
                    this.checkList1.idCard.value = params.row.idCard
                    this.checkList1.deptName.value = params.row.deptName
                    this.checkList1.className.value = params.row.className
                    this.checkList1.address.value = params.row.address
                    this.checkList1.emergencyContact.value = params.row.emergencyContact
                    this.checkList1.emergencyContactPhone.value = params.row.emergencyContactPhone
                  }
                }
              }, '查看'),
              [
                h('Poptip', {
                  props: {
                    placement: 'top-start',
                    confirm: true,
                    transfer: true,
                    title: '确定删除这条数据吗？'
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteStuInfoByCode(params.row.code)
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
                      title: '删除'
                    },
                    style: {
                      marginRight: '5px',
                      border: '0px',
                      color: '#01b0ff',
                      background: 'transparent'
                    },
                    on: {
                    }
                  }, '删除')
                ])
              ]
            ])
          }
        }
      ],
      data: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        keyword: '',
        riskLevel: ''
      },
      total: 0
    }
  },
  created() {
    this.getStuList()
  },
  methods: {
    // 查看对话框开关
    closeCheck() {
      this.showDialogVisible = false
    },
    closeEdit() {
      this.updateDialogVisible = false
    },
    handleUpdateStuInfo() {
      console.log('用户更新')
    },
    // 通过学生学号删除
    deleteStuInfoByCode(code) {
      DeleteStuInfo({ code: code }).then((res) => {
        this.$Message.success('删除成功！')
        this.getStuList()
      })
    },
    // 通过等级查询
    queryListByGrade(grade) {
      if (grade === '默认') {
        this.queryInfo.riskLevel = ''
      } else if (grade === '只看中风险') {
        this.queryInfo.riskLevel = '1'
      } else if (grade === '只看高风险') {
        this.queryInfo.riskLevel = '2'
      }
      this.getStuList()
      console.log(grade)
    },
    // 获得学生基本信息
    getStuList() {
      GetStuList(this.queryInfo).then((res) => {
        console.log(1)
        console.log(res.data)
        this.data = res.data
        this.total = res.total
      })
    },
    // 关键字查询
    queryStuInfoByKey(e) {
      this.data = []
      this.queryInfo.keyword = e
      this.getStuList()
    },
    // 选择页码
    editPageNum(e) {
      this.queryInfo.pageNum = e
      this.getStuList()
    },
    // 选择当页最大条数
    editPageSize(e) {
      this.queryInfo.pageSize = e
      this.getStuList()
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
    margin: 5px 0;
    font-size: 16px;
    align-items: center;
    .null {
      flex-basis: 5%;
    }
    .star {
      color: #ea2969;
      //flex-basis: 10%;
      text-align: right;
      font-size: 18px;
      padding-right: 5px;
      height: 50%;
    }
    .title {
      color: #544b4b;
      flex-basis: 30%;
      text-align-last: justify;
      text-justify: distribute-all-lines;
      text-align: justify;
    }
    .core {
      color: #000000;
      flex-basis: 55%;
    }
  }
}
::v-deep .ivu-input {
  font-size: 16px;
  color: #000;
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
.special {
  margin-top: 1em;
  flex-basis: 100%;
  height: 100px;
  display: flex;
  //align-items: center;
  .null {
    flex-basis: 2%;
  }
  .star {
    //color: #ea2969;
    //flex-basis: 5%;
    text-align: right;
    font-size: 18px;
    padding-right: 5px;
    line-height: 30px;
  }
  .title {
    flex-basis: 15%;
    color: #544b4b;
    text-align-last: justify;
    text-justify: distribute-all-lines;
    text-align: justify;
  }
  .core {
    color: #000000;
    flex-basis: 64%;
    height: 90px;
    //border: 1px solid #5c6b77;
  }
}
.batch-box {
  border: 1px solid #afd0ee;
  background: #E6F7FF;
  margin: 10px 0;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  .select-text {
    margin-left: 1.2vw;
  }
  .btn {
    margin-left: 1vw;
    background: transparent;
    border: 0;
    color: #1e93ff;
  }
}
</style>
