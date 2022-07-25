<template>
  <div>
    <Card :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2>你好！ {{接口数据}}疫情防控小组组长！</h2>
    </Card>
    <Card class="card-marginTop card">
      <Search :keyValue="queryInfo.keyword" @selectFun="queryOutRecordByKey"></Search>
    </Card>
    <Card class="card-marginTop card">
      <Table   :columns="columns" :data="data" :border="false" class="table"></Table>
      <Page :total="total" show-elevator show-sizer class-name="page" @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
    <Modal
      v-model="showDialogVisible"
      @on-cancel="showDialogVisible = false"
      width="720"
    >
      <p slot="header" style="text-align: center">学生外出基本信息</p>
      <div class="modal-container">
        <div class="modal-item" v-show="item.title !== '途经地点'" v-for="(item, index) in dialogList" :key="index">
          <div class="null"></div><div class="star" :style="item.isEdit ? {}: {opacity: 0}">*</div><div class="title" v-if="item">{{item.title}}：</div><div class="core">{{item.value}}</div>
        </div>
        <div v-show="dialogList.seven_goto.title === '途经地点'" class="special">
          <div class="null"></div><div class="star" :style="dialogList.seven_goto.isEdit ? {}: {opacity: 0}">*</div><div class="title" v-if="dialogList.seven_goto">{{dialogList.seven_goto.title}}：</div><div class="core">{{dialogList.seven_goto.value}}</div>
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
import { GetOutRecordList } from '@api/group/outRecord'
export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, Search
  },
  data() {
    return {
      selectModel: '默认',
      gradeList: [
        '默认', '只看地风险', '只看中风险', '只看高风险'
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
          title: '手机号', value: 'die', isEdit: false
        },
        leave: {
          title: '离校时间', value: '2022-05-04', isEdit: false
        },
        back: {
          title: '返校时间', value: '2022-05-04', isEdit: false
        },
        area: {
          title: '去向', value: '杭州市临安区', isEdit: false
        },
        seven_goto: {
          title: '途经地点', value: '杭州市上城区', isEdit: false
        }
      },
      columns: [
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
          key: 'class'
        },
        {
          title: '离校时间',
          key: 'leave'
        },
        {
          title: '返校时间',
          key: 'back'
        },
        {
          title: '去向信息',
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
                    console.log(params.row)
                    this.dialogList.code.value = params.row.code
                    this.dialogList.name.value = params.row.name
                    this.dialogList.sex.value = params.row.sex
                    this.dialogList.phone.value = params.row.phone
                    this.dialogList.class_name.value = params.row.class_name
                    this.dialogList.leave.value = params.row.leave
                    this.dialogList.back.value = params.row.back
                    this.dialogList.area.value = params.row.area
                    this.dialogList.seven_goto.value = params.row.seven_goto
                    console.log(this.dialogList)
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      data: [
        {
          code: '199200118',
          name: '张三真的',
          class_name: '计科19',
          sex: 0,
          phone: '213122131',
          leave: '2022-05-09',
          back: '2022-05-09',
          area: '杭州市西湖区道',
          seven_goto: '宁波市奉化'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          leave: '2022-05-09',
          back: '2022-05-09',
          area: '杭州市西湖区道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          leave: '2022-05-09',
          back: '2022-05-09',
          area: '杭州市西湖区道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          leave: '2022-05-09',
          back: '2022-05-09',
          area: '杭州市西湖区道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          leave: '2022-05-09',
          back: '2022-05-09',
          area: '杭州市西湖区道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          leave: '2022-05-09',
          back: '2022-05-09',
          area: '杭州市西湖区道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          leave: '2022-05-09',
          back: '2022-05-09',
          area: '杭州市西湖区道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          leave: '2022-05-09',
          back: '2022-05-09',
          area: '杭州市西湖区道'
        },
        {
          uid: 199200118,
          name: '张三',
          class: '计科19',
          leave: '2022-05-09',
          back: '2022-05-09',
          area: '杭州市西湖区道'
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
  //  关键字查询
    queryOutRecordByKey(e) {
      this.data = []
      this.queryInfo.keyword = e
      this.getOutRecordList()
    },
    //  获得学生外出列表
    getOutRecordList() {
      GetOutRecordList(this.queryInfo).then((res) => {
        console.log(res)
      })
    },
    // 选择页码
    editPageNum(e) {
      this.queryInfo.pageNum = e
      this.getOutRecordList()
    },
    // 选择当页最大条数
    editPageSize(e) {
      this.queryInfo.pageSize = e
      this.getOutRecordList()
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
