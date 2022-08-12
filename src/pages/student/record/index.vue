<template>
  <div class="page-container" v-if="submitSuccess">
    <div class="top-box">
      <div class="top-title">
        <em class="iconfont icon-close" style="font-weight: bold" @click="backHome"></em>
        <h2>14天返校行程</h2>
      </div>
      <img class="img-style" src="../../../assets/images/top.png" alt="">
    </div>
    <div class="mid-box">
      <div class="basic">
        <div class="form-title">基本信息</div>
        <div class="form-content">
          <Form ref="formInline" :rules="ruleValidate" :model="formItem">
            <Form-item prop="code">
              <div class="form-label">学号</div>
              <Input type="text" v-model="formItem.code" class="input-style"></Input>
            </Form-item>
            <Form-item prop="name">
              <div class="form-label">姓名</div>
              <Input type="text" v-model="formItem.name"></Input>
            </Form-item>
          </Form>
        </div>
      </div>
      <div class="whereabouts">
        <div class="form-title">14天内行程</div>
        <Form ref="formDynamic" :model="formDynamic" :label-width="90">
          <Form-item
            v-for="(item, index) in formDynamic.items"
            :key="item"
            style="padding: 0 1em 0 1em;"
            :label="'行程记录' + (index + 1)"
          >
            <Row>
              <Col span="18" style="display: flex">
                <Cascader :data="provinceData" @on-change="loadData"></Cascader>
                <p></p>
                <Cascader :data="cityData" v-model="item.value" @on-change="getCityCode"></Cascader>
              </Col>
              <Col span="4" offset="1">
                <Button type="error" @click="handleRemove(index)">删除</Button>
              </Col>
              <span style="color: #fe0022" v-show="trackRule">行程记录不能为空！</span>
              <Col span="2" offset="1">
              </Col>
            </Row>
          </Form-item>
          <Form-item>
            <Row>
              <Col span="12">
                <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
              </Col>
            </Row>
          </Form-item>
        </Form>
      </div>
    </div>
    <div class="btn-box">
      <Button type="primary" style="width:90vw; height: 12vw" size="large" @click="recordSubmit">提交</Button>
    </div>
    <div class="footer">
      <i-copyright class="template-login-data-copyright" />
    </div>
  </div>
  <div v-else class="page-success">
    <div class="success-box">
      <div class="top-title">
        <em class="iconfont icon-arrow-left-bold" @click="backPrev"></em>
        <h2>行程记录信息</h2>
        <em class="iconfont icon-close" style="font-weight: bold" @click="backHome"></em>
      </div>
      <img class="img-submit" src="../../../assets/images/subSuccess.png" alt="">
      <span class="submit-title">提交成功</span>
    </div>
  </div>
</template>
<script>
import { GetCityList, GetProvinceList } from '@api/administorators/riskArea'
import { SubStuRecord } from '@api/student/stu'
import { mapActions } from 'vuex'
import md5 from 'js-md5'
import iCopyright from '@/components/copyright'
export default {
  name: 'dashboard-console',
  components: { iCopyright },
  data() {
    return {
      formDynamic: {
        items: [
          {
            value: ''
          }
        ]
      },
      formItem: {
        code: '',
        name: ''
      },
      data: [],
      submitSuccess: true,
      provinceValue: '',
      provinceData: [],
      cityValue: '',
      cityData: [],
      travelRecordList: [],
      ruleValidate: {
        code: [
          { required: true, message: '学号不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      },
      trackRule: false
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
    getCityCode(value) { // 获得市区的编号
      if (this.travelRecordList.length < this.formDynamic.items.length) {
        this.travelRecordList.push(value[0])
      } else if (this.travelRecordList.length === this.formDynamic.items.length) {
        this.travelRecordList.splice(this.travelRecordList.length - 1, 1)
        this.travelRecordList.push(value[0])
      }
    },
    recordSubmit() {
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          if (this.travelRecordList.length > 0) {
            this.trackRule = false
            const list = {
              code: this.formItem.code,
              cityList: this.travelRecordList
            }
            SubStuRecord(list).then(() => {
              this.submitSuccess = false
              this.formItem.code = ''
              this.formItem.name = ''
              this.provinceValue = ''
              this.cityValue = ''
            })
          } else {
            console.log(this.travelRecordList)
            this.trackRule = true
          }
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    handleAdd() {
      this.formDynamic.items.push({
        value: ''
      })
    },
    handleRemove(index) {
      this.formDynamic.items.splice(index, 1)
      this.travelRecordList.splice(index, 1)
    },
    getProvinceList() {
      const arrays = []
      GetProvinceList().then((res) => {
        console.log(res)
        res.forEach(ele => {
          arrays.push({
            level: 1,
            label: ele.label,
            value: ele.value,
            children: []
          })
        })
        this.provinceData = arrays
        console.log(this.data)
      })
    },
    loadData(value) {
      this.getCityListByValue(value[0])
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
    backHome() {
      window.location.href = 'about:blank'
      window.close()
    },
    backPrev() {
      this.submitSuccess = true
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
      align-items: center;
      padding: 0 10px;
      em {
        font-size: 2em;
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
      display: flex;
      flex-direction: column;
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  }
}
.form-title {
  font-size: 1.4em;
  color: #000;
  flex-basis: 25%;
  margin-left: 6%;
  line-height: 2em;
}
</style>
