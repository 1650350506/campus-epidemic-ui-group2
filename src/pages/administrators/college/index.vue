<template>
  <div>
    <Card :bordered="false" class="card" style="margin-top: 0">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2>你好！ 管理员！</h2>
    </Card>
    <Card class="card card-marginTop">
      <Search></Search>
    </Card>
    <Card class="card card-marginTop">
      <Table border :columns="columns" :data="data" :border="false" class="table"></Table>
      <Page :total="100" show-elevator show-sizer class-name="page"></Page>
    </Card>
    <Modal
      v-model="dialogVisible"
      @on-ok="handleShow"
      @on-cancel="dialogVisible = false"
      class-name="vertical-center-modal"
      width="720"
    >
      <p slot="header" style="text-align: center">教职工基本信息</p>
      <div class="modal-container">
        <Row style="margin-bottom:1em">
          <Col :span="1"></Col>
          <Col :span="9" class="col-style"><div class="text">工号:</div>
            <div style="width: 180px">
              <div>{{dialogList.code}}</div>
            </div></Col>
          <Col :span="3"></Col>
          <Col :span="9" class="col-style"><div class="text">姓名:</div>
            <div style="width: 180px">
              <div>{{dialogList.name}}</div>
            </div>
          </Col>
        </Row>
        <Row style="margin-bottom:1em">
          <Col :span="1"></Col>
          <Col :span="9" class="col-style"><div class="text">年龄:</div>
            <div style="width: 180px">
              <div>{{dialogList.age}}</div>
            </div>
          </Col>
          <Col :span="3"></Col>
          <Col :span="9" class="col-style"><div class="text">性别:</div>
            <div style="width: 180px">
              <div>{{dialogList.sex ? '男': '女'}}</div>
            </div>
          </Col>
        </Row>
        <Row style="margin-bottom:1em">
          <Col :span="1">
          </Col>
          <Col :span="9" class="col-style"><div class="text">身份证:</div>
            <div style="width: 180px">
              <div>{{dialogList.id_card}}</div>
            </div>
          </Col>
          <Col :span="3"></Col>
          <Col :span="9" class="col-style"><div class="text">二级学院:</div>
            <div style="width: 180px">
              <div>{{dialogList.dept_code}}</div>
            </div></Col>
        </Row>
        <Row style="margin-bottom:1em">
          <Col :span="1"><i v-show="!isEdit">*</i></Col>
          <Col :span="9" class="col-style"><div class="text">手机号: </div>
            <div style="width: 180px">
              <Input   v-if="!isEdit" v-model="dialogList.phone"></Input>
              <div v-else>{{dialogList.phone}}</div>
            </div></Col>
          <Col :span="3"><i v-show="!isEdit">*</i></Col>
          <Col :span="9" class="col-style"><div class="text">当前职务: </div>
            <div style="width: 180px">
              <Input   v-if="!isEdit" v-model="dialogList.system_post"></Input>
              <div v-else>{{dialogList.system_post}}</div>
            </div></Col>
        </Row>
        <Row style="margin-bottom:1em">
          <Col :span="1"><i v-show="!isEdit">*</i></Col>
          <Col :span="9" class="col-style"><div class="text">校内职务: </div>
            <div style="width: 180px">
              <Input   v-if="!isEdit" v-model="dialogList.school_post"></Input>
              <div v-else>{{dialogList.school_post}}</div>
            </div></Col>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import Search from '@/components/top/search'
export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, Search
  },
  data() {
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '职工工号',
          key: 'code'
        },
        {
          title: '姓名',
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
                  // type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  border: '0px'
                },
                on: {
                  click: () => {
                    this.isEdit = false
                    this.dialogVisible = true
                    this.dialogList.code = params.row.code
                    this.dialogList.name = params.row.name
                    this.dialogList.age = params.row.age
                    this.dialogList.sex = params.row.sex
                    this.dialogList.phone = params.row.phone
                    this.dialogList.id_card = params.row.id_card
                    this.dialogList.dept_code = params.row.dept_code
                    this.dialogList.system_post = params.row.system_post
                    this.dialogList.school_post = params.row.school_post
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
                    this.isEdit = true
                    this.dialogVisible = true
                    this.dialogList.code = params.row.code
                    this.dialogList.name = params.row.name
                    this.dialogList.age = params.row.age
                    this.dialogList.sex = params.row.sex
                    this.dialogList.phone = params.row.phone
                    this.dialogList.id_card = params.row.id_card
                    this.dialogList.dept_code = params.row.dept_code
                    this.dialogList.system_post = params.row.system_post
                    this.dialogList.school_post = params.row.school_post
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  // type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  border: '0px'
                },
                on: {
                  // eslint-disable-next-line no-empty-function
                  click: () => {
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data: [
        {
          code: 199200118,
          name: '张三1',
          age: '18',
          sex: 1,
          id_card: '2131231231231',
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
          id_card: '2131231231231',
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
          id_card: '465466464',
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
      dialogVisible: false,
      dialogList: {
        code: '',
        name: '',
        age: '',
        sex: 0,
        phone: '',
        id_card: '',
        dept_code: '',
        system_post: '',
        school_post: ''
      },
      isEdit: false
    }
  },
  methods: {
    handleShow() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.modal-container {
  margin: 20px 0;
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
