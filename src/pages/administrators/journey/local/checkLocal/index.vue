<template>
  <div>
    <Modal
      v-model="checkSwitch"
      @on-cancel="close"
      width="720"
      :styles="{top: '20px'}"
    >
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
            <Table border :columns="columns"  height="110" :data="crossList"></Table>
          </div>
        </div>
        <div class="model-list-title">出入校信息</div>
        <div class="mid-box">
          <div class="mid-box-left"></div>
          <div class="mid-box-right">
            <Table border :columns="columns1" class="auto-column-size-table" size="small" height="150" :data="outList"></Table>
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
import { toolTip } from '@/util/tool/enum'

export default {
  name: 'checkLocal',
  props: ['checkSwitch', 'checkList1', 'crossList', 'outList'],
  data() {
    return {
      columns: [
        {
          title: '行程地点',
          align: 'center',
          key: 'address'
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
          key: 'whereDetail',
          render: (h, params) => {
            return toolTip(h, 2, params.row.whereDetail)
          }
        },
        {
          title: '途经地点',
          key: 'travelRecord',
          render: (h, params) => {
            return toolTip(h, 2, params.row.travelRecord)
          }
        }
      ],
      data: [],
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
