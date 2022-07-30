<template>
  <div class="page-container">
    <div class="top-box">
      <div class="top-title">
        <i class="ivu-icon ivu-icon-ios-close"></i>
        <h2>返校信息填写</h2>
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
              <Input type="text" v-model="formItem.name" @on-blur="queryMsg"></Input>
            </Form-item>
          </Form>
        </div>
      </div>
      <div class="whereabouts">
        <div class="form-goto">
          <span>获取定位</span>
          <Button class="position-btn" type="primary">获取定位</Button>
        </div>
        <div class="form-goto">
          <span>行程范围</span>
          <Radio-group>
            <Radio label="本市"></Radio>
            <Radio label="跨市"></Radio>
          </Radio-group>
        </div>
        <Button class="btn" type="primary">提交</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dashboard-console',
  data() {
    return {
      formItem: {
        code: '',
        name: ''
      }
    }
  },
  computed: {
  },
  methods: {
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
    queryMsg() {
    //  查询是不是数据库数据
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
          background: #F7F7F7;
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
        align-items: center;
        span {
          margin-left: 6%;
          margin-right: 1%;
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
      .btn {
        margin: 0 2em;
        height: 3em;
        font-size: 1.2em;
      }
    }
  }
  .img-upload {
    font-size: 2em;
    font-weight: 100;
    border: 1px solid #9ea7b4;
    text-align: center;
    line-height: 5rem;
    width: 5rem;
    height: 5rem;
  }
}
</style>
