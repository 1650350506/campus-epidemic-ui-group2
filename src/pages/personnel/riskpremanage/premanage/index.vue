<template>
  <div>
    <Card :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb"  />
      <h2 style="margin-top: 10px;">你好！ xx学院防控人员王老五！</h2>
    </Card>
    <Row style="margin-top: 2em">
      <Col :span="6" v-for="(item, index) in topList" :key="index" class="card-item">
        <Card class="card">
          <h2>{{item.name}}</h2>
          <h1>{{item.num}}</h1>
        </Card>
      </Col>
    </Row>
    <Card class="card-marginTop card">
      <Search></Search>
    </Card>
    <Card class="card-marginTop card">
      <Table border :columns="columns" :data="data" class="table"></Table>
      <Page :total="100" show-elevator show-sizer class-name="page"></Page>
    </Card>
    <Modal
      v-model="showDialogVisible"
      @on-cancel="showDialogVisible = false"
      width="720"
    >
      <p slot="header" style="text-align: center">隔离学生基本信息</p>
      <div class="modal-container">
        <div class="modal-item"  v-for="(item, index) in dialogList" :key="index">
          <div class="null"></div><div class="star" :style="item.isEdit ? {}: {opacity: 0}"></div><div class="title" v-if="item">{{item.title}}</div><div style="flex-basis: 4%">:</div><div class="core">{{item.value}}</div>
        </div>
      </div>
      <div slot="footer">
        <Button @click="showDialogVisible = false" type="primary">关闭</Button>
      </div>
    </Modal>
    <Modal
      v-model="updateDialogVisible"
      @on-ok="handleAddRecord"
      @on-cancel="updateDialogVisible = false"
      class-name="vertical-center-modal"
      width="720"
    >
      <p slot="header" style="text-align: center">工作人员基本信息</p>
      <div class="modal-container">
        <div class="modal-item" v-for="(item, index) in dialogList" :key="index">
          <div class="null"></div><div class="star" :style="item.isEdit ? {}: {opacity: 0}"></div><div class="title" v-if="item">{{item.title}}</div><div style="flex-basis: 4%">:</div>
          <div class="core">
            <Input v-if="item.isEdit&&item.title!=='核酸时间'&&item.title!=='核酸结果'" v-model="item.value"></Input>
            <Date-picker type="date" format="yyyy-MM-dd" placeholder="选择日期" v-model="dialogList.nucleic_time.value"  v-else-if="item.isEdit&&item.title === '核酸时间'"></Date-picker>
            <Checkbox-group  v-else-if="item.isEdit&&item.title === '核酸结果'" v-model="item.value">
              <Checkbox label="阴性" value="0"></Checkbox>
              <Checkbox label="阳性" value="1"></Checkbox>
            </Checkbox-group>
            <span v-else>{{item.value}}</span>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import Search from '@/components/top/search'
