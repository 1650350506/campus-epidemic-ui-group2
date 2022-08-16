<template>
  <div  style="margin:84px 24px 0 24px">
    <Card :bordered="false" class="card" style="margin-top: 0">
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2 style="margin-top: 10px;">你好！ {{userInfo.roleName}}！</h2>
    </Card>
    <Card class="card card-marginTop">
      <div class="search-container">
        <div class="left-search">
          <Input  placeholder="请输入职工工号、职工姓名、二级学院" v-on:keyup.enter.native="queryEnter" style="width: 300px" v-model="queryInfo.key"></Input>
        </div>
        <div style="margin-right: 2em">
          <Select v-model="healthyModel" style="width:160px" @on-change="queryListByHealthy(healthyModel)" placeholder="按健康码颜色查询">
            <Option v-for="(item,index) in healthyList" :value="item.level" :key="index">{{ item.title }}</Option>
          </Select>
        </div>
        <Button type="primary" class="btn" @click="queryFacultyInfoByKey">查询</Button>
        <Button class="btn" @click="clearBtn">重置</Button>
      </div>
    </Card>
    <Card class="card card-marginTop">
      <Button type="primary" @click="addDialogVisible = true">+ 新增</Button>
      <div class="batch-box">
        <div class="select-text">已选择 <span style="color: #0e92e7; font-size: 18px">{{batchNum}}</span> 项</div>
        <Poptip
          confirm
          title="确定将这些防疫人员数据进行删除吗？"
          @on-ok="batchSubmit"
        >
          <div class="btn">批量删除</div>
        </Poptip>
      </div>
      <div class="table-box">
        <Table :columns="columns" :data="data" :border="false" class="table" ref="purchaseTable"
               @on-select="onSelectAll" @on-select-cancel='onSelectCancel'
               @on-select-all ='onSelectAll' @on-select-all-cancel='onSelectAllCancel'
        ></Table>
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
import checkModal from './checkModal'
import editModal from './editModal'
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
        key: '',
        color: null
      },
      healthyModel: '按健康码颜色查询',
      healthyList: [
        { level: null, title: '默认' },
        { level: 0, title: '绿码' },
        { level: 1, title: '黄码' },
        { level: 2, title: '红码' }
      ],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '职工工号',
          width: '160',
          align: 'left',
          key: 'code'
        },
        {
          title: '姓名',
          width: '120',
          align: 'left',
          key: 'name'
        },
        {
          title: '联系电话',
          align: 'left',
          key: 'phone'
        },
        {
          title: '当前职务',
          align: 'left',
          key: 'systemPost'
        },
        {
          title: '二级学院',
          align: 'left',
          key: 'secondCollage'
        },
        {
          title: '健康码颜色',
          key: 'color',
          render: (h, params) => {
            const actions = {
              0: ['success', '绿　码'],
              1: ['warning', '黄　码'],
              2: ['error', '红　码'],
              default: ['', '未提交']
            }
            const action = actions[params.row.color] || actions['default']
            const [types, typeName] = action
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
                    title: '确定将该防疫人员数据进行删除吗？'
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteFacultyInfoByCode(params.row.code)
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
      is_Edit: false,
      showDialogVisible: false,
      updateDialogVisible: false,
      addDialogVisible: false,
      deleteVisible: false,
      dialogList: {
        code: {
          title: '职工工号', value: '', isEdit: false
        },
        name: {
          title: '职工姓名', value: '', isEdit: false
        },
        sex: {
          title: '性别', value: '', isEdit: false
        },
        deptName: {
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
      batchList: [],
      msgList: [],
      selectedIds: new Set(),
      selectedData: [],
      arr1: [],
      arr2: []
    }
  },
  computed: {
    ...mapState('admin/account', ['userInfo'])
  },
  created() {
    this.getFacultyList()
  },
  methods: {
    clearBtn() {
      this.queryInfo.pageNum = 1
      this.queryInfo.pageSize = 10
      this.queryInfo.key = ''
      this.healthyModel = '按健康码颜色查询'
      this.queryInfo.color = null
      this.getFacultyList()
      this.batchNum = 0
    },
    batchSubmit() {
      this.batchList = []
      this.arr2.forEach((item) => {
        this.batchList.push(item.code)
      })
      BatchDeleteFacultyInfoByCodeList({ codes: this.batchList }).then(() => {
        this.$Message.success('批量删除防控人员成功!')
        this.queryInfo.key = ''
        this.arr1 = []
        this.arr2 = []
        this.batchNum = 0
        this.getFacultyList()
      })
    },
    close() {
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
      DeleteFacultyInfoByCode(data).then(() => {
        this.$Message.success('删除防控人员成功')
        this.getFacultyList()
      })
    },
    // 按健康吗颜色查询
    queryListByHealthy(healthyModel) {
      this.queryInfo.pageNum = 1
      this.queryInfo.color = healthyModel
      this.getFacultyList()
      this.batchNum = 0
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
        this.dialogList.sex.value = res.sex === 0 ? '男' : '女'
        this.dialogList.deptName.value = res.deptName
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
    queryEnter(e) {
      const keyCode = window.event ? e.keyCode : e.which
      if (keyCode === 13) {
        this.queryFacultyInfoByKey()
      }
    },
    //  关键字查询工作人员信息
    queryFacultyInfoByKey() {
      this.data = []
      this.queryInfo.pageNum = 1
      this.queryInfo.pageSize = 10
      this.getFacultyList()
    },
    onSelectAll(selection) {
      this.arr1 = [...selection, ...this.selectedData]
      for (const val of this.arr1) {
        if (!this.arr2.some(item => item.code === val.code)) {
          this.arr2.push(val)
        }
      }
      this.batchNum = this.arr2.length
    },
    // 取消选中某一项时触发
    onSelectCancel(row) {
      const result = this.arr2.findIndex((ele) => {
        return ele.code === row.code
      })
      this.arr2.splice(result, 1)
      this.batchNum = this.arr2.length
    },
    // 点击取消全选时触发
    onSelectAllCancel() {
      this.arr2 = this.arr2.filter(item => {
        return this.data.every(item2 => {
          return item.code !== item2.code
        })
      })
      this.batchNum = this.arr2.length
    },
    editPageNum(e) {
      this.queryInfo.pageNum = e
      GetFacultyInfo(this.queryInfo).then((res) => {
        res.data.forEach(item => {
          this.arr2.forEach(element => {
            if (element.code === item.code) {
              this.$set(item, '_checked', true)
            }
          })
        })
        this.total = res.total
        this.data = res.data
      })
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
::v-deep (.ivu-input) {
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
