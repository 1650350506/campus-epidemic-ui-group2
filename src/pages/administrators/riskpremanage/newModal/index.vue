<template>
  <Modal v-model="newSwitch" @on-cancel="close" width="720" class-name="vertical-center-modal" :styles="{top: '20px'}">
    <p slot="header" style="text-align: left; font-size: 20px; margin-left: 4%">添加隔离人员</p>
    <Input v-model="queryValue" placeholder="请输入学号查询" style="width: 200px; margin-right: 10px; margin-left: 4%"></Input> <Button type="primary" @click="getStuInfoListByCode">查询</Button>
    <div class="mid-box">
      <div class="top">基本信息</div>
      <div class="modal-container" v-if="checkList1.code.value!==''">
        <div class="modal-item" v-for="(item, index) in checkList1" :key="index">
          <div class="null"></div><div class="title">{{item.title}}:</div><div class="star"></div>
          <div class="core" style=" flex-basis: 50%;">{{item.value}}</div>
        </div>
      </div>
      <div class="modal-container" v-else>
        暂无数据
      </div>
    </div>
    <div class="footer-box">
      <div class="footer-item">
        <span class="title"><span>隔离状态</span></span>
        <div class="null"></div>
        <Select v-model="addInfo.state" style="width:200px" @on-change="hasRiskState">
          <Option  value="0">待隔离</Option>
          <Option  value="1">隔离中</Option>
          <Option  value="3">治疗中</Option>
        </Select>
      </div>
      <div class="footer-item">
        <span class="title"><span>隔离原因</span></span>
        <div class="null"></div>
        <Select v-model="addInfo.isolationReason" style="width:200px">
          <Option  value="自测体温异常">自测体温异常</Option>
          <Option  value="自测核酸异常">自测核酸异常</Option>
          <Option  value="经过风险地区">经过风险地区</Option>
          <Option  value="密切接触者">密切接触者</Option>
        </Select>
      </div>
      <div class="footer-item">
        <span class="title"><span>隔离地点</span></span>
        <div class="null"></div>
        <Select v-model="addInfo.isolationLocation" style="width:200px">
          <Option  value="医务室">医务室</Option>
          <Option  value="校园疫情防控中心">校园疫情防控中心</Option>
        </Select>
      </div>
      <div class="footer-item" v-if="showTimeInput">
        <span class="title"><span>隔离开始时间</span></span>
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
import { GetStuInfoByCode, NewIsolatePre } from '@/api/personnel/riskpremanage'
import { dateFormat } from '@/utils/date'

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
        deptName: {
          title: '二级学院', value: ''
        },
        code: {
          title: '学号', value: ''
        },
        className: {
          title: '班级', value: ''
        },
        phoneNumber: {
          title: '手机号', value: ''
        }
      },
      addInfo: {
        code: '',
        address: '',
        isolationLocation: '',
        isolationReason: '',
        state: '',
        startTime: ''
      },
      showTimeInput: true
    }
  },
  methods: {
    hasRiskState() {
      this.showTimeInput = this.addInfo.state !== '0'
    },
    close() {
      this.$emit('addClose', false)
      this.queryValue = ''
      this.checkList1.code.value = ''
      // eslint-disable-next-line guard-for-in
    },
    getStuInfoListByCode() {
      if (this.queryValue !== '') {
        GetStuInfoByCode({ code: this.queryValue }).then(res => {
          this.checkList1.code.value = res.field.code
          this.checkList1.sex.value = res.field.sex === 0 ? '男' : '女'
          this.checkList1.deptName.value = res.field.deptName
          this.checkList1.name.value = res.field.name
          this.checkList1.className.value = res.field.className
          this.checkList1.phoneNumber.value = res.field.phoneNumber
          this.addInfo.code = res.field.code
          this.addInfo.address = res.field.address
        })
      } else {
        this.checkList1.code.value = ''
        this.checkList1.sex.value = ''
        this.checkList1.deptName.value = ''
        this.checkList1.name.value = ''
        this.checkList1.className.value = ''
        this.checkList1.phoneNumber.value = ''
        this.addInfo.code = ''
        this.addInfo.address = ''
      }
    },
    addIsolatePersonnelInfo() {
      if (this.addInfo.isolationLocation === '') {
        this.$Message.error('隔离地点不能为空！')
      } else if (this.addInfo.isolationReason === '') {
        this.$Message.error('隔离原因不能为空！')
      } else if (this.addInfo.state === '') {
        this.$Message.error('隔离状态不能为空！')
      } else if (this.addInfo.code === '') {
        this.$Message.error('学生学号不能为空！')
      } else if (this.addInfo.startTime === '' && this.addInfo.state === '0') {
        NewIsolatePre(this.addInfo).then(() => {
          this.$Message.success('新增隔离人员成功！')
          // eslint-disable-next-line guard-for-in,no-unused-vars
          for (const value in this.addInfo) {
            this.addInfo[value] = ''
          }
          this.queryValue = ''
          this.checkList1.code.value = ''
        })
        this.close()
      } else {
        this.addInfo.startTime = dateFormat(this.addInfo.startTime, 0)
        NewIsolatePre(this.addInfo).then(() => {
          this.$Message.success('新增待隔离人员成功！')
          // eslint-disable-next-line guard-for-in,no-unused-vars
          for (const key in this.addInfo) {
            this.addInfo[key] = ''
          }
          this.queryValue = ''
          this.checkList1.code.value = ''
        })
        this.close()
      }
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
      position: relative;
      color: #000;
      font-size: 16px;
      flex-basis: 31%;
      text-align: right;
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
  }
}
</style>