import { DeleteIsolationInfo, GetIsolationInfoList } from '@api/personnel/riskpremanage'
export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, Search
  },
  data() {
    return {
      topList: [
        { name: '待隔离', num: 43 },
        { name: '已隔离', num: 8 }
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
        class_name: {
          title: '班级', value: '计科19', isEdit: false
        },
        phone: {
          title: '手机号', value: '12345678900', isEdit: false
        },
        start_time: {
          title: '隔离开始时间', value: '2022-05-22', isEdit: false
        },
        end_time: {
          title: '隔离结束时间', value: '2022-05-22', isEdit: false
        },
        isolation_state: {
          title: '隔离状态', value: '', isEdit: false
        },
        nucleic_result: {
          title: '核酸结果', value: '', isEdit: false
        },
        temperature: {
          title: '体温', value: 0, isEdit: false
        },
        associates: {
          title: '关联防疫人员', value: '', isEdit: false
        },
        nucleic_time: {
          title: '核酸时间', value: '', isEdit: false
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
          title: '班级',
          key: 'class_name',
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
          key: 'nucleic_result',
          align: 'center'
        },
        {
          title: '开始隔离时间',
          key: 'start_time',
          align: 'center'
        },
        {
          title: '隔离状态',
          key: 'isolation_state',
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
                  backgroundColor: '#e0e0e0',
                  border: '0px',
                  color: '#01b0ff',
                  background: 'transparent'
                },
                on: {
                  click: () => {
                    this.showDialogVisible = true
                    this.dialogList.code.value = params.row.code
                    this.dialogList.name.value = params.row.name
                    this.dialogList.sex.value = params.row.sex
                    this.dialogList.class_name.value = params.row.class_name
                    this.dialogList.phone.value = params.row.phone
                    this.dialogList.start_time.value = params.row.start_time
                    this.dialogList.end_time.value = params.row.end_time
                    this.dialogList.isolation_state.value = params.row.isolation_state
                    this.dialogList.nucleic_result.value = params.row.nucleic_result
                    this.dialogList.temperature.value = params.row.temperature
                    this.dialogList.associates.value = params.row.associates
                    this.dialogList.nucleic_time.value = params.row.nucleic_time
                    this.dialogList.nucleic_result.isEdit = false
                    this.dialogList.temperature.isEdit = false
                    this.dialogList.associates.isEdit = false
                    this.dialogList.nucleic_time.isEdit = false
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
                      this.removeIsolationInfo()
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
                      color: '#01b0ff',
                      marginRight: '5px',
                      border: '0px'
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
                    this.dialogList.class_name.value = params.row.class_name
                    this.dialogList.phone.value = params.row.phone
                    this.dialogList.start_time.value = params.row.start_time
                    this.dialogList.end_time.value = params.row.end_time
                    this.dialogList.isolation_state.value = params.row.isolation_state
                    this.dialogList.nucleic_result.value = params.row.nucleic_result
                    this.dialogList.temperature.value = params.row.temperature
                    this.dialogList.associates.value = params.row.associates
                    this.dialogList.nucleic_time.value = params.row.nucleic_time
                    this.dialogList.nucleic_result.isEdit = true
                    this.dialogList.temperature.isEdit = true
                    this.dialogList.associates.isEdit = true
                    this.dialogList.nucleic_time.isEdit = true
                  }
                }
              }, '增加隔离记录')
            ])
          }
        }
      ],
      data: [
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: '0',
          nucleic_result: '阳性',
          temperature: 36.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        },
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: 0,
          nucleic_result: '阳性',
          temperature: 36.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        },
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: 0,
          nucleic_result: '阴性',
          temperature: 36.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        },
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: 0,
          nucleic_result: '阴性',
          temperature: 36.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        },
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: 0,
          nucleic_result: '阴性',
          temperature: 36.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        },
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: 0,
          nucleic_result: '阴性',
          temperature: 67.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        },
        {
          code: 199200118,
          name: '张三',
          sex: 1,
          class_name: '计科19',
          phone: '198581044444',
          start_time: '2022-05-04',
          end_time: '2022-05-04',
          isolation_state: 0,
          nucleic_result: '阴性',
          temperature: 36.5,
          associates: '林林林',
          nucleic_time: '2022-05-04'
        }
      ]
    }
  },
  methods: {
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
    handleAddRecord() {
      const date =  this.dateFormat(this.dialogList.nucleic_time.value)
      let state
      if (this.dialogList.nucleic_result.value[0] === '阴性') {
        state = 0
      } else if (this.dialogList.nucleic_result.value[0] === '阳性') {
        state = 1
      }
      const result = {
        code: this.dialogList.code.value,
        name: this.dialogList.name.value,
        sex: this.dialogList.sex.value,
        class_name: this.dialogList.class_name.value,
        phone: this.dialogList.phone.value,
        start_time: this.dialogList.start_time.value,
        end_time: this.dialogList.end_time.value,
        isolation_state: this.dialogList.isolation_state.value,
        nucleic_result: state,
        temperature: this.dialogList.temperature.value,
        associates: this.dialogList.associates.value,
        nucleic_time: date
      }
      console.log(result)
    },
    // 解除隔离
    removeIsolationInfo() {
      const data = {
        code: '123'
      }
      DeleteIsolationInfo(data).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.card-item {
  margin-right: 2em;
  .card {
    height: 120px;
    h1 {
      font-size: 3em;
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
