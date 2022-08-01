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
        <div class="model-list-title">日常出校信息</div>
        <div class="mid-box">
          <div class="mid-box-left"></div>
          <div class="mid-box-right">
            <Table border :columns="columns1" size="small" height="150" :data="outList"></Table>
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
  name: 'checkLocal',
  props: ['checkSwitch', 'checkList1', 'crossList', 'outList'],
  data() {
    return {
      columns: [
        {
          title: '行程地点',
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
          key: 'whereDetail'
        },
        {
          title: '途经地点',
          key: 'travelRecord'
        }
      ],
      data: [],
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
      ]
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
