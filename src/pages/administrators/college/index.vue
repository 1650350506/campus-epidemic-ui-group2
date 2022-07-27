<template>
  <div>
    <Card :bordered="false" class="card" style="margin-top: 0">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2 class="bread-title">你好！ 管理员！</h2>
    </Card>
    <Card class="card card-marginTop">
      <Search title="请输入职工工号、职工姓名、二级学院" :keyValue="queryInfo.keyword" @selectFun="queryFacultyInfoByKey"></Search>
      <div slot="extra">
        查询健康码颜色
        <Select v-model="healthyModel" style="width:200px" @on-change="queryListByHealthy(healthyModel)">
          <Option v-for="item in healthyList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </div>
    </Card>
    <Card class="card card-marginTop">
      <Button type="primary" @click="addDialogVisible = true">+ 新增</Button>
      <div class="batch-box">
        <div class="select-text">已选择 <span style="color: #0e92e7; font-size: 18px">{{batchNum}}</span> 项</div>
        <Button class="btn" @click="batchSubmit" size="small">批量提交</Button>
      </div>
      <div class="table-box">
        <Table :columns="columns" :data="data" :border="false" class="table"></Table>
      </div>
      <Page :total="200" show-elevator show-sizer class-name="page" :page-size="queryInfo.pageSize" :current="queryInfo.pageNum" @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
    <!--    <Modal-->
    <!--      v-model="updateDialogVisible"-->
    <!--      @on-ok="handleUpdateUserInfo"-->
    <!--      @on-cancel="updateDialogVisible = false"-->
    <!--      class-name="vertical-center-modal"-->
    <!--      width="720"-->
    <!--    >-->
    <!--      <p slot="header" style="text-align: center; font-size: 20px">教职工基本信息</p>-->
    <!--      <div class="modal-container">-->
    <!--        <div class="modal-item" v-for="(item, index) in dialogList" :key="index">-->
    <!--          <div class="null"></div><div class="star" :style="item.isEdit ? {}: {opacity: 0}"></div><div class="title">{{item.title}}：</div>-->
    <!--          <div class="core"> <Input v-if="item.isEdit" v-model="item.value" style="font-size: 18px"></Input><span v-else-if="item.isEdit&&item.title==='性别'">{{item.value ? '女': '男'}}</span><span v-else>{{item.value}}</span>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </Modal>-->
    <check-modal :display="showDialogVisible" :checkList1="dialogList" @displayClose="closeCheck"></check-modal>
    <edit-modal :editSwitch="updateDialogVisible" :editList1="dialogList" @editClose="closeEdit"></edit-modal>
    <add-faculty :showSwitch="addDialogVisible" @switchAdd="close"></add-faculty>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import Search from '@/components/top/search'
