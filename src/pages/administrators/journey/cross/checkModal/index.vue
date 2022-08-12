<template>
  <div>
    <Modal v-model="checkSwitch" @on-cancel="close" width="720" :styles="{top: '20px'}">
      <p slot="header" style="text-align: left; font-size: 20px">查看</p>
      <div class="model-box">
        <div class="model-list-title">基础信息</div>
        <div class="top-box">
          <div class="modal-item" v-for="(item, index) in checkList1" :key="index">
            <div class="null"></div><div class="title">{{item.title}}:</div><div class="star"></div>
            <div class="core">{{item.value}}</div>
          </div>
        </div>
        <div class="model-list-title">14天返校行程</div>
        <div class="mid-box">
          <div class="mid-box-left"></div>
          <div class="mid-box-right">
            <Table border :columns="columns"  height="160" :data="data"></Table>
          </div>
        </div>
        <div class="model-list-title">出入校信息</div>
        <div class="mid-box">
          <div class="mid-box-left"></div>
          <div class="mid-box-right">
            <Table border :columns="columns1" size="small" height="160" :data="data1"></Table>
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
import { GetJourneyInfoList, GetOutSchoolList } from '@/api/administorators/journery'
import { toolTip } from '@/util/tool/enum'

export default {
  name: 'checkLocal',
  props: ['checkSwitch', 'checkList1'],
  data() {
    return {
      queryInfo: {
        code: ''
      },
      columns: [
        {
          title: '行程地点',
          key: 'addressName',
          align: 'center'
        }
      ],
      columns1: [
        {
          title: '离校时间',
          key: 'startTime'
        },
        {
          title: '入校时间',
          key: 'endTime'
        },
        {
          title: '去向信息',
          key: 'destinationInformation',
          render: (h, params) => {
            return toolTip(h, 2, params.row.destinationInformation)
          }
        },
        {
          title: '途经地点',
          key: 'waypoint',
          render: (h, params) => {
            return toolTip(h, 2, params.row.waypoint)
          }
        }
      ],
      data: [],
      data1: [],
      list1: []
    }
  },
  watch: {
    checkSwitch: {
      handler(val) {
        if (val) {
          this.queryInfo.code = this.checkList1.code.value
          this.getJourneyInfoList()
          this.getOutSchoolListByCode()
        }
      }
    }
  },
  methods: {
    close() {
      this.$emit('switchCheck', false)
    },
    getJourneyInfoList() {
      GetJourneyInfoList(this.queryInfo).then((res) => {
        this.data = []
        res.forEach((item) => {
          this.data.push({
            addressName: item
          })
        })
      })
    },
    getOutSchoolListByCode() {
      GetOutSchoolList(this.queryInfo).then((res) => {
        this.data1 = []
        console.log('out')
        console.log(res)
        res.forEach((item) => {
          this.data1.push({
            startTime: item.startTime,
            endTime: item.endTime,
            waypoint: item.waypoint,
            destinationInformation: item.destinationInformation
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
