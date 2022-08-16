<template>
  <div class="page-container" v-if="submitSuccess">
    <div class="top-box">
      <div class="top-title">
        <em class="iconfont icon-close" style="font-weight: bold" @click="backHome"></em>
        <h2>入校信息填写</h2>
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
              <Input type="text" v-model="formItem.code"></Input>
            </Form-item>
            <Form-item prop="name">
              <div class="form-label">姓名</div>
              <Input type="text" v-model="formItem.name"></Input>
            </Form-item>
          </Form>
        </div>
      </div>
      <div class="whereabouts">
        <div class="form-goto">
          <span>获取定位</span>
          <baidu-map :center="center" :zoom="zoom" style="height:30vh;width: 86vw;margin: 1rem auto 0">
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                            :showAddressBar="true"
                            :autoLocation="true"
                            @rightclick="getLocation"
                            @locationSuccess="getLocation"
                            @locationError="getLocationError"
            ></bm-geolocation>
          </baidu-map>
        </div>
        <div class="form-address">
          <p>途经地点  (跨市同学填写)</p>
          <Form ref="formDynamic" :model="formDynamic" :label-width="90">
            <Form-item
              v-for="(item, index) in formDynamic.items"
              style="padding: 0 1em 0 0"
              :key="item"
              :label="'地区' + (index + 1)"
              :prop="'items.' + index + '.value'"
              :rules="{required: true, message: '地点' + (index + 1) +'不能为空', trigger: 'blur'}"
            >
              <Row>
                <Col span="18" style="display: flex">
                  <Cascader :data="provinceData" @on-change="loadData"></Cascader>
                  <span></span>
                  <Cascader :data="cityData" v-model="item.value" @on-change="getCityCode"></Cascader>
                </Col>
                <Col span="4" offset="1">
                  <Button type="error" @click="handleRemove(index)">删除</Button>
                </Col>
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
        <h2>返校信息填写</h2>
        <em class="iconfont icon-close" style="font-weight: bold" @click="backHome"></em>
      </div>
      <img class="img-submit" src="../../../assets/images/subSuccess.png" alt="">
      <span class="submit-title">提交成功</span>
    </div>
  </div>
</template>
<script>
import { SubStuBack } from '@api/student/stu'
import { GetCityList, GetProvinceList } from '@api/administorators/riskArea'
import md5 from 'js-md5'
import { mapActions } from 'vuex'
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
      ruleValidate: {
        code: [
          { required: true, message: '学号不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      },
      provinceValue: '',
      provinceData: [],
      cityValue: '',
      cityData: [],
      travelRecordList: [],
      submitSuccess: true,
      center: { lng: 120.137629, lat: 30.2794 },
      zoom: 13,
      locate: false
    }
  },
  created() {
    this.StuBack()
  },
  mounted() {
    setTimeout(() => {
      this.baiduMap()
    }, 100)
  },
  methods: {
    ...mapActions('admin/account', [
      'login'
    ]),
    getLocation(point) {
      const addr = point.addressComponent
      this.$Message.success(`已定位到${addr.province}${addr.city}${addr.district}${addr.street}${addr.street}${addr.streetNumber}`)
      this.locate = true
    },
    getLocationError() {
      this.$Message.error('定位失败请刷新页面！')
    },
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
          // 异常情况
          this.$log.error(error)
          this.$Message.error(error.message)
        })
    },
    // 获得市区的编号
    getCityCode(value) {
      if (this.travelRecordList.length < this.formDynamic.items.length) {
        this.travelRecordList.push(value[0])
      } else if (this.travelRecordList.length === this.formDynamic.items.length) {
        this.travelRecordList.splice(this.travelRecordList.length - 1, 1)
        this.travelRecordList.push(value[0])
      }
    },
    subMsg() {
      if (this.locate === true) {
        const arrays = []
        this.formDynamic.items.forEach((item) => {
          arrays.push(item.value[1])
        })
        const list = {
          code: this.formItem.code,
          name: this.formItem.name,
          travelRecord: '',
          travelRecordList: this.travelRecordList
        }
        this.$refs.formInline.validate((valid) => {
          if (valid) {
            SubStuBack(list).then(() => {
              this.submitSuccess = false
              this.$refs.formInline.resetFields()
              this.provinceValue = ''
              this.cityValue = ''
            })
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      } else {
        this.$Message.error('必须先定位成功！才能提交！')
      }
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
    backHome() {
      window.location.href = 'about:blank'
      window.close()
    },
    backPrev() {
      this.submitSuccess = true
    },
    getProvinceList() {
      const arrays = []
      GetProvinceList().then((res) => {
        res.forEach(ele => {
          arrays.push({
            level: 1,
            label: ele.label,
            value: ele.value,
            children: []
          })
        })
        this.provinceData = arrays
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
    }
  }
}
</script>
<style  lang="less" scoped>
.map {
  width: 100%;
  height: 400px;
}

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
      em {
        margin-left: 2vw;
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
      flex: 1;
      display: flex;
      flex-direction: column;
      .form-goto {
        flex-basis: 25%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 1.4em;
        color: #000;
        span {
          margin-left: 6%;
          margin-right: 1%;
        }
      }
      .form-address {
        font-size: 1.4em;
        color: #000;
        p {
         margin: 0 1% 3% 6%;
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
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
  }
}
</style>
