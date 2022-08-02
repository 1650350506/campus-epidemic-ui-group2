<template>
  <div class="page-container">
    <div class="top-box">
      <div class="top-title">
        <i class="ivu-icon ivu-icon-ios-close" @click="backHome"></i>
        <h2>出校信息填写</h2>
      </div>
      <img class="img-style" src="../../../assets/images/top.png" alt="">
    </div>
    <div class="mid-box">
      <div class="basic">
        <div class="form-title">基本信息</div>
        <div class="form-content">
          <Form ref="formInline">
            <Form-item>
              <div class="form-label">学号</div>
              <Input type="text" v-model="formItem.code" class="input-style"></Input>
            </Form-item>
            <Form-item>
              <div class="form-label">姓名</div>
              <Input type="text" v-model="formItem.name" @on-blur="checkStu"></Input>
            </Form-item>
          </Form>
        </div>
      </div>
      <div class="whereabouts">
        <div class="form-goto">
          <span>行程范围</span>
          <Radio-group v-model="formItem.type" @on-change="changeAddress">
            <Radio label="本市"></Radio>
            <Radio label="跨市"></Radio>
          </Radio-group>
        </div>
        <div class="form-msg">
          <div class="form-title">去向信息</div>
          <div class="msg-content">
            <div class="msg-item">
              <div class="msg-left">地区</div>
              <div class="msg-right" style="display: flex; flex-direction: column">
                <Cascader placeholder="选择省" style="width: 18em" :data="provinceData" v-model="provinceValue" @on-change="loadData"></Cascader>
                <Cascader placeholder="选择市" style="width: 18em" :data="cityData" v-model="cityValue" @on-change="loadData"></Cascader>
                <Cascader placeholder="选择区" style="width: 18em" v-show="is_Local" :data="countyData" v-model="countyValue" @on-change="loadData"></Cascader>
                <Cascader placeholder="选择街道" style="width: 18em" v-show="is_Local" :data="streetData" v-model="streetValue" @on-change="loadData"></Cascader>
              </div>
            </div>
            <div class="msg-item">
              <div class="msg-left">详细地址</div>
              <div class="msg-right">
                <Input placeholder="小区楼栋/乡村名称" style="width: 18em" v-model="formItem.whereDetail"></Input>
              </div>
            </div>
          </div>
        </div>
        <Button class="btn" type="primary" @click="subMsg">提交</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { GetCityList, GetCountyList, GetProvinceList, GetStreetList } from '@api/administorators/riskArea'
import { CheckStudent, SubStuBack, SubStuLeave } from '@api/stu/stu'

