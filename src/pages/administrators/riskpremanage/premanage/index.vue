<template>
  <div  style="margin:84px 24px 0 24px">
    <Card :bordered="false"  class="card">
      <i-header-breadcrumb  ref="breadcrumb"  />
      <h2 style="margin-top: 10px;">你好！ {{userInfo.roleName}}！</h2>
    </Card>
    <div class="top-card">
      <Card class="card" v-for="(item, index) in topList" :key="index" ref="cardRef" dis-hover>
        <div @click="showList(index)" class="card-item">
          <h1 class="name">{{item.name}}</h1>
          <h1 class="num">{{item.num}}</h1>
          <img src="../../../../assets/images/epi.png" v-if="index===0" alt="" width="28%">
          <img src="../../../../assets/images/eip2.png" v-if="index===1" alt="" width="30%" style="top: 8%">
          <img src="../../../../assets/images/eip3.png" v-if="index===2" alt="" width="28%">
          <img src="../../../../assets/images/eip4.png" v-if="index===3" alt="" width="30%" style="top: 8%">
        </div>
      </Card>
    </div>
    <Card class="card card-marginTop">
      <div class="search-container">
        <div class="left-search">
          <div></div>
          <Input placeholder="请输入学生学号、学生姓名" v-on:keyup.enter.native="queryEnter" style="width: 220px;flex: 1" v-model="queryInfo.keyword">
          </Input>
        </div>
        <Button type="primary" class="btn" @click="queryQuarantinedInfoByKey">查询</Button>
        <Button class="btn" @click="resetQuery">重置</Button>
      </div>
    </Card>
    <Card class="card-marginTop card">
      <Button type="primary" style="margin-bottom: 10px" @click="addDialogVisible = true">+ 新增 </Button>
      <div class="table-box">
        <Table :border="false"  :columns="columns" :data="data" class="table"></Table>
      </div>
      <Page :total="total" :current="queryInfo.pageNum" show-elevator show-sizer class-name="page"  @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
    <CheckContent :checkSwitch="showDialogVisible" :msgList="msgData" :serviceList="serviceData" :checkList1="checkList1" @switchCheck="close"></CheckContent>
    <AddContent :addSwitch="updateDialogVisible" :msgList="msgData" :addList1="addInfoList1" @switchAdd="closeByAdd" @update="updateRecord"></AddContent>
    <NewContent :newSwitch="addDialogVisible" @addClose="closeByNew"></NewContent>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import CheckContent from './checkModal'
import AddContent from './addModal'
import NewContent from './../newPre'
import { DeleteIsolationInfo, GetIsolationInfoList, GetIsolationInfoListByCode, GetTreatedTotal, GetQuarantinedTotal, GetToBeTotal, GetIsolatedTotal } from '@api/personnel/riskpremanage'
import { mapState } from 'vuex'

