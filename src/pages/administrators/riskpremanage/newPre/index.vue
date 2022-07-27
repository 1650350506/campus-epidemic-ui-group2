<template>
  <Modal
    v-model="newSwitch"
    @on-cancel="close"
    width="720"
    class-name="vertical-center-modal"
    :styles="{top: '20px'}"
  >
    <p slot="header" style="text-align: left; font-size: 20px; margin-left: 4%">添加隔离人员</p>
    <Input v-model="queryValue" placeholder="请输入学号查询" style="width: 200px; margin-right: 10px; margin-left: 4%"></Input> <Button type="primary" @click="getIsolationInfoListByCode">查询</Button>
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
        <Select v-model="addInfo.isolationLocation" style="width:200px">
          <Option  value="医务室">医务室</Option>
          <Option  value="校园疫情防控中心">校园疫情防控中心</Option>
        </Select>
      </div>
      <div class="footer-item">
        <div class="title">隔离原因:</div>
        <div class="null"></div>
        <Select v-model="addInfo.isolationReason" style="width:200px">
          <Option  value="自测体温异常">自测体温异常</Option>
          <Option  value="自测核酸异常">自测核酸异常</Option>
          <Option  value="经过风险地区">经过风险地区</Option>
          <Option  value="密切接触者">密切接触者</Option>
        </Select>
      </div>
      <div class="footer-item">
        <div class="title">隔离状态:</div>
        <div class="null"></div>
        <Select v-model="addInfo.isolationState" style="width:200px">
          <Option  value="0">待隔离</Option>
          <Option  value="1">隔离中</Option>
          <Option  value="2">隔离结束</Option>
          <Option  value="3">治疗中</Option>
        </Select>
      </div>
      <div class="footer-item">
        <div class="title">隔离开始时间:</div>
        <div class="null"></div>
        <Date-picker type="datetime" placeholder="选择日期和时间" v-model="addInfo.startTime" style="width: 200px"></Date-picker>
      </div>
    </div>
    <div slot="footer">
      <Button @click="close">关闭</Button>
      <Button type="primary" @click="addIsolatePersonnelInfo">确认添加</Button>
    </div>
  </Modal>
</template>

<script>
import { GetIsolationInfoListByCode } from '../../../../api/personnel/riskpremanage'

export default {
  name: 'index',
  props: ['newSwitch'],
  data() {
    return {
      queryValue: '',
      checkList1: {
        name: {
          title: '姓名', value: ''
        },
        sex: {
          title: '性别', value: ''
        },
        dept_code: {
          title: '二级学院', value: ''
        },
        code: {
          title: '学号', value: ''
        },
        class_name: {
          title: '班级', value: ''
        },
        phone: {
          title: '手机号', value: ''
        }
      },
      addInfo: {
        code: '',
        address: '',
        isolationLocation: '',
        isolationReason: '',
        isolationState: 0,
        startTime: ''
      }
    }
  },
  methods: {
    close() {
      this.$emit('addClose', false)
    },
    getIsolationInfoListByCode() {
      GetIsolationInfoListByCode({ code: this.queryValue }).then(res => {
        console.log(res)
      })
    },
    addIsolatePersonnelInfo() {
      console.log(this.addInfo)
      this.close()
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
    margin: 10px 4%;
  }
}
.footer-box {
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  .footer-item {
    flex-basis: 49%;
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
