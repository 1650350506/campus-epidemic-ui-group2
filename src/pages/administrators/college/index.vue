<template>
  <div  style="margin:84px 24px 0 24px">
    <Card :bordered="false" class="card" style="margin-top: 0">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2 style="margin-top: 10px;">你好！ {{userInfo.roleName}}！</h2>
    </Card>
    <Card class="card card-marginTop">
      <div class="search-container">
        <div class="left-search">
          <i class="ivu-icon ivu-icon-ios-search"></i>
          <Input  placeholder="请输入职工工号、职工姓名、二级学院" style="width: 340px" v-model="queryInfo.key"></Input>
        </div>
        <div style="margin-right: 2em">
          <Select v-model="healthyModel" style="width:200px" @on-change="queryListByHealthy(healthyModel)" placeholder="按分险等级查询">
            <Option v-for="(item,index) in healthyList" :value="item" :key="index">{{ item }}</Option>
          </Select>
        </div>
        <Button type="primary" class="btn" @click="queryFacultyInfoByKey">查询</Button>
        <Button class="btn" @click="queryInfo.key = ''">重置</Button>
      </div>
    </Card>
    <Card class="card card-marginTop">
      <Button type="primary" @click="addDialogVisible = true">+ 新增</Button>
      <div class="batch-box">
        <div class="select-text">已选择 <span style="color: #0e92e7; font-size: 18px">{{batchNum}}</span> 项</div>
        <Poptip
          confirm
          title="您确认批量删除这些数据吗？"
          @on-ok="batchSubmit"
        >
          <div class="btn">批量删除</div>
        </Poptip>
      </div>
      <div class="table-box">
        <Table :columns="columns" :data="data" :border="false" class="table" @on-selection-change="selectItem"></Table>
      </div>
      <Page :total="total"  show-elevator show-sizer class-name="page" :page-size="queryInfo.pageSize" :current="queryInfo.pageNum"  @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
    <check-modal :display="showDialogVisible" :checkList1="dialogList" @displayClose="closeCheck" :msgList="msgList"></check-modal>
    <edit-modal :editSwitch="updateDialogVisible" :editList1="dialogList" @editClose="closeEdit"></edit-modal>
    <add-faculty :showSwitch="addDialogVisible" @switchAdd="close"></add-faculty>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import addFaculty from './addModal'
import checkModal from './check'
import editModal from './edit'
import { DeleteFacultyInfoByCode, GetFacultyInfo, GetFacultyInfoByCode, BatchDeleteFacultyInfoByCodeList } from '@api/administorators/manage'
import { mapState } from 'vuex'