export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, CheckContent, AddContent, NewContent
  },
  data() {
    return {
      topList: [
        { name: '待隔离', num: 0 },
        { name: '已隔离', num: 0 },
        { name: '隔离结束', num: 0 },
        { name: '治疗中', num: 0 }
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
          title: '学生姓名', value: ''
        },
        sex: {
          title: '性别', value: ''
        },
        stuCollege: {
          title: '二级学院', value: ''
        },
        classname: {
          title: '学生班级', value: ''
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
          title: '学生学号', value: ''
        },
        name: {
          title: '学生姓名', value: ''
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
          align: 'left'
        },
        {
          title: '学生姓名',
          key: 'name',
          align: 'left'
        },
        {
          title: '二级学院',
          key: 'stuCollege',
          align: 'left'
        },
        {
          title: '体温',
          key: 'temperature',
          align: 'left',
          render: (h, params) => {
            let temp
            let colors
            let displayType
            if (params.row.temperature <= 36 && params.row.temperature > 35) {
              temp = '正常'
              displayType = 'block'
              colors = '#0f7419'
            } else if (params.row.temperature > 37) {
              temp = '异常'
              displayType = 'block'
              colors = '#d71313'
            } else {
              temp = '待测'
              displayType = 'none'
              colors = 'transparent'
            }
            return h('div',
              {
                style: {
                  display: 'flex',
                  alignContent: 'center'
                }
              },
              [
                h('span', {
                  style: {
                    display: displayType,
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
          align: 'left',
          render: (h, params) => {
            const keyArray = ['阴性', '阳性']
            const key = keyArray[params.row.nucleicacidkey] || '待测'
            return h('span', key)
          }
        },
        {
          title: '隔离开始时间',
          key: 'startTime',
          align: 'left'
        },
        {
          title: '隔离状态',
          key: 'state',
          align: 'left',
          render: (h, params) => {
            const statusArray = ['待隔离', '已隔离', '隔离结束', '治疗中']
            const key = statusArray[params.row.state] || '------'
            return h('span', key)
          }
        },
        {
          title: '操作',
          key: 'action',
          width: '270',
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
                  display: this.displayType,
                  border: '0px',
                  color: '#01b0ff'
                },
                on: {
                  click: () => {
                    this.getIsolationInfoListByCode(params.row.code)
                    this.getProtectorNameByCode(params.row.code)
                    this.getIsolationServiceInfoList(params.row.code)
                    this.showDialogVisible = true
                    this.checkList1.name.value = params.row.name
                    this.checkList1.sex.value = params.row.sex
                    this.checkList1.sex.value = params.row.sex === 0 ? '男' : '女'
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
                    title: '你确定要解除该人员的隔离状态吗？'
                  },
                  on: {
                    'on-ok': () => {
                      this.relieveIsolation(params.row.code)
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
                      display: this.displayType,
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
                  display: this.displayType,
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
                    this.addInfoList1.sex.value = params.row.sex === 0 ? '男' : '女'
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
      total: 0,
      displayType: 'inline-block'
    }
  },
  computed: {
    ...mapState('admin/account', ['userInfo'])
  },
  created() {
    this.getIsolationInfoList()
    this.getTreatedTotal()
    this.getTobeTotal()
    this.getQuarantinedTotal()
    this.getIsolatedTotalTotal()
  },
  methods: {
    close() {
      this.showDialogVisible = false
    },
    getCardMsg() {
      this.getTreatedTotal()
      this.getTobeTotal()
      this.getQuarantinedTotal()
      this.getIsolatedTotalTotal()
    },
    closeByAdd() {
      this.updateDialogVisible = false
      this.queryInfo.keyword = ''
      this.getIsolationInfoList()
      this.getCardMsg()
    },
    closeByNew() {
      this.addDialogVisible = false
      this.getIsolationInfoList()
      this.getCardMsg()
    },
    getProtectorNameByCode(code) { // 获得隔离人员的关联人员
      const queryInfo = {
        pageNum: '1',
        pageSize: '10',
        code: code
      }
      GetIsolationInfoListByCode(queryInfo).then(res => {
        if (res.data.length > 0) {
          this.checkList1.protectorName.value = res.data[0].protectorName
        } else {
          this.checkList1.protectorName.value = ''
        }
      })
    },
    getIsolationInfoList() {  // 查询已隔离或者未隔离信息
      GetIsolationInfoList(this.queryInfo).then((res) => {
        this.data = res.data
        this.total = res.total
      })
    },
    relieveIsolation(e) { // 解除隔离
      const data = {
        code: e
      }
      DeleteIsolationInfo(data).then(() => {
        this.$Message.success('解除隔离成功!')
        this.getIsolationInfoList()
        this.getCardMsg()
      })
    },
    getIsolationInfoListByCode(code) { // 获取隔离信息
      const queryInfo = {
        pageNum: '1',
        pageSize: '20',
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
    getIsolationServiceInfoList(code) { // 服务记录
      const queryInfo = {
        pageNum: '1',
        pageSize: '20',
        keyword: code,
        state: ''
      }
      this.serviceData = []
      GetIsolationInfoList(queryInfo).then(res => {
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
    updateRecord(e) { // 返回子组件最新的隔离记录
      this.getIsolationInfoListByCode(e)
    },
    queryQuarantinedInfoByKey() { // 关键字查询
      this.data = []
      this.queryInfo.pageNum = 1
      this.queryInfo.pageSize = 10
      this.getIsolationInfoList()
    },
    queryEnter(e) {
      const keyCode = window.event ? e.keyCode : e.which
      if (keyCode === 13) {
        this.queryQuarantinedInfoByKey()
      }
    },
    resetQuery() {
      this.queryInfo.pageNum = 1
      this.queryInfo.pageSize = 10
      this.queryInfo.keyword = ''
      this.getIsolationInfoList()
    },
    editPageNum(e) { // 选择页码
      this.queryInfo.pageNum = e
      this.getIsolationInfoList()
    },
    editPageSize(e) { // 选择当页最大条数
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
        this.topList[3].num = res.field
      })
    },
    getIsolatedTotalTotal() {
      GetIsolatedTotal().then(res => {
        this.topList[2].num = res.field
      })
    },
    showList(index) {
      this.queryInfo.state = index
      if (index !== 1) {
        this.displayType = 'none'
      } else {
        this.displayType = 'inline-block'
      }
      this.queryInfo.pageNum = 1
      this.queryInfo.pageSize = 10
      this.getIsolationInfoList()
    }
  }
}
</script>

<style lang="less" scoped>

.card-item {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .name {
    color: #999999;
    font-size: 1.4rem;
  }
  .num {
    font-size: 2.5rem;
  }
  img {
    position: absolute;
    right: 4%;
    top: 12%;
  }
}
.top-card {
  height: 18vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .card {
    cursor: pointer;
    width: 20%;
    height: 100%;
    margin-left: 6.6%;
    transition: all .5s ease-in;
    ::v-deep(.ivu-card-body) {
      height: 100%;
      padding: 10% 5% 6% 8%;
    }
    &:nth-of-type(4n+1) {
      margin-left: 0;
    }
    &:hover {
      transform: translateY(5%);
    }
  }
}
.search-container {
  display: flex;
  border: 0;
  .left-search {
    display: flex;
    align-items: center;
    margin-right: 2em;
  }
  .btn {
    margin-right: 2em;
  }
}
</style>
