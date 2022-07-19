<template>
  <div>
    <Card :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2>你好！ 疫情防控小组组长！</h2>
    </Card>
    <Card class="card-marginTop card">
      <div slot="extra">
        <Select v-model="selectModel" style="width:200px" :change="queryListByGrade(selectModel)">
          <Option v-for="item in gradeList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </div>
      <Search></Search>
      <Table  border :columns="columns" :data="data" :border="false" class="table"></Table>
      <Page :total="100" show-elevator show-sizer class-name="page"></Page>
    </Card>
    <Modal
      v-model="showDialogVisible"
      @on-cancel="showDialogVisible = false"
      width="720"
    >
      <p slot="header" style="text-align: center">学生基本信息</p>
      <div class="modal-container">
        <div class="modal-item" v-show="item.title !== '近七天行程'" v-for="(item, index) in dialogList" :key="index">
          <div class="null"></div><div class="star" style="{opacity: 0}"></div><div class="title" v-if="item">{{item.title}}：</div><div class="core">{{item.value}}</div>
        </div>
        <div v-show="dialogList.seven_goto.title === '近七天行程'" class="special">
          <div class="null"></div><div class="star" style="{opacity: 0}"></div><div class="title" v-if="dialogList.seven_goto">{{dialogList.seven_goto.title}}：</div><div class="core">{{dialogList.seven_goto.value}}</div>
        </div>
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
      <p slot="header" style="text-align: center">学生基本信息</p>
      <div class="modal-container">
        <div class="modal-item" v-show="item.title !== '近七天行程'" v-for="(item, index) in dialogList" :key="index">
          <div class="null"></div><div class="star"></div><div class="title" v-if="item">{{item.title}}：</div> <div class="core"> <Input v-if="item.isEdit" v-model="item.value"></Input><span v-else>{{item.value}}</span>
          </div>
        </div>
        <div v-show="dialogList.seven_goto.title === '近七天行程'" class="special">
          <div class="null"></div><div class="star"></div><div class="title" v-if="dialogList.seven_goto">{{dialogList.seven_goto.title}}：</div><div class="core">{{dialogList.seven_goto.value}}</div>
        </div>
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
        id_card: {
          title: '身份证', value: '350311100010123456', isEdit: false
        },
        dept_code: {
          title: '二级学院', value: '计算机学院', isEdit: false
        },
        class_name: {
          title: '班级', value: '计科19', isEdit: false
        },
        phone: {
          title: '手机号', value: '12345678900', isEdit: true
        },
        address: {
          title: '居住地址', value: '杭州市临安区联胜街道', isEdit: true
        },
        contact: {
          title: '联系人', value: 'die', isEdit: true
        },
        contact_phone: {
          title: '联系人电话', value: '12345467890', isEdit: true
        },
        seven_goto: {
          title: '近七天行程', value: '杭州市上城区', isEdit: false
        }
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '学号',
          key: 'code'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '班级',
          key: 'class_name'
        },
        {
          title: '隔离状态',
          key: 'state'
        },
        {
          title: '风险地区等级',
          key: 'grade',
          render: (h, params) => {
            let types
            if (params.row.grade === 1) {
              types = 'error'
            } else if (params.row.grade === 2) {
              types = 'warning'
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
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, params.row.grade ? '中风险' : '高风险')])
          }
        },
        {
          title: '风险地区',
          key: 'area',
          align: 'center',
          width: 200
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
                    this.updateDialogVisible = true
                    this.dialogList.code.value = params.row.code
                    this.dialogList.name.value = params.row.name
                    this.dialogList.sex.value = params.row.sex
                    this.dialogList.phone.value = params.row.phone
                    this.dialogList.id_card.value = params.row.id_card
                    this.dialogList.dept_code.value = params.row.dept_code
                    this.dialogList.class_name.value = params.row.class_name
                    this.dialogList.address.value = params.row.address
                    this.dialogList.contact.value = params.row.contact
                    this.dialogList.contact_phone.value = params.row.contact_phone
                    this.dialogList.seven_goto.value = params.row.seven_goto
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
                    this.dialogList.contact.value = params.row.contact
                    this.dialogList.contact_phone.value = params.row.contact_phone
                    this.dialogList.seven_goto.value = params.row.seven_goto
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
                      console.log(params.row)
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
      data: [
        {
          code: '199200118',
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198291011',
          grade: 1,
          area: '杭州市西湖区留下街道',
          address: '杭州市西湖区留下街道',
          id_card: '11111111111',
          contact: 'die',
          contact_phone: '2222222222',
          seven_goto: '杭州市西湖区留下街道杭州市西湖区留下街道'
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
      ]
    }
  },
  methods: {
    handleUpdateStuInfo() {
      console.log('用户更新')
    },
    // 通过等级查询
    queryListByGrade(grade) {
      console.log(grade)
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
.special {
  margin-top: 1em;
  flex-basis: 100%;
  height: 100px;
  display: flex;
  //align-items: center;
  .null {
    flex-basis: 5%;
  }
  .star {
    color: #ea2969;
    flex-basis: 5%;
    text-align: right;
    font-size: 18px;
    padding-right: 5px;
    line-height: 30px;
  }
  .title {
    flex-basis: 15%;
    text-align-last: justify;
    text-justify: distribute-all-lines;
    text-align: justify;
  }
  .core {
    flex-basis: 64%;
    height: 90px;
    //border: 1px solid #5c6b77;
  }
}
</style>
