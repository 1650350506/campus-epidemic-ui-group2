<template>
  <div>
    <Modal
      v-model="addSwitch"
      @on-cancel="close"
      width="720"
    >
      <p slot="header" style="text-align: left">添加隔离记录</p>
      <div class="model-box">
        <div class="top-box">
          <div class="modal-item" v-for="(item, index) in addList1" :key="index">
            <div class="null"></div><div class="title">{{item.title}}:</div><div class="star"></div>
            <div class="core"><Select v-if="item.title ==='关联防疫人员'" v-model="associatesModel" style="width:160px">
              <Option v-for="item in associationList" :value="item.deptCode" :key="item">{{ item.name }}</Option>
            </Select><span v-else>{{item.value}}</span></div>
          </div>
        </div>
        <div class="mid-box">
          <div class="mid-box-left">监测信息:</div>
          <div style="flex-basis: 2%"></div>
          <div class="mid-box-right">
            <div class="add-condition">
              <Date-picker type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
              <div>核酸结果：
                <Radio-group v-model="disabledGroup">
                  <Radio label="阴性" value="0"></Radio>
                  <Radio label="阳性" value="1"></Radio>
                </Radio-group>
              </div>
              <div>
                测温结果：
                <Radio-group v-model="disabledGroup">
                  <Radio label="正常" value="36"></Radio>
                  <Radio label="异常" value="38"></Radio>
                </Radio-group>
              </div>
              <Button type="primary">添加</Button>
              <br>
            </div>
          </div>
        </div>
        <div class="footer-box">
          <Table border :columns="columns" :data="data1" style="margin-top: 2em"></Table>
        </div>
      </div>
      <div slot="footer">
        <Button @click="close" type="primary">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { GetEpidemicPreventionPersonnel, GetIsolationInfoListByCode } from '../../../../../api/personnel/riskpremanage'

export default {
  name: 'AddContent',
  props: ['addSwitch', 'addList1'],
  data() {
    return {
      associationList: [],
      associatesModel: '',
      columns: [
        {
          title: '监测时间',
          key: 'time'
        },
        {
          title: '核酸结果',
          key: 'age'
        },
        {
          title: '测温结果',
          key: 'address'
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
                  border: '0px',
                  color: '#01b0ff'
                },
                on: {
                  click: () => {
                    // this.updateDialogVisible = true
                    // this.dialogList.code.value = params.row.code
                    // this.dialogList.name.value = params.row.name
                    // this.dialogList.sex.value = params.row.sex
                    // this.dialogList.phoneNumber.value = params.row.phoneNumber
                    // this.dialogList.idCard.value = params.row.idCard
                    // this.dialogList.deptName.value = params.row.deptName
                    // this.dialogList.className.value = params.row.className
                    // this.dialogList.address.value = params.row.address
                    // this.dialogList.emergencyContact.value = params.row.emergencyContact
                    // this.dialogList.emergencyContactPhone.value = params.row.emergencyContactPhone
                    // // this.dialogList.seven_goto.value = params.row.seven_goto
                    // this.dialogList.address.isEdit = true
                    // this.dialogList.phoneNumber.isEdit = true
                    // this.dialogList.emergencyContact.isEdit = true
                    // this.dialogList.emergencyContactPhone.isEdit = true
                  }
                }
              }, '修改'),
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
                      // this.deleteStuInfoByCode(params.row.code)
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
                      border: '0px',
                      color: '#01b0ff'
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
      data1: [
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ],
      addInfo: {
        code: '',
        protectorName: '',
        nucleicAcidTime: '',
        nucleicAcidKey: 0,
        temperature: 37
      }
    }
  },
  created() {
    // this.associationList.push(this.addList1.associates.value)
    this.getEpidemicPreventionPersonnel()
  },
  methods: {
    close() {
      this.$emit('switchAdd', false)
    },
    getEpidemicPreventionPersonnel() {
      GetEpidemicPreventionPersonnel().then(res => {
        res.field.forEach(item => {
          this.associationList.push({
            deptCode: item.deptCode,
            name: item.name
          })
        })
      })
    },
    getIsolationInfoListByCode() {
      const queryInfo = {
        pageNum: '1',
        pageSize: '10',
        code: this.addList1.code
      }
      GetIsolationInfoListByCode(queryInfo).then( res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.model-box {
  display: flex;
  flex-direction: column;
  .top-box {
    flex-basis: 40%;
    display: flex;
    flex-wrap: wrap;
    .modal-item {
      width: 50%;
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 16px;
      .null {
        flex-basis: 5%;
      }
      .star {
        flex-basis: 3%;
      }
      .title {
        color: #050505;
        font-weight: 500;
        font-size: 18px;
        flex-basis: 35%;
        text-align: right;
        line-height: 30px;
      }
      .core {
        color: #6c6a6a;
        flex-basis: 55%;
      }
    }
  }
  .mid-box {
    display: flex;
    .mid-box-left {
      margin-top: 1em;
      color: #050505;
      font-weight: 500;
      font-size: 18px;
      text-align: right;
      flex-basis: 20%;
    }
    .mid-box-right {
      flex-basis: 72%;
      .add-condition {
        margin-top: 1em;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        height: 80px;
      }
    }
  }
  .footer-box {
    padding: 0 2em;
  }
}
</style>
