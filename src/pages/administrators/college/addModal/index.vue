<template>
  <div>
    <Modal
      v-model="showSwitch"
      @on-cancel="showSwitch = false"
      width="720"
    >
      <div slot="header" class="header-title" style="font-size: 20px; color: #000">新增人员</div>
      <Form ref="formValidate" :model="addList1" :rules="ruleValidate">
        <div class="modal-box">
          <div class="modal-item">
            <div class="null"></div><div class="title"><span>账号:</span></div><div class="star"></div>
            <div class="core">
              <Form-item prop="account">
                <Input placeholder="请输入账号" v-model="addList1.account"></Input>
              </Form-item>
            </div>
          </div>
          <div class="modal-item">
            <div class="null"></div><div class="title"><span>密码:</span></div><div class="star"></div>
            <div class="core">
              <Form-item prop="pwd">
                <Input placeholder="请输入密码" v-model="addList1.pwd"></Input>
              </Form-item>
            </div>
          </div>
          <div class="modal-item">
            <div class="null"></div><div class="title"><span>职工工号</span></div><div class="star"></div>
            <div class="core">
              <Form-item prop="code">
                <Input placeholder="请输入职工工号" v-model="addList1.code"></Input>
              </Form-item>
            </div>
          </div>
          <div class="modal-item">
            <div class="null"></div><div class="title"><span>职工姓名</span></div><div class="star"></div>
            <div class="core">
              <Form-item prop="name">
                <Input placeholder="请输入职工姓名" v-model="addList1.name"></Input>
              </Form-item>
            </div>
          </div>
          <div class="modal-item">
            <div class="null"></div><div class="title"><span>身份证号码</span></div><div class="star"></div>
            <div class="core">
              <Form-item prop="idCard">
                <Input placeholder="请输入身份证号码" v-model="addList1.idCard"></Input>
              </Form-item>
            </div>
          </div>
          <div class="modal-item">
            <div class="null"></div><div class="title"><span>性别</span></div><div class="star"></div>
            <div class="core">
              <Form-item prop="sex">
                <Radio-group v-model="addList1.sex">
                  <Radio label="男" value="0"></Radio>
                  <Radio label="女" value="1"></Radio>
                </Radio-group>
              </Form-item>
            </div>
          </div>
          <div class="modal-item">
            <div class="null"></div><div class="title"><span>手机号</span></div><div class="star"></div>
            <div class="core">
              <Form-item prop="phone">
                <Input placeholder="请输入手机号" v-model="addList1.phone"></Input>
              </Form-item>
            </div>
          </div>
          <div class="modal-item">
            <div class="null"></div><div class="title"><span>二级学院</span></div><div class="star"></div>
            <div class="core">
              <Form-item prop="deptCode">
                <Select v-model="addList1.deptName" style="width:190px">
                  <Option v-for="(item,index) in deptList" :value="item.name" :label="item.name" :key="index"></Option>
                </Select>
              </Form-item>
            </div>
          </div>
          <div class="modal-item">
            <div class="null"></div><div class="title"><span>校内职务</span></div><div class="star"></div>
            <div class="core">
              <Form-item prop="schoolPost">
                <Input placeholder="请输入校内职务" v-model="addList1.schoolPost"></Input>
              </Form-item>
            </div>
          </div>
          <div class="modal-item">
            <div class="null"></div><div class="title"><span>当前职务</span></div><div class="star"></div>
            <div class="core">
              <Form-item prop="systemPost">
                <Select v-model="addList1.systemPost" style="width:190px">
                  <Option  value="防控人员" label="防控人员"></Option>
                  <Option  value="防控组长" label="防控组长"></Option>
                </Select>
              </Form-item>
            </div>
          </div>
          <div class="temp">代表必填项</div>
        </div>
      </Form>
      <div slot="footer">
        <Button @click="close">关闭</Button>
        <Button @click="addFacultyInfo" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { ActiveUserInfo, GetUserInfoByToken, GetUserInfoByUsername, RegUserInfo } from '@/api/system/user'
