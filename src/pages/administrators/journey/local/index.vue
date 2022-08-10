<template>
  <div  style="margin:84px 24px 0 24px">
    <Card :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2 style="margin-top: 10px;">你好！ {{userInfo.roleName}}！</h2>
    </Card>
    <Card class="card">
      <div class="search-container">
        <div class="left-search">
          <Input  placeholder="请输入学生学号、学生姓名、二级学院" style="width: 300px" v-model="queryInfo.key"></Input>
        </div>
        <div style="margin-right: 2em">
          <Select v-model="selectModel" style="width:160px" @on-change="queryListByGrade(selectModel)" placeholder="按分险等级查询">
            <Option v-for="item in gradeList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </div>
        <Button type="primary" class="btn" @click="queryStuInfoByKey">查询</Button>
        <Button class="btn" @click="queryInfo.key = ''">重置</Button>
      </div>
    </Card>
    <Card class="card-marginTop card">
      <div class="batch-box">
        <div class="select-text">已选择 <span style="color: #0e92e7; font-size: 18px">{{batchNum}}</span> 项</div>
        <Poptip
          confirm
          title="确定将这些学生14天前的行程进行删除吗？"
          @on-ok="batchSubmit"
        >
          <div class="btn">批量删除</div>
        </Poptip>
      </div>
      <div class="table-box">
        <Table :border="false" :columns="columns" :data="data"
               @on-select="onSelectAll" @on-select-cancel='onSelectCancel'
               @on-select-all ='onSelectAll' @on-select-all-cancel='onSelectAllCancel'
        ></Table>
      </div>
      <Page :total="total" show-elevator :current="queryInfo.pageNum" show-sizer class-name="page"  @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
    <CheckLocal :checkSwitch="showDialogVisible" :checkList1="checkList1" :crossList="crossList" :outList="outList" @switchCheck="close"></CheckLocal>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import CheckLocal from './checkLocal/index'
import {
  GetLocalStuList,  DeleteLocalStuInfo
  , GetLocalStuInfoByCode
} from '@api/group/stuManage'
import { BatchDelBatchDailyCodeList, BatchDelLocalBatchDailyCodeList } from '@/api/administorators/journery'
import { mapState } from 'vuex'

