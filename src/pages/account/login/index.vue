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
          <UserName name="username" value="admin345" />
          <Password name="password" value="Admin345" enter-to-submit />
          <Submit>登录</Submit>
        </Login>
      </div>
    </div>
    <i-copyright class="template-login-data-copyright" />
  </div>
</template>
<script>
import iCopyright from '@/components/copyright'
import { mapActions } from 'vuex'
import md5 from 'js-md5'

export default {
  components: { iCopyright },
  data() {
    return {
      autoLogin: true
    }
  },
  created() {
    // this.handleSubmit()
  },
  methods: {
    ...mapActions('admin/account', [
      'login'
    ]),
    /**
             * @description 登录
             * 表单校验已有 iView Pro 自动完成，如有需要修改，请阅读 iView Pro 文档
             */
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
            if (!this.$route.query.redirect) {
              this.$router.replace('/index')
            } else {
              this.$router.replace(this.$route.query.redirect || '/')
            }
          })
          .catch(error => {
            // 异常情况
            this.$log.error(error)
            this.$Message.error(error.message)
          })
      }
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