export default {
  name: 'dashboard-console',
  data() {
    return {
      formItem: {
        code: '',
        name: '',
        type: 0,
        whereCode: '',
        whereDetail: ''
      },
      provinceValue: '',
      provinceData: [],
      cityValue: '',
      cityData: [],
      countyValue: '',
      countyData: [],
      streetValue: '',
      streetData: [],
      is_Local: false
    }
  },
  created() {
    this.getProvinceList()
  },
  methods: {
    changeAddress() {
      if (this.formItem.type === '本市') {
        this.is_Local = true
      } else if (this.formItem.type === '跨市') {
        this.is_Local = false
      }
      console.log(this.is_Local)
    },
    subMsg() {
      if (this.formItem.type === '本市') {
        this.formItem.type = 0
      } else if (this.formItem.type === '跨市') {
        this.formItem.type = 1
      }
      this.formItem.whereCode = this.streetValue[0]
      console.log(this.formItem)
      SubStuLeave(this.formItem).then(() => {
        this.$Message.success('离校信息提交成功！')
      })
    },
    checkStu() {
      CheckStudent(this.formItem).then((res) => {
        if (res === 0) {
          this.$Message.success('学生信息校验失败！请检查是否输入正确！')
        }
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!')
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    handleAdd() {
      this.formItem.region.items.push({
        value: ''
      })
    },
    handleRemove(index) {
      this.formItem.region.items.splice(index, 1)
    },
    backHome() {
      this.$router.replace('/login')
    },
    getProvinceList() {
      const arrays = []
      GetProvinceList().then((res) => {
        console.log(res)
        res.forEach(ele => {
          arrays.push({
            level: 1,
            label: ele.label,
            value: ele.value
          })
        })
        this.provinceData = arrays
      })
    },
    loadData(value, selectedData) {
      if (selectedData[0].level === 1) {
        this.getCityListByValue(value[0])
      } else if (selectedData[0].level === 2) {
        this.getCountyListByValue(value[0])
      } else if (selectedData[0].level === 3) {
        console.log(value[0])
        this.getStreetListByValue(value[0])
      }
    },
    getCityListByValue(val) {
      const valueList = { value: val }
      const arrays = []
      GetCityList(valueList).then((res) => {
        res.forEach(ele => {
          arrays.push({
            level: 2,
            label: ele.label,
            value: ele.value
          })
        })
      })
      this.cityData = arrays
    },
    getCountyListByValue(val) {
      const valueList = { value: val }
      const arrays = []
      GetCountyList(valueList).then((res) => {
        res.forEach(ele => {
          arrays.push({
            level: 3,
            label: ele.label,
            value: ele.value
          })
        })
      })
      this.countyData = arrays
    },
    getStreetListByValue(val) {
      const valueList = { value: val }
      const arrays = []
      GetStreetList(valueList).then((res) => {
        res.forEach(ele => {
          arrays.push({
            level: 4,
            label: ele.label,
            value: ele.value
          })
        })
      })
      this.streetData = arrays
      console.log(this.streetData)
    }
  }
}
</script>
<style  lang="less" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  .top-box {
    width: 100%;
    height: 30vh;
    .top-title {
      position: relative;
      background: #346DF4;
      border: #346DF4 1px solid;
      height: 6vh;
      width: 100%;
      display: flex;
      i {
        font-weight: bold;
        font-size: 3em;
        color: #ffffff;
      }
      h2 {
        color: #F7F7F7;
        position: absolute;
        margin: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .img-style {
      width: 100%;
      height: 25vh;
    }
  }
  .mid-box {
    margin-top: 1em;
    height: 60vh;
    display: flex;
    flex-direction: column;
    .basic {
      flex-basis: 40%;
      display: flex;
      flex-direction: column;
      .form-title {
        font-size: 1.4em;
        color: #000;
        flex-basis: 25%;
        margin-left: 6%;
        line-height: 2em;
      }
      .form-content {
        flex: 1;
        padding: 2em 3em 0;
        ::v-deep .ivu-input {
          border-top: 0;
          border-left: 0;
          border-right: 0;
        }
        //::v-deep .ivu-form-item {
        //  margin: 3em 0 0;
        //  background: #1d42ab;
        //}
        .form-label {
          position: absolute;
          left: 0%;
          top: -100%;
          font-size: 1.2em;
          z-index: 99;
        }
      }
    }
    .whereabouts {
      flex: 1;
      display: flex;
      flex-direction: column;
      .form-goto {
        flex-basis: 25%;
        font-size: 1.4em;
        color: #000;
        display: flex;
        span {
          margin-left: 6%;
          margin-right: 5%;
        }
        ::v-deep .ivu-btn {
          margin-left: 2em;
        }
      }
      .form-msg {
        flex: 1;
        display: flex;
        flex-direction: column;
        .form-title {
          font-size: 1.4em;
          color: #000;
          flex-basis: 18%;
          margin-left: 6%;
          line-height: 2em;
        }
        .msg-content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          .msg-item {
            flex-basis: 36%;
            display: flex;
            align-items: center;
            .msg-left {
              text-align: right;
              flex-basis: 20%;
              font-size: 1.2em;
            }
            .msg-right {
              display: flex;
              margin-left: 1em;
            }
          }
        }
      }
      .btn {
        margin: 2em 2em;
        height: 3em;
        font-size: 1.2em;
      }
    }
  }
}
</style>