export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, addFaculty, checkModal, editModal
  },
  data() {
    return {
      batchNum: 0,
      total: 0,
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        key: ''
      },
      healthyModel: '按健康码颜色查询',
      healthyList: ['默认', '绿码', '黄码', '红码'],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '职工工号',
          width: '160',
          align: 'center',
          key: 'code'
        },
        {
          title: '姓名',
          width: '120',
          align: 'center',
          key: 'name'
        },
        {
          title: '联系电话',
          key: 'phone'
        },
        {
          title: '当前职务',
          key: 'systemPost'
        },
        {
          title: '二级学院',
          key: 'secondCollage'
        },
        {
          title: '健康吗颜色',
          key: 'color',
          render: (h, params) => {
            let types = ''
            let typeName = ''
            console.log(params.row)
            if (params.row.color === 0) {
              types = 'success'
              typeName = '绿码'
            } else if (params.row.color === 1) {
              types = 'warning'
              typeName = '黄码'
            } else if (params.row.color === 2) {
              types = 'error'
              typeName = '红码'
            } else {
              types = 'text'
              typeName = '------'
            }
            return h('div', [
              h('Button', {
                props: {
                  type: types
                },
                style: {
                },
                on: {
                }
              }, typeName)
            ])
          }
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
                  size: 'small'
                },
                style: {
                  color: '#01b0ff',
                  marginRight: '5px',
                  border: '0px',
                  background: 'transparent'
                },
                on: {
                  click: () => {
                    this.getFacultyInfoByCode(params.row.code)
                    this.updateDialogVisible = true
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  // type: 'success',
                  size: 'small'
                },
                style: {
                  color: '#01b0ff',
                  marginRight: '5px',
                  border: '0px',
                  background: 'transparent'
                },
                on: {
                  click: () => {
                    this.getFacultyInfoByCode(params.row.code)
                    this.showDialogVisible = true
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
                      this.deleteFacultyInfoByCode(params.row.code)
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
                      color: '#01b0ff',
                      marginRight: '5px',
                      border: '0px',
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
      //  对话框显示
      is_Edit: false,
      showDialogVisible: false,
      updateDialogVisible: false,
      addDialogVisible: false,
      deleteVisible: false,
      dialogList: {
        code: {
          title: '工号', value: '', isEdit: false
        },
        name: {
          title: '姓名', value: '', isEdit: false
        },
        sex: {
          title: '性别', value: '', isEdit: false
        },
        idCard: {
          title: '身份证', value: '', isEdit: false
        },
        deptCode: {
          title: '二级学院', value: '', isEdit: false
        },
        phone: {
          title: '手机号', value: '', isEdit: true
        },
        systemPost: {
          title: '当前职务', value: '', isEdit: true
        },
        schoolPost: {
          title: '校内职务', value: '', isEdit: true
        }
      },
      addDialogList: {
        account: '',
        deptId: 1548935972324904988,
        pwd: '',
        name: '',
        mobile: '',
        resetPad: false,
        roles: [1547742937243193372],
        selfAccount: false,
        switchUser: false
      },
      batchList: [],
      msgList: []
    }
  },
  computed: {
    ...mapState('admin/account', ['userInfo'])
  },
  created() {
    this.getFacultyList()
  },
  methods: {
    batchSubmit() {
      BatchDeleteFacultyInfoByCodeList({ codes: this.batchList }).then(() => {
        this.$Message.success('批量删除防控人员成功')
        this.getFacultyList()
      })
    },
    close(e) {
      this.addDialogVisible = false
    },
    closeCheck() {
      this.showDialogVisible = false
    },
    closeEdit() {
      this.updateDialogVisible = false
    },
    //  删除工作人员信息
    deleteFacultyInfoByCode(code) {
      const data = { code: code }
      DeleteFacultyInfoByCode(data).then(res => {
        this.$Message.success('删除防控人员成功')
        this.getFacultyList()
      })
    },
    // 按健康吗颜色查询
    queryListByHealthy(healthyModel) {
      if (healthyModel === '默认') {
        this.queryInfo.healthyColor = null
      } else if (healthyModel === '绿码') {
        this.queryInfo.healthyColor = 0
      } else if (healthyModel === '黄码') {
        this.queryInfo.healthyColor = 1
      } else if (healthyModel === '红码') {
        this.queryInfo.healthyColor = 2
      }
      console.log(this.queryInfo.healthy_color)
    },
    // 查询工作人员列表
    getFacultyList() {
      GetFacultyInfo(this.queryInfo).then((res) => {
        this.total = res.total
        this.data = res.data
      })
    },
    // 查询信息信息
    getFacultyInfoByCode(code) {
      GetFacultyInfoByCode({ code: code }).then(res => {
        this.dialogList.code.value = res.code
        this.dialogList.name.value = res.name
        if (res.sex === 0) {
          this.dialogList.sex.value = '男'
        } else if (res.sex === 1) {
          this.dialogList.sex.value = '女'
        }
        this.dialogList.idCard.value = res.idCard
        this.dialogList.deptCode.value = res.deptCode
        this.dialogList.phone.value = res.phone
        this.dialogList.systemPost.value = res.systemPost
        this.dialogList.schoolPost.value = res.schoolPost
        this.msgList = []
        res.recordVOList.forEach(item => {
          this.msgList.push({
            color: item.color,
            endTime: item.endTime,
            startTime: item.startTime
          })
        })
      })
    },
    //  关键字查询工作人员信息
    queryFacultyInfoByKey(e) {
      this.data = []
      this.queryInfo.pageNum = 1
      this.queryInfo.pageSize = 10
      this.getFacultyList()
    },
    selectItem(e) {
      this.batchList = []
      e.forEach((item, index) => {
        console.log(item)
        this.batchList.push(item.code)
      })
      this.batchNum = this.batchList.length
    },
    editPageNum(e) {
      this.queryInfo.pageNum = e
      this.getFacultyList()
    },
    editPageSize(e) {
      this.queryInfo.pageSize = e
      this.getFacultyList()
    }
  }
}
</script>

<style lang="less" scoped>
.col-style {
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: space-between;

}
::v-deep .ivu-input {
  font-size: 16px;
  color: #000;
}
.text {
  flex-basis: 25%;
  text-align: right;
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
    cursor: pointer;
    margin-left: 1vw;
    background: transparent;
    border: 0;
    color: #1e93ff;
  }
}
.search-container {
  display: flex;
  border: 0;
  .left-search {
    display: flex;
    align-items: center;
    margin-right: 2em;
    i {
      font-size: 2em;
    }
  }
  .btn {
    margin-right: 2em;
  }
}
</style>
