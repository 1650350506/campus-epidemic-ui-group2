<template>
  <div class="page-container">
    <div class="top-box">
      <div class="top-title">
        <em class="ivu-icon ivu-icon-ios-close" @click="backHome"></em>
        <h2>通行记录填写</h2>
      </div>
      <div class="mid-box">
        <Form ref="formInline" :rules="ruleValidate" :model="formItem">
          <div class="mid-top">
            <div ref="upWork" style="border-radius: 20px 0 0 20px; background: #346DF4; color: #F7F7F7" class="btn-style" @click="changeType(0)">上班</div>
            <div ref="downWork" style="border-radius: 0 20px 20px 0" class="btn-style" @click="changeType(1)">下班</div>
          </div>
          <div class="basic">
            <div class="form-title">基本信息</div>
            <div class="form-content">
              <Form-item prop="code">
                <div class="form-label">工号</div>
                <Input type="text" v-model="formItem.code" class="input-style"></Input>
              </Form-item>
              <Form-item prop="name">
                <div class="form-label">姓名</div>
                <Input type="text" v-model="formItem.name"></Input>
              </Form-item>
            </div>
          </div>
          <div class="health-box" v-show="colorShow">
            <div class="form-title">健康码颜色</div>
            <div class="radio-list">
              <Radio-group v-model="colors">
                <Radio label="0">绿码</Radio>
                <Radio label="1">黄码</Radio>
                <Radio label="2">红码</Radio>
              </Radio-group>
            </div>
          </div>
          <div class="big-btn">
            <div class="circle-btn" @click="punch">
              <div>
                <p>{{workType}}打卡</p>
                <p>{{time}}</p>
              </div>
            </div>
          </div>
          <div class="result-box" v-show="submit">
            <div><em class="ivu-icon ivu-icon-ios-checkmark"></em>{{endTime}}已打卡</div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { ClockIn, ClockOut } from '@api/administorators/manage'
import { mapActions } from 'vuex'
import md5 from 'js-md5'
import { dateFormat } from '@/utils/date'

export default {
  data() {
    return {
      btnColor: false,
      workType: '上班',
      formItem: {
        code: '',
        name: ''
      },
      colors: '',
      time: '',
      submit: false,
      endTime: '',
      colorShow: true,
      ruleValidate: {
        code: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        color: [
          { required: true, message: '健康码颜色不能为空', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    setInterval(() => {
      this.$nextTick(() => {
        this.time = this.$FormatDate(null, 1)
      })
    }, 1000)
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
          // 重定向对象不存在则返回顶层路径
        })
        .catch(error => {
          // 异常情况
          this.$log.error(error)
          this.$Message.error(error.message)
        })
    },
    punch() {
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          if (this.workType === '上班') {
            if (this.colors !== '') {
              const list = {
                code: this.formItem.code,
                name: this.formItem.name,
                color: this.colors
              }
              ClockIn(list).then(() => {
                this.submit = true
                this.endTime = dateFormat(null, 1)
                this.colors = null
                this.$refs.formInline.resetFields()
              })
            } else {
              this.$Message.error('健康码不能为空！')
            }
          } else if (this.workType === '下班') {
            ClockOut(this.formItem).then(() => {
              this.submit = true
              this.endTime = dateFormat(null, 1)
              this.$refs.formInline.resetFields()
            })
          }
        } else {
          this.$Message.error('表单校验错误！')
        }
      })
    },
    changeType(i) {
      const { upWork } = this.$refs
      const { downWork } = this.$refs
      if (i === 0) {
        this.workType = '上班'
        this.colorShow = true
        upWork.style.background = '#346DF4'
        upWork.style.color = '#F7F7F7'
        downWork.style.background = '#F7F7F7'
        downWork.style.color = '#161616'
        this.submit = false
      } else if (i === 1) {
        this.workType = '下班'
        this.colorShow = false
        downWork.style.background = '#346DF4'
        downWork.style.color = '#F7F7F7'
        upWork.style.background = '#F7F7F7'
        upWork.style.color = '#161616'
        this.submit = false
      }
    },
    backHome() {
      window.location.href = 'about:blank'
      window.close()
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
      align-items: center;
      em {
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
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    .mid-top {
      margin-top: 5vw;
      flex-basis: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn-style {
        border: 1px solid #e0e0e0;
        width: 20%;
        height: 60%;
        text-align: center;
        font-size: 1.2em;
        line-height: 2.2em;;
        background: #F7F7F7;
      }
    }
    .basic {
      flex-basis: 34%;
      display: flex;
      flex-direction: column;
      .form-content {
        flex: 1;
        padding: 2rem 2rem 0 1.7rem;
        ::v-deep .ivu-input {
          border-top: 0;
          border-left: 0;
          border-right: 0;
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
    .health-box {
      flex-basis: 15%;
      .radio-list {
          padding: 1em 0 0 2em;
      }
    }
    .big-btn {
      flex-basis: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 5rem;
      .circle-btn {
        width: 30%;
        border-radius: 50%;
        background: #346DF4;
        aspect-ratio: 1/1;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.4);
        p {
          text-align: center;
          color: #F7F7F7;
          font-size: 1.2em;
          font-weight: bold;
        }
      }
    }
    .result-box {
      flex-basis: 4%;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        height: 100%;
        font-size: 1.2em;
        em {
          font-size: 1.2em;
          background: #19be6b;
          border-radius: 50%;
          font-weight: bold;
          color: #F7F7F7;
        }
      }
    }
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
