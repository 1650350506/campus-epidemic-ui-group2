<template>
  <div  style="margin:84px 24px 0 24px">
    <Card :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb"  />
      <h2 style="margin-top: 10px;">你好！管理员</h2>
    </Card>
    <div class="top-card">
      <Card class="card" v-for="(item, index) in topList" :key="index">
        <div @click="showList(index)">
          <h1>{{item.name}}</h1>
          <h1>{{item.num}}</h1>
        </div>
      </Card>
    </div>
    <Card class="card card-marginTop">
      <Search title="请输入学生学号、学生姓名" :keyValue="queryInfo.keyword" @selectFun="queryQuarantinedInfoByKey"></Search>
    </Card>
    <Card class="card-marginTop card">
      <Button type="primary" style="margin-bottom: 10px" @click="addDialogVisible = true">+ 新增 </Button>
      <div class="table-box">
        <Table :border="false"  :columns="columns" :data="data" class="table"></Table>
      </div>
      <Page :total="total" show-elevator show-sizer class-name="page"  @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
    <CheckContent :checkSwitch="showDialogVisible" :msgList="msgData" :serviceList="serviceData" :checkList1="checkList1" @switchCheck="close"></CheckContent>
    <AddContent :addSwitch="updateDialogVisible" :msgList="msgData" :addList1="addInfoList1" @switchAdd="closeByAdd" @update="updateRecord"></AddContent>
    <NewContent :newSwitch="addDialogVisible" @addClose="closeByNew"></NewContent>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import Search from '@/components/top/search'
import CheckContent from './checkModal'
import AddContent from './addModal'
import NewContent from './../newPre'
import { DeleteIsolationInfo, GetIsolationInfoList, GetIsolationInfoListByCode, GetTreatedTotal, GetQuarantinedTotal, GetToBeTotal, GetIsolatedTotal } from '@api/personnel/riskpremanage'

