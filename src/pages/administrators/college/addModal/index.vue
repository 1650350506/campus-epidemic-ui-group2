<template>
  <div>
    <Modal
      v-model="showSwitch"
      @on-cancel="showSwitch = false"
      width="720"
    >
      <div slot="header" class="header-title" style="font-size: 20px; color: #000">新增人员</div>
      <div class="modal-box">
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>账号:</span></div><div class="star"></div>
          <div class="core"><Input placeholder="请输入账号" v-model="addList1.account"></Input>
          </div>
        </div>
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>密码:</span></div><div class="star"></div>
          <div class="core"><Input placeholder="请输入密码" v-model="addList1.pwd"></Input>
          </div>
        </div>
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>职工工号:</span></div><div class="star"></div>
          <div class="core"><Input placeholder="请输入职工工号" v-model="addList1.code"></Input>
          </div>
        </div>
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>职工姓名:</span></div><div class="star"></div>
          <div class="core"><Input placeholder="请输入职工姓名" v-model="addList1.name"></Input>
          </div>
        </div>
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>身份证号码:</span></div><div class="star"></div>
          <div class="core"><Input placeholder="请输入身份证号码" v-model="addList1.id_card"></Input>
          </div>
        </div>
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>性别:</span></div><div class="star"></div>
          <div class="core">
            <Radio-group v-model="addList1.sex">
              <Radio label="男" value="0"></Radio>
              <Radio label="女" value="1"></Radio>
            </Radio-group>
          </div>
        </div>
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>手机号:</span></div><div class="star"></div>
          <div class="core"><Input placeholder="请输入手机号" v-model="addList1.phone"></Input>
          </div>
        </div>
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>二级学院:</span></div><div class="star"></div>
          <div class="core"><Select v-model="addList1.dept_code" style="width:190px">
<!--            <Option v-for="item in cityList" :value="item.value" :key="item">-->
<!--              {{ item.label }}-->
<!--            </Option>-->
          </Select>
          </div>
        </div>
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>校内职务:</span></div><div class="star"></div>
          <div class="core"><Input placeholder="请输入校内职务" v-model="addList1.school_post"></Input>
          </div>
        </div>
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>当前职务:</span></div><div class="star"></div>
          <div class="core"><Select v-model="addList1.system_post" style="width:190px">
            <Option  value="防控人员"></Option>
          </Select>
          </div>
        </div>
        <div class="temp">代表必填项</div>
      </div>
      <div slot="footer">
        <Button @click="close">关闭</Button>
        <Button @click="addFacultyInfo" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { AccountReg } from '../../../../api/account'

export default {
  name: 'addFaculty',
  props: ['showSwitch'],
  data() {
    return {
      showDialogVisible: false,
      addList1: {
        account: '',
        pwd: '',
        code: '',
        name: '',
        id_card: '',
        sex: 0,
        phone: '',
        dept_code: '',
        school_post: '',
        system_post: 1547742937243193372
      },
      addUserInfo: {
        account: 'testAdmin',
        deptId: '1548935972324904988',
        mobile: '19858104444',
        name: '姜程璐',
        pwd: 'Admin111',
        resetPwd: false,
        roles: ['1547742937243193372'],
        selfAccount: false,
        switchUser: false
      },
      deptList: []
    }
  },
  methods: {
    close() {
      this.$emit('switchAdd', false)
    },
    //  获取各个学院名称
    getDeptName() {
    //  1
    },
    //  这是对自己服务的方法()
    addFacultyInfo() {
      AccountReg(this.addUserInfo).then(res => {
        console.log(res)
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
