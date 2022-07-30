<template>
  <div class="page-container">
    <div class="top-box">
      <div class="top-title">
        <i class="ivu-icon ivu-icon-ios-close"></i>
        <h2>14天返校行程</h2>
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
              <Input type="text" v-model="formItem.code"></Input>
            </Form-item>
          </Form>
        </div>
      </div>
      <div class="whereabouts">
        <div class="form-title">14天内行程</div>
        <Form ref="formDynamic" style="max-height: 25vh; overflow-y: auto" :model="formDynamic" :label-width="90">
          <Form-item
            v-for="(item, index) in formDynamic.items"
            :key="item"
            :label="'行程轨迹' + (index + 1)"
            :prop="'items.' + index + '.value'"
            :rules="{required: true, message: '行程轨迹' + (index + 1) +'不能为空', trigger: 'blur'}"
          >
            <Row>
              <Col span="18">
                <Cascader :data="data" v-model="item.value"></Cascader>
              </Col>
              <Col span="4" offset="1">
                <Button type="error" @click="handleRemove(index)">删除</Button>
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
      <Button type="primary" style="margin: 0 10%">提交</Button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dashboard-console',
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
        name: '',
        classCode: '',
        sex: 0,
        phoneNumber: '',
        idCard: '',
        address: '',
        emergencyContact: '',
        emergencyContactPhone: '',
        region: {
          items: [
            { value: '' }
          ]
        },
        imgUrl: '',
        healthUrl: ''
      }
    }
  },
  computed: {
    label() {
      return this.formItem.sex ? '男' : '女'
    }
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
      this.formDynamic.items.push({
        value: ''
      })
    },
    handleRemove(index) {
      this.formDynamic.items.splice(index, 1)
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
          top: -80%;
          font-size: 1.1em;
          z-index: 99;
        }
      }
    }
    .whereabouts {
      flex: 1;
      display: flex;
      flex-direction: column;
      //background: #1d42ab;
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
.form-title {
  font-size: 1.4em;
  color: #000;
  flex-basis: 25%;
  margin-left: 6%;
  line-height: 2em;
}
</style>