export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, CheckLocal
  },
  data() {
    return {
      batchNum: 0,
      selectModel: '',
      gradeList: [
        '默认', '只看中风险', '只看高风险'
      ],
      showDialogVisible: false,
      outList: [],
      checkList1: {
        code: {
          title: '学生学号', value: ''
        },
        name: {
          title: '学生姓名', value: ''
        },
        sex: {
          title: '性别', value: ''
        },
        idCard: {
          title: '身份证', value: ''
        },
        secondCollage: {
          title: '二级学院', value: ''
        },
        className: {
          title: '班级', value: ''
        },
        phone: {
          title: '手机号', value: ''
        },
        address: {
          title: '居住地址', value: ''
        },
        emergencyContact: {
          title: '紧急联系人', value: ''
        },
        emergencyContactPhone: {
          title: '紧急联系人电话', value: ''
        }
      },
      dialogList: {
        code: {
          title: '学生学号', value: '', isEdit: false
        },
        name: {
          title: '学生姓名', value: '', isEdit: false
        },
        sex: {
          title: '性别', value: 0, isEdit: false
        },
        idCard: {
          title: '身份证', value: '', isEdit: false
        },
        deptName: {
          title: '二级学院', value: '', isEdit: false
        },
        className: {
          title: '班级', value: '', isEdit: false
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
          title: '紧急联系人', value: 'die', isEdit: true
        },
        emergencyContactPhone: {
          title: '紧急联系人电话', value: '12345467890', isEdit: true
        }
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'left'
        },
        {
          title: '学生学号',
          align: 'left',
          key: 'code'
        },
        {
          title: '学生姓名',
          align: 'left',
          key: 'name'
        },
        {
          title: '二级学院',
          align: 'left',
          key: 'secondCollage'
        },
        {
          title: '离校时间',
          align: 'left',
          key: 'startTime'
        },
        {
          title: '风险等级',
          key: 'riskLevel',
          sortable: true,
          align: 'left',
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
          title: '涉及地区',
          key: 'whereDetail',
          align: 'left',
          width: 200
        },
        {
          title: '操作',
          key: 'action',
          width: 160,
          align: 'center',
          render: (h, params) => {
            return h('div', {
            }, [
              h('Button', {
                props: {
                  // type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  color: '#01b0ff',
                  background: 'transparent',
                  border: '0px'
                },
                on: {
                  click: () => {
                    this.showDialogVisible = true
                    this.getLocalStuInfoByCode(params.row.code)
                  }
                }
              }, '查看'),
              [
                h('Poptip', {
                  props: {
                    placement: 'top-start',
                    confirm: true,
                    transfer: true,
                    title: '确定将学生14天前的行程进行删除吗？'
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteStuInfoByCode(params.row.code)
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
        key: '',
        risk: null
      },
      total: 0,
      batchList: [],
      crossList: [],
      selectedData: [], // 选中的数组
      arr1: [], // 原本
      arr2: [] // 去重后的，
    }
  },
  computed: {
    ...mapState('admin/account', ['userInfo'])
  },
  created() {
    this.getLocalStuList()
  },
  methods: {
    selectItem(e) {
      this.batchList = []
      e.forEach((item) => {
        console.log(item)
        this.batchList.push(item.code)
      })
      this.batchNum = this.batchList.length
    },
    batchSubmit() {
      this.batchList = []
      this.arr2.forEach((item) => {
        this.batchList.push(item.code)
      })
      const data = {
        codes: this.batchList
      }
      BatchDelLocalBatchDailyCodeList(data).then(() => {
        this.$Message.success('批量删除学生本市行程信息成功！')
        this.arr1 = []
        this.arr2 = []
        this.batchNum = 0
        this.getLocalStuList()
      })
    },
    close() {
      this.showDialogVisible = false
    },
    deleteStuInfoByCode(code) {  // 通过学生学号删除
      DeleteLocalStuInfo({ code: code }).then(() => {
        this.$Message.success('删除本市学生信息成功！')
        this.getLocalStuList()
      })
    },
    queryListByGrade(grade) { // 通过等级查询
      if (grade === '默认') {
        this.queryInfo.risk = null
      } else if (grade === '只看中风险') {
        this.queryInfo.risk = 1
      } else if (grade === '只看高风险') {
        this.queryInfo.risk = 2
      }
      this.queryInfo.pageNum = 1
      this.queryInfo.pageSize = 10
      this.getLocalStuList()
    },
    getLocalStuList() { // 获得学生基本信息
      GetLocalStuList(this.queryInfo).then((res) => {
        this.data = res.data
        this.total = res.total
      })
    },
    queryStuInfoByKey() { // 关键字查询
      this.data = []
      this.queryInfo.pageNum = 1
      this.queryInfo.pageSize = 10
      this.getLocalStuList()
    },
    onSelectAll(selection) {
      // arr1 去重之前的 选中后合并的数组
      this.arr1 = [...selection, ...this.selectedData]
      // 去重  some  和every 相反，只要有一个满足条件，就返回true
      for (const val of this.arr1) {
        if (!this.arr2.some(item => item.code === val.code)) {
          this.arr2.push(val)
        }
      }
      if (this.arr2.length >= 30) {
        this.enableModal = true
      }
      this.batchNum = this.arr2.length
    },

    // 取消选中某一项时触发
    onSelectCancel(selection, row) {
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
      console.log(this.arr2)
      this.batchNum = this.arr2.length
    },
    editPageNum(e) { // 选择页码
      this.queryInfo.pageNum = e
      GetLocalStuList(this.queryInfo).then((res) => {
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
    editPageSize(e) { // 选择当页最大条数
      this.queryInfo.pageSize = e
      this.getLocalStuList()
    },
    getLocalStuInfoByCode(code) { //   点击查看里面的基本信息
      GetLocalStuInfoByCode({ code: code }).then(res => {
        console.log(res)
        this.checkList1.code.value = res.code
        this.checkList1.name.value = res.name
        this.checkList1.sex.value = res.sex
        if (res.sex === 0) {
          this.checkList1.sex.value = '男'
        } else if (res.sex === 1) {
          this.checkList1.sex.value = '女'
        }
        this.checkList1.phone.value = res.phone
        this.checkList1.idCard.value = res.idCard
        this.checkList1.secondCollage.value = res.secondCollage
        this.checkList1.className.value = res.className
        this.checkList1.address.value = res.address
        this.checkList1.emergencyContact.value = res.emergencyContact
        this.checkList1.emergencyContactPhone.value = res.emergencyContactPhone
        res.crossCityList.forEach((item) => {
          this.crossList.push({
            address: item
          })
        })
        res.dailyRecordList.forEach(item => {
          this.outList.push({
            startTime: item.startTime,
            endTime: item.endTime,
            travelRecord: item.travelRecord.toString(),
            whereDetail: item.whereDetail
          })
        })
      })
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
    cursor: pointer;
    margin-left: 1vw;
    background: transparent;
    border: 0;
    color: #1e93ff;
  }
}
</style>