import { GetDeptCodeAndName, InsertWorkPerson } from '@/api/administorators/manage'
import md5 from 'js-md5'
export default {
  name: 'addFaculty',
  props: ['showSwitch'],
  data() {
    return {
      showDialogVisible: false,
      ruleValidate: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { type: 'string', min: 6, max: 16, message: '账号位数6~16', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '职工工号不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '身份证不能为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '请选择二级学院', trigger: 'change' }
        ],
        schoolPost: [
          { required: true, message: '校内职务不能为空', trigger: 'blur' }
        ],
        systemPost: [
          { required: true, message: '请选择系统职务', trigger: 'change' }
        ]
      },
      addList1: {
        account: '',
        pwd: '',
        code: '',
        deptCode: '',
        deptName: '',
        idCard: '',
        name: '',
        phone: '',
        schoolPost: '',
        sex: 0,
        systemPost: ''
      },
      addUserInfo: {
        account: '',
        deptId: '1548935972324904988',
        mobile: '',
        name: '',
        pwd: '',
        resetPwd: true,
        roles: ['1547743439045529620'],
        selfAccount: false,
        switchUser: false
      },
      deptList: []
    }
  },
  created() {
    this.getDeptName()
  },
  methods: {
    close() {
      this.$emit('switchAdd', false)
    },
    //  获取各个学院名称
    getDeptName() {
      GetDeptCodeAndName().then((res) => {
        this.deptList = res.field
      })
    },
    addFacultyInfo() {
      this.deptList.forEach((item) => {
        if (item.name === this.addList1.deptName) {
          this.addList1.deptCode = item.code
        }
      })
      if (this.addList1.sex === '男') {
        this.addList1.sex = 0
      } else if (this.addList1.sex === '女') {
        this.addList1.sex = 1
      }
      this.addUserInfo.account = this.addList1.account
      this.addUserInfo.mobile = this.addList1.phone
      this.addUserInfo.name = this.addList1.name
      this.addUserInfo.pwd = this.addList1.pwd
      console.log(this.addList1)
      RegUserInfo(this.addUserInfo).then(res => {
        this.getUserInfoByName()
      })
    },
    getUserInfoByName() {
      const list = {
        userName: this.addUserInfo.account
      }
      GetUserInfoByUsername(list).then((res) => {
        this.activeUserInfo(res.id)
      })
    },
    activeUserInfo(id) {
      const list = {
        ids: [id]
      }
      ActiveUserInfo(list).then(res => {
        this.addInnerFacultyInfo()
      })
    },
    addInnerFacultyInfo() {
      InsertWorkPerson(this.addList1).then((res) => {
        this.$Message.success('新增账号成功！')
        this.close()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.modal-box {
  display: flex;
  flex-wrap: wrap;
  .temp {
    position: absolute;
    right: 5%;
    bottom: 13%;
    font-size: 16px;
    color: #000;
    &::before {
      content: '*';
      position: absolute;
      left: -10%;
      top: 70%;
      font-size: 16px;
      color: #fc0000;
      transform: translate(-50%, -50%);
    }
  }
  .modal-item {
    width: 50%;
    height: 60px;
    display: flex;
    margin: 5px 0;
    font-size: 16px;
    .null {
      flex-basis: 5%;
    }
    .star {
      flex-basis: 3%;
    }
    .title {
      color: #050505;
      font-weight: 500;
      font-size: 16px;
      flex-basis: 30%;
      text-align: right;
      line-height: 30px;
      span {
        position: relative;
        &::before {
          content: '*';
          position: absolute;
          left: -13%;
          top: 70%;
          color: #fc0000;
          transform: translate(-50%, -50%);
        }
      }
    }
    .core {
      color: #000000;
      flex-basis: 55%;
    }
  }
}
</style>
