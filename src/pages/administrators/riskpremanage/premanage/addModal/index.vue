<template>
  <div>
    <Modal v-model="addSwitch" @on-cancel="close" width="720" :styles="{top: '20px'}">
      <p slot="header" style="text-align: left">添加隔离记录</p>
      <div class="model-box">
        <div class="model-list-title">基础信息</div>
        <div class="top-box">
          <div class="modal-item" v-for="(item, index) in addList1" :key="index" v-show="item.title !== '关联防疫人员'">
            <div class="null"></div><div class="title">{{item.title}}</div><div class="star"></div>
            <div class="core"><span>{{item.value}}</span></div>
          </div>
        </div>
        <div class="mid-box">
          <div class="model-list-title">监测信息</div>
          <div class="mid-box-right">
            <div class="add-condition">
              <div class="modal-item">
                <div class="null"></div><div class="title"><span>监测时间</span></div><div class="star"></div>
                <div class="core"><Date-picker type="datetime" v-model="addInfo.nucleicAcidTime" placeholder="选择日期" class="times"></Date-picker></div>
              </div>
              <div class="modal-item">
                <div class="null"></div><div class="title"><span>关联防疫人员</span></div><div class="star"></div>
                <div class="core"> <Select  v-model="addInfo.protector">
                  <Option v-for="(item, index) in associationList" :value="item.deptCode" :key="index">{{ item.name }}</Option>
                </Select>
                </div>
              </div>
              <div class="modal-item">
                <div class="null"></div><div class="title"><span>核酸结果</span></div><div class="star"></div>
                <div class="core">
                  <Radio-group v-model="addInfo.nucleicAcidKey" style="display: flex;justify-content: space-evenly">
                    <Radio label="0">阴性</Radio>
                    <Radio label="1">阳性</Radio>
                  </Radio-group>
                </div>
              </div>
              <div class="modal-item">
                <div class="null"></div><div class="title"><span>测温结果</span></div><div class="star"></div>
                <div class="core">
                  <Radio-group v-model="addInfo.temperature" style="display: flex;justify-content: space-evenly">
                    <Radio label="36">正常</Radio>
                    <Radio label="38">异常</Radio>
                  </Radio-group>
                </div>
              </div>
            </div>
            <div style="display: flex; justify-content: end;margin-right: 4%">
              <Button type="primary" @click="addRecord">添加</Button>
            </div>
          </div>
        </div>
        <div class="footer-box">
          <Table border :columns="columns" size="small" :data="msgList" height="300" style="margin: 2em 0 0 2em;"></Table>
        </div>
      </div>
      <div slot="footer">
        <Button @click="close" type="primary">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  AddIsolationRecord, DeleteRecordById,
  GetEpidemicPreventionPersonnel
} from '@api/personnel/riskpremanage'
import { dateFormat } from '@/utils/date'

export default {
  name: 'AddContent',
  props: ['addSwitch', 'addList1', 'msgList'],
  data() {
    return {
      associationList: [],
      associatesModel: '',
      columns: [
        {
          title: '监测时间',
          key: 'nucleicAcidTime',
          align: 'left',
          width: '180'
        },
        {
          title: '核酸结果',
          key: 'nucleicAcidKey',
          align: 'center',
          render: (h, params) => {
            // let key
            // if (params.row.nucleicAcidKey === 1) {
            //   key = '阳性'
            // } else if (params.row.nucleicAcidKey === 0) {
            //   key = '阴性'
            // } else {
            //   key = '------'
            // }
            const keyArray = ['阴性', '阳性']
            const key = keyArray[params.row.nucleicAcidKey] || '------'
            return h('span', key)
          }
        },
        {
          title: '体温',
          key: 'temperature',
          align: 'center',
          render: (h, params) => {
            let temp
            let colors
            switch (params.row.temperature) {
              case 36:
                temp = '正常'
                colors = '#0f7419'
                break
              case 38:
                temp = '异常'
                colors = '#d71313'
                break
              default:
                temp = '------'
                colors = 'transparent'
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
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              [
                h('Poptip', {
                  props: {
                    placement: 'top-start',
                    confirm: true,
                    transfer: true,
                    title: '确定删除这条隔离记录吗？'
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteIsolateRecordById(params.row.id, params.row.code)
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
      data1: [],
      addInfo: {
        code: '',
        nucleicAcidKey: null,
        nucleicAcidTime: '',
        protector: '',
        temperature: null
      }
    }
  },
  watch: {
    addSwitch: function (newVal) {
      if (newVal === false) {
        this.addInfo = {
          code: '',
          nucleicAcidKey: null,
          nucleicAcidTime: '',
          protector: '',
          temperature: null
        }
      }
    }
  },
  created() {
    this.getEpidemicPreventionPersonnel()
  },
  methods: {
    dateFormat(time) {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },
    getStuCode() {
      this.addInfo.code = this.addList1.code.value
    },
    close() {
      this.$emit('switchAdd', false)
    },
    getEpidemicPreventionPersonnel() { // 获取全部的关联人员
      GetEpidemicPreventionPersonnel().then(res => {
        res.field.forEach(item => {
          this.associationList.push({
            deptCode: item.code,
            name: item.name
          })
        })
      })
    },
    addRecord() { //  新增隔离记录
      this.getStuCode()
      if (this.addInfo.nucleicAcidKey !== null && this.addInfo.temperature !== null) {
        this.addInfo.nucleicAcidTime = dateFormat(this.addInfo.nucleicAcidTime, 0)
        AddIsolationRecord(this.addInfo).then(() => {
          this.$Message.success('添加隔离记录成功')
          this.$emit('update', this.addInfo.code)
          this.addInfo.nucleicAcidKey = null
          this.addInfo.nucleicAcidTime = null
          this.addInfo.protector = null
          this.addInfo.temperature = null
        })
      } else {
        this.$Message.error('核酸结果和测温结果不能为空！')
      }
    },
    deleteIsolateRecordById(id, code) {
      DeleteRecordById({ id: id }).then(() => {
        this.$Message.success('删除一条隔离记录')
        this.$emit('update', code)
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
        font-size: 16px;
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
    margin: 1em 0 0;
    display: flex;
    flex-direction: column;
    .mid-box-right {
      margin-top: 0%;
      flex-basis: 72%;
      .add-condition {
        color: #000;
        margin-top: 1em;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        height: 80px;
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
            font-size: 16px;
            flex-basis: 35%;
            text-align: right;
            line-height: 30px;
            span {
              position: relative;
              &::after {
                content: "*";
                position: absolute;
                font-size: 1.2rem;
                color: red;
                left: -6%;
                top: 64%;
                transform: translate(-50%, -50%);
              }
            }
          }
          .core {
            color: #6c6a6a;
            flex-basis: 47%;
          }
        }
      }
    }
  }
  .footer-box {
    padding: 0 2em;
  }
}
.mid-box-left {
  margin-top: 1em;
  color: #050505;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  flex-basis: 20%;
}
.model-list-title {
  margin-top: 5px;
  margin-left: 4%;
  font-size: 18px;
  color: #000;
}
</style>
