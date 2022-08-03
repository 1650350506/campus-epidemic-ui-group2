<template>
  <div class="page-container">
    <div class="top-box">
      <div class="top-title">
        <i class="ivu-icon ivu-icon-ios-close" @click="backHome"></i>
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
              <Input type="text" v-model="formItem.name" @on-blur="checkStu"></Input>
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
            style="padding: 1em 1em 0 0"
            :label="'行程记录' + (index + 1)"
            :prop="'items.' + index + '.value'"
            :rules="{required: true, message: '行程轨迹' + (index + 1) +'不能为空', trigger: 'blur'}"
          >
            <Row>
              <Col span="18">
                <Cascader :data="data" v-model="item.value" @on-change="loadData"></Cascader>
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
      <Button type="primary" style="margin: 0 10%; height: 12vw" @click="recordSubmit">提交</Button>
    </div>
  </div>
</template>
<script>
import { GetCityList, GetProvinceList } from '@api/administorators/riskArea'
import { CheckStudent, SubStuRecord } from '@api/stu/stu'
import { mapActions } from 'vuex'
import md5 from 'js-md5'

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
        name: ''
      },
      data: []
    }
  },
  created() {
    this.getProvinceList()
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
    recordSubmit() {
      const arrays = []
      this.formDynamic.items.forEach((item) => {
        arrays.push(item.value[1])
      })
      const list = {
        code: this.formItem.code,
        cityList: arrays
      }
      SubStuRecord(list).then(res => {
        console.log('提交成功')
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
    },
    checkStu() {
      CheckStudent(this.formItem).then((res) => {
        if (res === 0) {
          this.$Message.success('学生信息校验失败！请检查是否输入正确！')
        }
      })
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
        this.data = arrays
        console.log(this.data)
      })
    },
    loadData(value, selectedData) {
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
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].value === val) {
          this.data[i].children = arrays
        }
      }
    },
    backHome() {
      this.$router.replace('/login')
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
