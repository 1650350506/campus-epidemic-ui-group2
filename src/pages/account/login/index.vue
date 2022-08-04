<template>
  <!--  <div class="page-account template-login-data">-->
  <!--    <div class="page-account-container">-->
  <!--      <div class="page-account-top">-->
  <!--        <div class="page-account-top-logo">-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      <div class="template-login-data-main">-->
  <!--        <Login @on-submit="handleSubmit">-->
  <!--          <UserName name="username" value="tianque_root1" />-->
  <!--          <Password name="password" value="Tianque_root1" enter-to-submit />-->
  <!--          <Submit>登录</Submit>-->
  <!--        </Login>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <div class="page-account">
    <div class="account-box">
      <div class="account-left">
        <img src="../../../assets/images/account_left.png" alt="">
      </div>
      <div class="account-right">
        <div class="form-box">
          <h1>登 录</h1>
          <div class="input-group">
            <label class="label">账号</label>
            <input autocomplete="off" name="username" v-model="loginInfo.username" class="input" type="text">
          </div>
          <div class="input-group">
            <label class="label">账号</label>
            <input autocomplete="off" name="password" v-model="loginInfo.password"  class="input" type="password">
          </div>
          <div class="cntr"><input  type="checkbox" v-model="loginInfo.checked" id="cbx" class="hidden-xs-up">
            <label for="cbx" class="cbx"></label>
            <span class="cntr-title">记住密码</span>
          </div>
          <div class="btn" @click="handleSubmit">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import md5 from 'js-md5'
import { GetUserInfoByToken } from '@api/system/user'

export default {
  data() {
    return {
      autoLogin: true,
      showList: [false, false, false, false],
      loginInfo: {
        username: '',
        password: '',
        checked: false
      }
    }
  },
  computed: {
    ...mapState('admin/account', ['userInfo'])
  },
  created() {
    if (this.userInfo.checked === true) {
      this.loginInfo.username = this.userInfo.username
      this.loginInfo.password = this.userInfo.password
      this.loginInfo.checked = this.userInfo.checked
    }
  },
  methods: {
    ...mapActions('admin/account', [
      'login'
    ]),
    ...mapMutations('admin/account', ['addToUserInfo']),
    getUserInfoByToken() {
      GetUserInfoByToken().then(res => {
        console.log(res.role)
        if (res.role[0].name === '疫情2组管理员') {
          const info = {
            username: this.loginInfo.username,
            password: this.loginInfo.password,
            checked: this.loginInfo.checked,
            roleName: '管理员'
          }
          this.addToUserInfo(info)
          this.$router.replace('/isolationAnalysis')
        } else if (res.role[0].name === '疫情2组防疫人员') {
          const info = {
            username: this.loginInfo.username,
            password: this.loginInfo.password,
            checked: this.loginInfo.checked,
            roleName: '防疫人员'
          }
          this.addToUserInfo(info)
          this.$router.replace('/quarantinedManage')
        }
      })
    },
    handleSubmit() {
      const { username } = this.loginInfo
      const password = md5(this.loginInfo.password)
      this.login({
        username,
        password
      })
        .then(() => {
          // 重定向对象不存在则返回顶层路径
          this.getUserInfoByToken()
        })
        .catch(error => {
          // 异常情况
          this.$log.error(error)
          this.$Message.error(error.message)
        })
    },
    clickScan(i) {
      this.showList = [false, false, false, false]
      this.showList[i] = true
    }
  }
}
</script>
<style lang="less">
    //.template-login-data{
    //    background: #EBEBEB;
    //    &-main{
    //        border-radius: 10px;
    //        padding: 16px;
    //    }
    //    &-other{
    //        text-align: center;
    //        img{
    //            margin: 0 16px;
    //        }
    //    }
    //    &-copyright{
    //        *{
    //            color: #fff !important;
    //        }
    //    }
    //}
</style>
