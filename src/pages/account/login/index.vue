<template>
  <div class="page-account template-login-data">
    <div class="page-account-container">
      <div class="page-account-top">
        <div class="page-account-top-logo">
          <img src="@/assets/images/logo-dark.png" alt="logo">
        </div>
        <div class="page-account-top-desc">Doraemon Admin  天阙中台基础设施</div>
      </div>
      <div class="template-login-data-main">
        <Login @on-submit="handleSubmit">
          <UserName name="username" value="tianque_root1" />
          <Password name="password" value="Tianque_root1" enter-to-submit />
          <Submit>登录</Submit>
        </Login>
      </div>
      <div>
        <img src="../../../assets/images/back.jpg" v-show="showList[0]" alt="">
        <img src="../../../assets/images/record.jpg" v-show="showList[1]" alt="">
        <img src="../../../assets/images/leave.jpg" v-show="showList[2]" alt="">
        <img src="../../../assets/images/openCard.jpg" v-show="showList[3]" alt="">
      </div>
      <Button @click="clickScan(0)">返校扫码</Button>
      <Button @click="clickScan(1)">14天行程记录</Button>
      <Button @click="clickScan(2)">离校扫码</Button>
      <Button @click="clickScan(3)">上下班打卡</Button>
    </div>
    <i-copyright class="template-login-data-copyright" />
  </div>
</template>
<script>
import iCopyright from '@/components/copyright'
import { mapActions } from 'vuex'
import md5 from 'js-md5'
import { GetUserInfoByToken } from '@api/system/user'

export default {
  components: { iCopyright },
  data() {
    return {
      autoLogin: true,
      showList: [false, false, false, false]
    }
  },
  methods: {
    ...mapActions('admin/account', [
      'login'
    ]),
    getUserInfoByToken() {
      GetUserInfoByToken().then(res => {
        console.log(res.role)
        if (res.role[0].name === '疫情2组管理员') {
          this.$router.replace('/isolationAnalysis')
        } else if (res.role[0].name === '防疫人员') {
          this.$router.replace('/quarantinedManage')
        }
      })
    },
    handleSubmit(valid, values) {
      if (valid) {
        let { username, password } = values
        password = md5(password)
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
      }
    },
    clickScan(i) {
      this.showList = [false, false, false, false]
      this.showList[i] = true
    }
  }
}
</script>
<style lang="less">
    .template-login-data{
        background-image: url("../../../assets/images/bg-login-data.jpg") !important;
        background-size: cover !important;
        &-main{
            background: #fff;
            border-radius: 10px;
            padding: 16px;
        }
        &-other{
            text-align: center;
            img{
                margin: 0 16px;
            }
        }
        &-copyright{
            *{
                color: #fff !important;
            }
        }
    }
</style>
