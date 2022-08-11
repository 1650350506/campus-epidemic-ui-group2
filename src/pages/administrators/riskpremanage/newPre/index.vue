<template>
  <Modal
    v-model="newSwitch"
    @on-cancel="close"
    width="720"
    class-name="vertical-center-modal"
    :styles="{top: '20px'}"
  >
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
        <Select v-model="addInfo.state" style="width:200px">
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
import { GetStuInfoByCode, NewIsolatePre } from '@/api/personnel/riskpremanage'

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
        state: null,
        startTime: ''
      }
    }
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
    close() {
      this.$emit('addClose', false)
    },
    getStuInfoListByCode() {
      if (this.queryValue !== '') {
        GetStuInfoByCode({ code: this.queryValue }).then(res => {
          this.checkList1.code.value = res.field.code
          if (res.field.sex === 0) {
            this.checkList1.sex.value = '男'
          } else {
            this.checkList1.sex.value = '女'
          }
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
      this.addInfo.startTime = this.dateFormat(this.addInfo.startTime)
      if (this.addInfo.isolationLocation === '') {
        this.$Message.error('隔离地点不能为空！')
      } else if (this.addInfo.isolationReason === '') {
        this.$Message.error('隔离原因不能为空！')
      } else if (this.addInfo.state === null) {
        this.$Message.error('隔离状态不能为空！')
      } else {
        NewIsolatePre(this.addInfo).then(() => {
          this.$Message.success('新增隔离人员成功！')
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
      color: #000;
      font-size: 16px;
      flex-basis: 30%;
      text-align: right;
    }
  }
}
</style>
