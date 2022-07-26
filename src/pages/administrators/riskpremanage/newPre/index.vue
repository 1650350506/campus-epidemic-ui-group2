<template>
  <Modal
    v-model="newSwitch"
    @on-cancel="close"
    width="720"
    class-name="vertical-center-modal"
    :styles="{top: '20px'}"
  >
    <p slot="header" style="text-align: left; font-size: 20px; margin-left: 5%">添加隔离人员</p>
    <Input v-model="value" placeholder="请输入学号查询" style="width: 200px; margin-right: 10px; margin-left: 5%"></Input> <Button type="primary">查询</Button>
    <div class="mid-box">
      <div class="top">基本信息</div>
      <div class="modal-container">
        <div class="modal-item" v-for="(item, index) in checkList1" :key="index">
          <div class="null"></div><div class="title">{{item.title}}:</div><div class="star"></div>
          <div class="core">{{item.value}}</div>
        </div>
      </div>
    </div>
    <div class="footer-box">
      <div class="footer-item">
        <div class="title">隔离地点:</div>
        <div class="null"></div>
        <Select v-model="model1" style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="footer-item">
        <div class="title">隔离原因:</div>
        <div class="null"></div>
        <Select v-model="model1" style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="footer-item">
        <div class="title">隔离状态:</div>
        <div class="null"></div>
        <Select v-model="model1" style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="footer-item">
        <div class="title">隔离开始时间:</div>
        <div class="null"></div>
        <Select v-model="model1" style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <div slot="footer">
      <Button @click="close">关闭</Button>
      <Button type="primary">确认添加</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'index',
  props: ['newSwitch'],
  data() {
    return {
      checkList1: {
        name: {
          title: '姓名', value: '嘤嘤怪'
        },
        sex: {
          title: '性别', value: '女'
        },
        dept_code: {
          title: '二级学院', value: '计算机学院'
        },
        code: {
          title: '学号', value: '19223121'
        },
        class_name: {
          title: '班级', value: '19计科2班'
        },
        phone: {
          title: '手机号', value: '1390128312'
        }
      }
    }
  },
  methods: {
    close() {
      this.$emit('addClose', false)
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal{
    top: 0;
  }
}
.mid-box {
  display: flex;
  flex-direction: column;
  .top {
    font-size: 18px;
    margin: 10px 5%;
  }
}
.footer-box {
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  .footer-item {
    flex-basis: 50%;
    height: 40px;
    display: flex;
    align-items: center;
    .null {
      flex-basis: 4%;
    }
    .title {
      color: #000;
      font-size: 16px;
      flex-basis: 30%;
      text-align: right;
    }
  }
}
</style>