import addFaculty from './addModal'
import checkModal from './check'
import editModal from './edit'
import { DeleteFacultyInfoByCode, GetFacultyInfo } from '@api/administorators/manage'
export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, Search, addFaculty, checkModal, editModal
  },
  data() {
    return {
      batchNum: 0,
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        keyword: '',
        healthy_color: null
      },
      healthyModel: '默认',
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
          key: 'code'
        },
        {
          title: '姓名',
          width: '120',
          key: 'name'
        },
        {
          title: '联系电话',
          key: 'phone'
        },
        {
          title: '当前职务',
          key: 'system_post'
        },
        {
          title: '二级学院',
          key: 'dept_code'
        },
        {
          title: '健康吗颜色',
          key: 'healthy_color',
          render: (h, params) => {
            let types
            let typeName
            if (params.row.healthy_color === '绿码') {
              types = 'success'
              typeName = '绿码'
            } else if (params.row.healthy_color === '黄码') {
              types = 'warning'
              typeName = '黄码'
            } else if (params.row.healthy_color === '红码') {
              types = 'error'
              typeName = '红码'
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
                    this.updateDialogVisible = true
                    this.dialogList.code.value = params.row.code
                    this.dialogList.name.value = params.row.name
                    this.dialogList.sex.value = params.row.sex
                    this.dialogList.phone.value = params.row.phone
                    this.dialogList.id_card.value = params.row.id_card
                    this.dialogList.dept_code.value = params.row.dept_code
                    this.dialogList.system_post.value = params.row.system_post
                    this.dialogList.school_post.value = params.row.school_post
                    // this.dialogList.enter_time.value = params.row.enter_time
                    // this.dialogList.leave_time.value = params.row.leave_time
                    // this.dialogList.healthy_color.value = params.row.healthy_color
                    this.dialogList.phone.isEdit = true
                    this.dialogList.system_post.isEdit = true
                    this.dialogList.school_post.isEdit = true
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
                    this.showDialogVisible = true
                    this.dialogList.code.value = params.row.code
                    this.dialogList.name.value = params.row.name
                    this.dialogList.sex.value = params.row.sex
                    this.dialogList.phone.value = params.row.phone
                    this.dialogList.id_card.value = params.row.id_card
                    this.dialogList.dept_code.value = params.row.dept_code
                    this.dialogList.system_post.value = params.row.system_post
                    this.dialogList.school_post.value = params.row.school_post
                    // this.dialogList.enter_time.value = params.row.enter_time
                    // this.dialogList.leave_time.value = params.row.leave_time
                    // this.dialogList.healthy_color.value = params.row.healthy_color
                    this.dialogList.phone.isEdit = false
                    this.dialogList.system_post.isEdit = false
                    this.dialogList.school_post.isEdit = false
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
      data: [
        {
          code: 199200118,
          name: '张三1',
          sex: '男',
          id_card: '2131231231231',
          phone: '123123213',
          system_post: '防疫小组组长',
          school_post: '校长',
          dept_code: '计算机学院',
          enter_time: '2022-05-02',
          leave_time: '2022-04-11',
          healthy_color: '红码'
        },
        {
          code: 199200118,
          name: '张三1',
          sex: 1,
          id_card: '2131231231231',
          phone: '123123213',
          system_post: '防疫小组组长',
          school_post: '校长',
          dept_code: '计算机学院',
          enter_time: '2022-05-02',
          leave_time: '2022-04-11',
          healthy_color: 0
        },
        {
          code: 199200118,
          name: '张三1',
          sex: 1,
          id_card: '2131231231231',
          phone: '123123213',
          system_post: '防疫小组组长',
          school_post: '校长',
          dept_code: '计算机学院',
          enter_time: '2022-05-02',
          leave_time: '2022-04-11',
          healthy_color: 2
        },
        {
          code: 199200118,
          name: '张三1',
          age: '18',
          sex: 1,
          id_card: '12312312',
          phone: '123123213',
          system_post: '防疫小组组长',
          school_post: '校长',
          dept_code: '计算机学院'
        }
      ],
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
        id_card: {
          title: '身份证', value: '', isEdit: false
        },
        dept_code: {
          title: '二级学院', value: '', isEdit: false
        },
        phone: {
          title: '手机号', value: '', isEdit: true
        },
        system_post: {
          title: '当前职务', value: '', isEdit: true
        },
        school_post: {
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
      }
    }
  },
  methods: {
    close(e) {
      this.addDialogVisible = false
    },
    closeCheck() {
      this.showDialogVisible = false
    },
    closeEdit() {
      this.updateDialogVisible = false
    },
    handleUpdateUserInfo() {
      this.dialogVisible = false
      const results = {
        code: this.dialogList.code.value,
        phone: this.dialogList.phone.value,
        system_post: this.dialogList.system_post.value,
        school_post: this.dialogList.school_post.value
      }
      console.log(results)
    },
    //  删除工作人员信息
    deleteFacultyInfoByCode(code) {
      DeleteFacultyInfoByCode({ code: code }).then(res => {
        console.log(res)
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
      GetFacultyInfo.then((res) => {
        console.log(res)
        /* 这里把数据里面的性别和健康码颜色都文字化 */
      })
    },
    //  关键字查询工作人员信息
    queryFacultyInfoByKey(e) {
      this.data = []
      this.queryInfo.keyword = e
    },
    editPageNum(e) {
      this.queryInfo.pageNum = e
    },
    editPageSize(e) {
      this.queryInfo.pageSize = e
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
i {
  font-size: 18px;
  position: absolute;
  right: 0;
  top: 60%;
  color: #e01717;
  line-height: 21px;
  text-align: right;
  transform: translate(-50%, -50%);
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
