<template>
  <div class="page-container" v-if="submitSuccess">
    <div class="top-box">
      <div class="top-title">
        <em class="iconfont icon-close" style="font-weight: bold" @click="backHome"></em>
        <h2>出校信息填写</h2>
      </div>
      <img class="img-style" src="../../../assets/images/top.png" alt="">
    </div>
    <div class="mid-box">
      <Form ref="formInline" :rules="ruleValidate" :model="formItem">
        <div class="basic">
          <div class="form-title">基本信息</div>
          <div class="form-content">
            <Form-item prop="code">
              <div class="form-label">学号</div>
              <Input type="text" v-model="formItem.code" class="input-style"></Input>
            </Form-item>
            <Form-item prop="name">
              <div class="form-label">姓名</div>
              <Input type="text" v-model="formItem.name"></Input>
            </Form-item>
          </div>
        </div>
        <div class="whereabouts">
          <div class="form-goto">
            <span>行程范围</span>
            <Form-item prop="type">
              <Radio-group v-model="formItem.type"  @on-change="changeAddress">
                <Radio label="本市">本市</Radio>
                <Radio label="跨市">跨市</Radio>
              </Radio-group>
            </Form-item>
          </div>
          <div class="form-msg">
            <div class="form-title">去向信息</div>
            <div class="msg-content">
              <div class="msg-item">
                <div class="msg-left">地区</div>
                <div class="msg-right" style="display: flex; flex-direction: column">
                  <div style="display: flex">
                    <Cascader placeholder="选择省" style="width: 5rem; margin: 0 1rem 1rem 0" :data="provinceData" v-model="provinceValue" @on-change="loadData"></Cascader>
                    <Cascader placeholder="选择市" style="width: 5rem; margin: 0 1rem 1rem 0" :data="cityData" v-model="cityValue" @on-change="loadData"></Cascader>
                    <Cascader placeholder="选择区" style="width: 5rem" v-if="is_Local" :data="countyData" v-model="countyValue" @on-change="loadData"></Cascader>
                  </div>
                  <div style="display: flex">
                    <Cascader placeholder="选择街道" style="width: 8rem;margin: 0 1rem 1rem 0"  v-if="is_Local" :data="streetData" v-model="streetValue" @on-change="loadData"></Cascader>
                    <Cascader placeholder="选择社区" style="width: 8rem"  v-if="is_Local" :data="townData" v-model="townValue" @on-change="loadData"></Cascader>
                  </div>
                </div>
              </div>
              <div class="msg-item">
                <div class="msg-left">详细地址</div>
                <div class="msg-right">
                  <form-item prop="whereDetail">
                    <Input placeholder="详细地址" style="width: 17rem" v-model="formItem.whereDetail"></Input>
                  </form-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
    <div class="btn-box">
      <Button type="primary" style="width:90vw; height: 12vw" size="large" @click="subMsg">提交</Button>
    </div>
    <div class="footer">
      <i-copyright class="template-login-data-copyright" />
    </div>
  </div>
  <div v-else class="page-success">
    <div class="success-box">
      <div class="top-title">
        <em class="iconfont icon-arrow-left-bold" @click="backPrev"></em>
        <h2>离校信息填写</h2>
        <em class="iconfont icon-close" style="font-weight: bold" @click="backHome"></em>
      </div>
      <img class="img-submit" src="../../../assets/images/subSuccess.png" alt="">
      <span class="submit-title">提交成功</span>
    </div>
  </div>
</template>
<script>
import {
  GetCityList,
  GetCountyList,
  GetProvinceList,
  GetRiskInfoListByTown,
  GetStreetList
} from '@api/administorators/riskArea'
import md5 from 'js-md5'
import { mapActions } from 'vuex'
import iCopyright from '@/components/copyright'
import { SubStuLeave } from '@/api/student/stu'
export default {
  name: 'dashboard-console',
  components: { iCopyright },
  data() {
    return {
      formItem: {
        code: '',
        name: '',
        type: null,
        whereCode: '',
        whereDetail: ''
      },
      provinceValue: [],
      provinceData: [],
      cityValue: [],
      cityData: [],
      countyValue: [],
      countyData: [],
      streetValue: [],
      streetData: [],
      townData: [],
      townValue: [],
      is_Local: false,
      submitSuccess: true,
      ruleValidate: {
        code: [
          { required: true, message: '学号不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '城市类型不能为空', trigger: 'change' }
        ],
        whereDetail: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.StuBack()
  },
  methods: {
    ...mapActions('admin/account', [
      'login'
    ]),
    StuBack() {
      const username = 'admin456'
      let password = 'Admin456'
      password = md5(password)
      this.login({
        username,
        password
      })
        .then(() => {
          this.getProvinceList()
        })
        .catch(error => {
          this.$log.error(error)
          this.$Message.error(error.message)
        })
    },
    changeAddress() {
      if (this.formItem.type === '本市') {
        this.is_Local = true
      } else if (this.formItem.type === '跨市') {
        this.is_Local = false
      }
    },
    subMsg() {
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          if (this.formItem.type === '本市') {
            [this.formItem.type, this.formItem.whereCode] = [0, this.townValue[0]]
          } else if (this.formItem.type === '跨市') {
            [this.formItem.type, this.formItem.whereCode] = [1, this.cityValue[0]]
          }
          SubStuLeave(this.formItem).then(() => {
            this.submitSuccess = false
            this.formItem.code = ''
            this.formItem.name = ''
          })
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    backHome() {
      window.location.href = 'about:blank'
      window.close()
    },
    backPrev() {
      this.submitSuccess = true
      window.location.reload()
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
        this.cityValue = ''
        this.countyValue = ''
        this.streetValue = ''
        this.townValue = ''
      } else if (selectedData[0].level === 2) {
        this.getCountyListByValue(value[0])
        this.countyValue = ''
        this.streetValue = ''
        this.townValue = ''
      } else if (selectedData[0].level === 3) {
        this.streetValue = ''
        this.townValue = ''
        this.getStreetListByValue(value[0])
      } else if (selectedData[0].level === 4) {
        this.getRiskInfoListByTown(value[0])
        this.townValue = ''
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
    },
    getRiskInfoListByTown(val) {
      const valueList = { value: val }
      const arrays = []
      GetRiskInfoListByTown(valueList).then((res) => {
        console.log(res)
        res.field.forEach(ele => {
          arrays.push({
            level: 5,
            label: ele.label,
            value: ele.value
          })
        })
      })
      this.townData = arrays
    }
  }
}
</script>
<style  lang="less" scoped>
.page-container {
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
      em {
        margin-left: 2vw;
        font-size: 2rem;
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
        padding: 2rem 2rem 0 1.7rem;
        ::v-deep .ivu-input {
          border-top: 0;
          border-left: 0;
          border-right: 0;
          border-radius: 0;
          background: #F7F7F7;
        }
        ::v-deep .ivu-form-item-error-tip {
          margin-left: 20%;
        }
        .form-label {
          position: absolute;
          left: -1%;
          top: -80%;
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
        flex-basis: 20%;
        font-size: 1.4em;
        color: #000;
        display: flex;
        align-items: flex-start;
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
            align-items: flex-start;
            .msg-left {
              font-size: 1rem;
              display: flex;
              text-align: right;
              padding-left: 6%;
              flex-basis: 24%;
            }
            .msg-right {
              display: flex;
              margin-left: 1em;
            }
          }
        }
      }
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  }
}
</style>
