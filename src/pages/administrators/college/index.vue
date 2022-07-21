<template>
  <div>
    <Card :bordered="false" class="card" style="margin-top: 0">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2>你好！ 管理员！</h2>
    </Card>
    <Card class="card card-marginTop">
      <Search :keyValue="queryInfo.keyword" @selectFun="queryFacultyInfoByKey"></Search>
    </Card>
    <Card class="card card-marginTop">
      <Table border :columns="columns" :data="data" :border="false" class="table"></Table>
      <Page :total="200" show-elevator show-sizer class-name="page" :page-size="queryInfo.pageSize" :current="queryInfo.pageNum" @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
    <Modal
      v-model="updateDialogVisible"
      @on-ok="handleUpdateUserInfo"
      @on-cancel="updateDialogVisible = false"
      class-name="vertical-center-modal"
      width="720"
    >
      <p slot="header" style="text-align: center; font-size: 20px">工作人员基本信息</p>
      <div class="modal-container">
        <div class="modal-item"v-for="(item, index) in dialogList" :key="index">
          <div class="null"></div><div class="star" :style="item.isEdit ? {}: {opacity: 0}"></div><div class="title">{{item.title}}：</div>
          <div class="core"> <Input v-if="item.isEdit" v-model="item.value" style="font-size: 18px"></Input><span v-else>{{item.value}}</span>
          </div>
        </div>
      </div>
    </Modal>
    <Modal
      v-model="showDialogVisible"
      @on-cancel="showDialogVisible = false"
      width="720"
    >
      <p slot="header" style="text-align: center;font-size: 20px">工作人员基本信息</p>
      <div class="modal-container">
        <div class="modal-item"v-for="(item, index) in dialogList" :key="index">
          <div class="null"></div><div class="star" :style="item.isEdit ? {}: {opacity: 0}"></div><div class="title">{{item.title}}：</div><div class="core">{{item.value}}</div>
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
import { DeleteFacultyInfoByCode, GetFacultyInfo } from '@api/administorators/manage'
export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, Search
  },
  data() {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        keyword: ''
      },
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
                  border: '0px'
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
                  border: '0px'
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
      data: [
        {
          code: 199200118,
          name: '张三1',
          sex: 1,
          id_card: '2131231231231',
          phone: '123123213',
          system_post: '防疫小组组长',
          school_post: '校长',
          dept_code: '计算机学院'
        },
        {
          code: 199218,
          name: '张三2',
          age: '18',
          sex: 1,
          id_card: '2131231231231',
          phone: '123123213',
          system_post: '防疫小组组长',
          school_post: '校长',
          dept_code: '计算机学院'
        },
        {
          code: 118,
          name: '张三5',
          age: '18',
          sex: 1,
          id_card: '465466464',
          phone: '123123213',
          system_post: '防疫小组组长',
          school_post: '校长',
          dept_code: '计算机学院'
        },
        {
          code: 199118,
          name: '张三3',
          age: '18',
          sex: 1,
          id_card: '4564645645',
          phone: '123123213',
          system_post: '防疫小组组长',
          school_post: '校长',
          dept_code: '计算机学院'
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
      deleteVisible: false,
      dialogList: {
        code: {
          title: '工号', value: '', isEdit: false
        },
        name: {
          title: '姓名', value: '', isEdit: false
        },
        sex: {
          title: '性别', value: 0, isEdit: false
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
      }
    }
  },
  methods: {
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
    // 查询工作人员列表
    getFacultyList() {
      GetFacultyInfo.then((res) => {
        console.log(res)
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
.modal-container {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  .modal-item {
    width: 50%;
    margin: 5px 0;
    font-size: 18px;
    height: 40px;
    display: flex;
    align-items: center;
    .null {
      flex-basis: 10%;
    }
    .star {
      flex-basis: 10%;
      text-align: right;
      font-size: 18px;
      color: #be1f19;
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
::v-deep .ivu-input {
  font-size: 18px;
  color: #000;
}
.col-style {
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: space-between;

}
.text {
  flex-basis: 25%;
  text-align-last: justify;
  text-justify: distribute-all-lines;
  text-align: justify;
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
</style>
