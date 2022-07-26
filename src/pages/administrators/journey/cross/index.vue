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
      <Search :keyValue="queryInfo.keyword" @selectFun="queryStuInfoByKey"></Search>
    </Card>
    <Card class="card-marginTop card">
      <div class="table-box">
        <Table  :border="false" :columns="columns" :data="data" class="table"></Table>
      </div>
      <Page :total="total" show-elevator show-sizer class-name="page"  @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
    <Modal
      v-model="showDialogVisible"
      @on-cancel="showDialogVisible = false"
      width="720"
    >
      <p slot="header" style="text-align: center">学生基本信息</p>
      <div class="modal-container">
        <div class="modal-item"  v-for="(item, index) in dialogList" :key="index">
          <div class="null"></div><div class="star" style="{opacity: 0}"></div><div class="title" v-if="item">{{item.title}}：</div><div class="core">{{item.value}}</div>
        </div>
        <!--        <div v-show="dialogList.seven_goto.title === '近七天行程'" class="special">-->
        <!--          <div class="null"></div><div class="star" style="{opacity: 0}"></div><div class="title" v-if="dialogList.seven_goto">{{dialogList.seven_goto.title}}：</div><div class="core">{{dialogList.seven_goto.value}}</div>-->
        <!--        </div>-->
      </div>
      <div slot="footer">
        <Button @click="showDialogVisible = false" type="primary">关闭</Button>
      </div>
    </Modal>
    <Modal
      v-model="updateDialogVisible"
      @on-ok="handleUpdateStuInfo"
      @on-cancel="updateDialogVisible = false"
      width="720"
    >
      <p slot="header" style="text-align: center; font-size: 20px">学生基本信息</p>
      <div class="modal-container">
        <div class="modal-item" v-for="(item, index) in dialogList" :key="index">
          <div class="null"></div><div class="star"></div><div class="title" v-if="item">{{item.title}}：</div> <div class="core"> <Input v-if="item.isEdit" v-model="item.value"></Input><span v-else>{{item.value}}</span>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import Search from '@/components/top/search'
import {
  GetStuList, DeleteStuInfo
} from '@api/group/stuManage'
export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, Search
  },
  data() {
    return {
      selectModel: '默认',
      gradeList: [
        '默认', '只看中风险', '只看高风险'
      ],
      showDialogVisible: false,
      updateDialogVisible: false,
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
        idCard: {
          title: '身份证', value: '350311100010123456', isEdit: false
        },
        deptName: {
          title: '二级学院', value: '计算机学院', isEdit: false
        },
        className: {
          title: '班级', value: '计科19', isEdit: false
        },
        riskArea: {
          title: '风险地区', value: '', isEdit: false
        },
        riskLevel: {
          title: '风险等级', value: 0, isEdit: false
        },
        quarantine: {
          title: '隔离状态', value: '', isEdit: false
        },
        phoneNumber: {
          title: '手机号', value: '12345678900', isEdit: true
        },
        address: {
          title: '居住地址', value: '杭州市临安区联胜街道', isEdit: true
        },
        emergencyContact: {
          title: '联系人', value: 'die', isEdit: true
        },
        emergencyContactPhone: {
          title: '联系人电话', value: '12345467890', isEdit: true
        }
        // seven_goto: {
        //   title: '近七天行程', value: '杭州市上城区', isEdit: false
        // }
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
          title: '班级',
          key: 'className'
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
                  // type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  border: '0px'
                },
                on: {
                  click: () => {
                    this.updateDialogVisible = true
                    this.dialogList.code.value = params.row.code
                    this.dialogList.name.value = params.row.name
                    this.dialogList.sex.value = params.row.sex
                    this.dialogList.phoneNumber.value = params.row.phoneNumber
                    this.dialogList.idCard.value = params.row.idCard
                    this.dialogList.deptName.value = params.row.deptName
                    this.dialogList.className.value = params.row.className
                    this.dialogList.address.value = params.row.address
                    this.dialogList.emergencyContact.value = params.row.emergencyContact
                    this.dialogList.emergencyContactPhone.value = params.row.emergencyContactPhone
                    // this.dialogList.seven_goto.value = params.row.seven_goto
                    this.dialogList.address.isEdit = true
                    this.dialogList.phoneNumber.isEdit = true
                    this.dialogList.emergencyContact.isEdit = true
                    this.dialogList.emergencyContactPhone.isEdit = true
                  }
                }
              }, '编辑'),
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
                    this.dialogList.age.value = params.row.age
                    this.dialogList.sex.value = params.row.sex
                    this.dialogList.phone.value = params.row.phone
                    this.dialogList.id_card.value = params.row.id_card
                    this.dialogList.dept_code.value = params.row.dept_code
                    this.dialogList.class_name.value = params.row.class_name
                    this.dialogList.address.value = params.row.address
                    this.dialogList.emergencyContact.value = params.row.emergencyContact
                    this.dialogList.emergencyContactPhone.value = params.row.emergencyContactPhone
                    this.dialogList.address.isEdit = false
                    this.dialogList.phoneNumber.isEdit = false
                    this.dialogList.emergencyContact.isEdit = false
                    this.dialogList.emergencyContactPhone.isEdit = false
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
                      border: '0px'
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
</style>
