<template>
  <div>
    <Card :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb"  />
      <h2 style="margin-top: 10px;">你好！防控人员 WBG The shy!!!!!!!</h2>
    </Card>
    <div class="top-card">
      <Card class="card" v-for="(item, index) in topList" :key="index">
        <h1>{{item.name}}</h1>
        <h1>{{item.num}}</h1>
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
      <Page :total="100" show-elevator show-sizer class-name="page"  @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
    <CheckContent :checkSwitch="showDialogVisible" :checkList1="checkList1" @switchCheck="close"></CheckContent>
    <AddContent :addSwitch="updateDialogVisible" :addList1="addInfoList1" @switchAdd="closeByAdd"></AddContent>
    <NewContent :newSwitch="addDialogVisible" @addClose="closeByNew"></NewContent>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import Search from '@/components/top/search'
import CheckContent from './checkModal'
import AddContent from './addModal'
import NewContent from './../newPre'
import { DeleteIsolationInfo, GetIsolationInfoList, GetIsolationInfoListByCode } from '@api/personnel/riskpremanage'

export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, Search, CheckContent, AddContent, NewContent
  },
  data() {
    return {
      topList: [
        { name: '待隔离', num: 43 },
        { name: '已隔离', num: 8 },
        { name: '治疗中', num: 100 },
        { name: '隔离结束', num: 10 }
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
        // nucleic_result: {
        //   title: '核酸结果', value: '', isEdit: false
        // },
        temperature: {
          title: '体温', value: 0, isEdit: false
        }
        // associates: {
        //   title: '关联防疫人员', value: '', isEdit: false
        // },
        // nucleic_time: {
        //   title: '核酸时间', value: '', isEdit: false
        // }
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
            if (params.row.nucleicacidkey === 0) {
              key = '阴性'
            } else if (params.row.nucleicacidkey === 1) {
              key = '阳性'
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
                    this.getProtectorNameByCode(params.row.code)
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
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
      // 拼接
      return `${year}-${month}-${day}`
    },
    // 获得隔离人员的关联人员
    getProtectorNameByCode(code) {
      const queryInfo = {
        pageNum: '1',
        pageSize: '1',
        code: code
      }
      GetIsolationInfoListByCode(queryInfo).then(res => {
        this.checkList1.protectorName.value = res.data[0].protectorName
      })
    },
    // 查询已隔离或者未隔离信息
    getIsolationInfoList() {
      GetIsolationInfoList(this.queryInfo).then((res) => {
        console.log(res)
        // res.data.forEach(function (item) {
        //   item.startTime = this.dateFormat(item.startTime)
        // })
        this.data = res.data
        this.total = res.total
        console.log(2)
        console.log(this.data)
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
    // 关键字查询
    queryQuarantinedInfoByKey(e) {
      this.data = []
      this.queryInfo.keyword = e
      this.getStuList()
    },
    // 选择页码
    editPageNum(e) {
      this.queryInfo.pageNum = e
      this.getStuList()
    },
    // 选择当页最大条数
    editPageSize(e) {
      this.queryInfo.pageSize = e
      this.getStuList()
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
      //text-justify: distribute-all-lines;
    }
    .core {
      flex-basis: 46%;
    }
  }
}
</style>
