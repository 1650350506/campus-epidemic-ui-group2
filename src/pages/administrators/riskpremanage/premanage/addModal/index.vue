<template>
  <div>
    <Modal v-model="addSwitch" @on-cancel="close" width="720" :styles="{top: '20px'}">
      <p slot="header" style="text-align: left">添加隔离记录</p>
      <div class="model-box">
        <div class="model-list-title">基础信息</div>
        <div class="top-box">
          <div class="modal-item" v-for="(item, index) in addList1" :key="index" v-show="item.title !== '关联防疫人员'">
            <div class="null"></div><div class="title">{{item.title}}:</div><div class="star"></div>
            <div class="core"><span>{{item.value}}</span></div>
          </div>
        </div>
        <div class="mid-box">
          <div class="mid-box-left">监测信息:</div>
          <div style="flex-basis: 2%"></div>
          <div class="mid-box-right">
            <div class="add-condition">
              <Date-picker type="datetime" v-model="addInfo.nucleicAcidTime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
              <div>关联防疫人员:
                <Select  v-model="addInfo.protector" style="width:90px">
                  <Option v-for="(item, index) in associationList" :value="item.deptCode" :key="index">{{ item.name }}</Option>
                </Select>
              </div>
              <div>核酸结果：
                <Radio-group v-model="addInfo.nucleicAcidKey">
                  <Radio label="0">阴性</Radio>
                  <Radio label="1">阳性</Radio>
                </Radio-group>
              </div>
              <div>
                测温结果：
                <Radio-group v-model="addInfo.temperature">
                  <Radio label="36">正常</Radio>
                  <Radio label="38">异常</Radio>
                </Radio-group>
              </div>
            </div>
            <div style="display: flex; justify-content: end">
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
            let key
            if (params.row.nucleicAcidKey === 1) {
              key = '阳性'
            } else if (params.row.nucleicAcidKey === 0) {
              key = '阴性'
            } else {
              key = '------'
            }
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
            if (params.row.temperature === 36) {
              temp = '正常'
              colors = '#0f7419'
            } else if (params.row.temperature === 38) {
              temp = '异常'
              colors = '#d71313'
            } else {
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
    // this.associationList.push(this.addList1.associates.value)
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
        this.addInfo.nucleicAcidTime = this.dateFormat(this.addInfo.nucleicAcidTime)
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
</style>