export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, Search, CheckContent, AddContent, NewContent
  },
  data() {
    return {
      topList: [
        { name: '待隔离', num: -1 },
        { name: '已隔离', num: -1 },
        { name: '治疗中', num: -1 },
        { name: '隔离结束', num: -1 }
      ],
      nucleicResult: [
        {
          label: 0,
          value: 0
        },
        {
          label: '阳性',
          value: 1
        }
      ],
      showDialogVisible: false,
      updateDialogVisible: false,
      addDialogVisible: false,
      checkList1: {
        name: {
          title: '姓名', value: ''
        },
        sex: {
          title: '性别', value: ''
        },
        stuCollege: {
          title: '二级学院', value: ''
        },
        classname: {
          title: '班级', value: ''
        },
        phoneNumber: {
          title: '手机号', value: ''
        },
        protectorName: {
          title: '关联防疫人员', value: ''
        },
        isolationLocation: {
          title: '隔离地点', value: ''
        },
        state: {
          title: '隔离状态', value: ''
        },
        startTime: {
          title: '开始时间', value: ''
        },
        endTime: {
          title: '结束时间', value: ''
        }
      },
      checkList2: [],
      checkList3: [],
      addInfoList1: {
        code: {
          title: '学号', value: ''
        },
        name: {
          title: '姓名', value: ''
        },
        sex: {
          title: '性别', value: ''
        },
        stuCollege: {
          title: '二级学院', value: ''
        },
        classname: {
          title: '班级', value: ''
        },
        phoneNumber: {
          title: '手机号', value: ''
        },
        associates: {
          title: '关联防疫人员', value: ''
        }
      },
      dialogList: {
        code: {
          title: '学生学号', value: '199200118', isEdit: false
        },
        name: {
          title: '学生姓名', value: '阿非', isEdit: false
        },
        sex: {
          title: '性别', value: 0, isEdit: false
        },
        classname: {
          title: '班级', value: '计科19', isEdit: false
        },
        phoneNumber: {
          title: '手机号', value: '12345678900', isEdit: false
        },
        startTime: {
          title: '隔离开始时间', value: '2022-05-22', isEdit: false
        },
        endTime: {
          title: '隔离结束时间', value: '2022-05-22', isEdit: false
        },
        state: {
          title: '隔离状态', value: '', isEdit: false
        },
        temperature: {
          title: '体温', value: 0, isEdit: false
        }
      },
      columns: [
        {
          title: '学生学号',
          key: 'code',
          align: 'center'
        },
        {
          title: '学生姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '二级学院',
          key: 'stuCollege',
          align: 'center'
        },
        {
          title: '体温',
          key: 'temperature',
          align: 'center',
          render: (h, params) => {
            let temp = params.row.temperature
            let colors
            if (temp < 37) {
              temp = '正常'
              colors = '#0f7419'
            } else {
              temp = '异常'
              colors = '#d71313'
            }
            return h('div',
              {
                style: {
                  display: 'flex',
                  justifyContent: 'center'
                }
              },
              [
                h('div', {
                  style: {
                    width: '1em',
                    height: '1em',
                    marginTop: '2px',
                    borderRadius: '50%',
                    backgroundColor: colors
                  }
                }),
                h('div', {
                  style: {
                    marginLeft: '5px'
                  },
                  on: {
                  }
                }, temp)
              ])
          }
        },
        {
          title: '核酸结果',
          key: 'nucleicacidkey',
          align: 'center',
          render: (h, params) => {
            let key
            if (params.row.nucleicacidkey === 1) {
              key = '阳性'
            } else {
              key = '阴性'
            }
            return h('span', key)
          }
        },
        {
          title: '开始隔离时间',
          key: 'startTime',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: '300',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  backgroundColor: 'transparent',
                  border: '0px',
                  color: '#01b0ff'
                },
                on: {
                  click: () => {
                    this.getIsolationInfoListByCode(params.row.code)
                    this.getProtectorNameByCode(params.row.code)
                    this.getIsolationServiceInfoList(params.row.code)
                    this.showDialogVisible = true
                    console.log(params.row)
                    this.checkList1.name.value = params.row.name
                    this.checkList1.sex.value = params.row.sex
                    if (params.row.sex === 0) {
                      this.checkList1.sex.value = '男'
                    } else {
                      this.checkList1.sex.value = '女'
                    }
                    this.checkList1.stuCollege.value = params.row.stuCollege
                    this.checkList1.classname.value = params.row.classname
                    this.checkList1.phoneNumber.value = params.row.phoneNumber
                    this.checkList1.isolationLocation.value = params.row.isolationLocation
                    this.checkList1.state.value = this.topList[params.row.state].name
                    this.checkList1.startTime.value = params.row.startTime
                    this.checkList1.endTime.value = params.row.endTime
                  }
                }
              }, '查看'),
              [
                h('Poptip', {
                  props: {
                    placement: 'top-start',
                    confirm: true,
                    transfer: true,
                    title: '确定解除该隔离状态吗？'
                  },
                  on: {
                    'on-ok': () => {
                      this.relieveIsolation(params.row.code)
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
                      title: '解除'
                    },
                    style: {
                      marginRight: '5px',
                      backgroundColor: 'transparent',
                      border: '0px',
                      color: '#01b0ff'
                    },
                    on: {
                    }
                  }, '解除')
                ])
              ],
              h('Button', {
                props: {
                  // type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  backgroundColor: 'transparent',
                  border: '0px',
                  color: '#01b0ff'
                },
                on: {
                  click: () => {
                    this.updateDialogVisible = true
                    this.addInfoList1.code.value = params.row.code
                    this.getIsolationInfoListByCode(params.row.code)
                    this.addInfoList1.name.value = params.row.name
                    this.addInfoList1.sex.value = params.row.sex
                    this.addInfoList1.stuCollege.value = params.row.stuCollege
                    if (params.row.sex === 0) {
                      this.addInfoList1.sex.value = '男'
                    } else {
                      this.addInfoList1.sex.value = '女'
                    }
                    this.addInfoList1.classname.value = params.row.classname
                    this.addInfoList1.phoneNumber.value = params.row.phoneNumber
                  }
                }
              }, '增加隔离记录')
            ])
          }
        }
      ],
      data: [],
      msgData: [],
      serviceData: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        keyword: '',
        state: 1
      },
      total: 0
    }
  },
  created() {
    this.getIsolationInfoList()
    this.getTreatedTotal()
    this.getTobeTotal()
    this.getQuarantinedTotal()
    this.getIsolatedTotalTotal()
  },
  methods: {
    close(e) {
      console.log(e)
      this.showDialogVisible = false
    },
    closeByAdd(e) {
      this.updateDialogVisible = false
    },
    closeByNew() {
      this.addDialogVisible = false
    },
    dateFormat(time) {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
      // 拼接
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },
    // 获得隔离人员的关联人员
    getProtectorNameByCode(code) {
      const queryInfo = {
        pageNum: '1',
        pageSize: '10',
        code: code
      }
      GetIsolationInfoListByCode(queryInfo).then(res => {
        // this.checkList1.protectorName.value = res.data[0].protectorName
        console.log(res)
        // console.log(this.checkList1.protectorName.value)
      })
    },
    // 查询已隔离或者未隔离信息
    getIsolationInfoList() {
      GetIsolationInfoList(this.queryInfo).then((res) => {
        this.data = res.data
        this.total = res.total
      })
    },
    // // 解除隔离
    relieveIsolation(e) {
      const data = {
        code: e
      }
      DeleteIsolationInfo(data).then((res) => {
        this.$Message.success('解除隔离成功!')
        this.getIsolationInfoList()
      })
    },
    // 获取隔离信息
    getIsolationInfoListByCode(code) {
      const queryInfo = {
        pageNum: '1',
        pageSize: '10',
        code: code
      }
      this.msgData = []
      GetIsolationInfoListByCode(queryInfo).then(res => {
        res.data.forEach(item => {
          this.msgData.push({
            id: item.id,
            code: item.code,
            nucleicAcidTime: item.nucleicAcidTime,
            nucleicAcidKey: item.nucleicAcidKey,
            temperature: item.temperature
          })
        })
        console.log(this.msgData)
      })
    },
    // 服务记录
    getIsolationServiceInfoList(code) {
      const queryInfo = {
        pageNum: '1',
        pageSize: '10',
        keyword: code,
        state: ''
      }
      GetIsolationInfoList(queryInfo).then(res => {
        this.serviceData = []
        res.data.forEach(item => {
          this.serviceData.push({
            code: item.code,
            startTime: item.startTime,
            endTime: item.endTime,
            isolationReason: item.isolationReason
          })
        })
      })
    },
    // 返回子组件最新的隔离记录
    updateRecord(e) {
      this.getIsolationInfoListByCode(e)
    },
    // 关键字查询
    queryQuarantinedInfoByKey(e) {
      this.data = []
      this.queryInfo.keyword = e
      this.getIsolationInfoList()
    },
    // 选择页码
    editPageNum(e) {
      this.queryInfo.pageNum = e
      this.getIsolationInfoList()
    },
    // 选择当页最大条数
    editPageSize(e) {
      this.queryInfo.pageSize = e
      this.getIsolationInfoList()
    },
    getTobeTotal() {
      GetToBeTotal().then(res => {
        this.topList[0].num = res.field
      })
    },
    getQuarantinedTotal() {
      GetQuarantinedTotal().then(res => {
        this.topList[1].num = res.field
      })
    },
    getTreatedTotal() {
      GetTreatedTotal().then(res => {
        this.topList[2].num = res.field
      })
    },
    getIsolatedTotalTotal() {
      GetIsolatedTotal().then(res => {
        this.topList[3].num = res.field
      })
    },
    showList(index) {
      this.queryInfo.state = index
      this.getIsolationInfoList()
    }
  }
}
</script>

<style lang="less" scoped>
.top-card {
  height: 18vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .card {
    width: 20%;
    height: 100%;
    margin-left: 6.6%;
    &:nth-of-type(4n+1) {
      margin-left: 0;
    }
  }
}
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
    }
    .core {
      flex-basis: 46%;
    }
  }
}
</style>
