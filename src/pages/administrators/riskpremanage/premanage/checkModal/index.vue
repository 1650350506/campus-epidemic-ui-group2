<template>
  <div>
    <Modal v-model="checkSwitch" @on-cancel="close" width="720" :styles="{top: '20px'}">
      <p slot="header" style="text-align: left; font-size: 20px">查看</p>
      <div class="model-list-title">基础信息</div>
      <div class="model-box">
        <div class="top-box">
          <div class="modal-item" v-for="(item, index) in checkList1" :key="index">
            <div class="null"></div><div class="title">{{item.title}}:</div><div class="star"></div>
            <div class="core">{{item.value}}</div>
          </div>
        </div>
        <div class="mid-box">
          <div class="mid-box-left">监测信息:</div>
          <div style="flex-basis: 4%"></div>
          <div class="mid-box-right">
            <Table border :columns="columns" :data="msgList" height="220" style="margin-top: 2em"></Table>
          </div>
        </div>
        <div class="mid-box">
          <div class="mid-box-left">服务记录:</div>
          <div style="flex-basis: 4%"></div>
          <div class="mid-box-right">
            <Table border :columns="columns1" :data="serviceList" height="120" style="margin-top: 2em"></Table>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button @click="close" type="primary">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'CheckContent',
  props: ['checkSwitch', 'checkList1', 'msgList', 'serviceList'],
  data() {
    return {
      columns: [
        {
          title: '检测时间',
          key: 'nucleicAcidTime',
          align: 'center',
          width: '180'
        },
        {
          title: '核酸结果',
          align: 'center',
          key: 'nucleicAcidKey',
          render: (h, params) => {
            // let key
            // if (params.row.nucleicAcidKey === 1) {
            //   key = '阳性'
            // } else {
            //   key = '阴性'
            // }
            const keyArray = ['阴性', '阳性']
            const key = keyArray[params.row.nucleicAcidKey] || '阴性'
            return h('span', key)
          }
        },
        {
          title: '测温结果',
          align: 'center',
          key: 'temperature',
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
        }
      ],
      columns1: [
        {
          title: '隔离开始时间',
          key: 'startTime',
          align: 'center',
          width: '170'
        },
        {
          title: '隔离结束时间',
          key: 'endTime',
          align: 'center',
          width: '170'
        },
        {
          title: '隔离原因',
          align: 'center',
          key: 'isolationReason'
        }
      ],
      data1: []
    }
  },
  methods: {
    close() {
      this.$emit('switchCheck', false)
    }

  }
}
</script>

<style lang="less" scoped>
</style>
