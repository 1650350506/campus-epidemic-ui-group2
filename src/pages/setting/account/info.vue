<template>
  <div>
    <h2>基本设置</h2>
    <Form ref="userInfo" :model="userInfo" :rules="rules" label-position="top" class="ivu-mt">
      <Row type="flex" :gutter="48">
        <Col v-bind="grid1">
          <FormItem label="头像" prop="avatar">
            <div class='demo-upload-list'>
              <img :src='require("@/assets/images/head.png")' v-if='userInfo.avatarUrl == ""'>
              <img :src='userInfo.avatarUrl' v-if='userInfo.avatarUrl'>
              <div class='demo-upload-list-cover'>
                <Icon type='ios-trash-outline' @click.native='handleRemove()'></Icon>
              </div>
            </div>
            <Upload
              :on-success='handleSuccess'
              :show-upload-list='false'
              :format='["jpg","jpeg","png"]'
              :max-size='2048'
              :on-format-error='handleFormatError'
              :on-exceeded-size='handleMaxSize'
              :headers='headers'
              type='drag'
              action='/api/doraemon-resource/resource/uploadTmp'
              style='display: inline-block;width:22px;height:20px;margin-left: -27px;left: -25px;z-index:1001;'
            >
              <div style='width: 20px;height:20px;line-height: 20px;'>
                <Icon type='ios-camera' size='20'></Icon>
              </div>
            </Upload>
            <Input v-model='userInfo.avatar' style='display:none' />
          </FormItem>
          <FormItem prop='homeTel' label='家庭电话:' style="margin-top: 65px;">
            <Input v-model='userInfo.homeTel' />
          </FormItem>
          <FormItem prop='enterpriseName' label='企业名称:'>
            <Input v-model='userInfo.enterpriseName' />
          </FormItem>
          <FormItem prop='workTel' label='工作电话:'>
            <Input v-model='userInfo.workTel' />
          </FormItem>
        </Col>
        <Col v-bind="grid2">
          <FormItem prop='userName' label='账户名称:'>
            <Input type='text' v-model='userInfo.userName' readonly />
          </FormItem>
          <FormItem prop='name' label='用户姓名:'>
            <Input v-model='userInfo.name' />
          </FormItem>
          <FormItem label='手机:'>
            <Input v-model='userInfo.mobile' />
          </FormItem>
          <FormItem prop='email' label='联系邮箱:'>
            <Input v-model='userInfo.email' />
          </FormItem>
          <FormItem prop='enterpriseId' label='企业ID:'>
            <Input v-model='userInfo.enterpriseId' />
          </FormItem>
          <FormItem prop='workPlace' label='工作单位:'>
            <Input v-model='userInfo.workPlace' />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit">更新基本信息</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import util from '@/libs/util'
import { updateUser, getVoByUserName } from '@/api/system/user'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      grid1: {
        xl: {
          span: 12,
          order: 2
        },
        lg: {
          span: 24,
          order: 1
        },
        md: {
          span: 24,
          order: 1
        },
        sm: {
          span: 24,
          order: 1
        },
        xs: {
          span: 24,
          order: 1
        }
      },
      grid2: {
        xl: {
          span: 12,
          order: 1
        },
        lg: {
          span: 24,
          order: 2
        },
        md: {
          span: 24,
          order: 2
        },
        sm: {
          span: 24,
          order: 2
        },
        xs: {
          span: 24,
          order: 2
        }
      },
      userInfo: {
        id: '',
        userName: 'admin345',
        name: '李四',
        mobile: '19858104401',
        email: '1309426309@qq.com',
        enterpriseId: '',
        enterpriseName: '',
        uniqueCode: 10010001,
        workTel: '',
        homeTel: '',
        workPlace: '',
        avatar: '',
        avatarUrl: ''
      },
      rules: {
        userName: [
          { required: true, message: '账户名称不能为空!', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '用户姓名不能为空!', trigger: 'blur' }
        ],
        // mobile: [
        //   { required: true, message: '手机号码不能为空！', trigger: 'blur' },
        //   {
        //                 validator: (rule, value, callback) => { //eslint-disable-line
        //       const reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
        //       const reg2 = /^\d{3,4}-\d{7,8}$/
        //       if (!reg.test(value) && !reg2.test(value) && value) {
        //         callback(new Error('手机号码格式不正确！'))
        //       }
        //       callback()
        //     }
        //   }
        // ],
        email: [
          { required: true, message: '联系邮箱不能为空！', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确！', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    headers() {
      const token = util.cookies.get('token')
      return {
        auth: `bearer ${token}`, // 直接从本地获取token就行
        auther: 'e3A6InVzZXJjZW50ZXIiLG9wOiJUUUZTIixiOiJkb3JhZW1vbi1wcm9qZWN0IixhazoiY2ZzbTJRbU1PQXJ0WDNhZCIsYXM6IlVtTmxnUVM4SHR0RXRjdU9NaVhtMURBdmVpMnd4Nm5OIn0='
      }
    },
    ...mapState('admin/user', [
      'info'
    ])
  },
  mounted() {
    getVoByUserName({ userName: this.info.name })
      .then(rst => {
        this.$refs.userInfo.resetFields()
        Object.keys(this.userInfo).forEach(key => {
          this.userInfo[key] = rst[key] || ''
        })
      })
  },
  methods: {
    handleRemove() {
      this.userInfo.avatarUrl = ''
      this.userInfo.avatar = ''
    },
    handleSuccess(res, file) {
      file.url = res.data.fullUrl
      file.name = res.data.fileName
      this.userInfo.avatarUrl = res.data.fullUrl
      this.userInfo.avatar = res.data.tqossUrl
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: `File format of ${file.name} is incorrect, please select jpg or png.`
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: `File  ${file.name} is too large, no more than 2M.`
      })
    },
    handleSubmit() {
      this.$refs.userInfo.validate((val) => {
        if (val) {
          const params = Object.assign({}, this.userInfo, '')
          updateUser(params)
            .then(() => {
              this.$Message.success('信息更新成功!')
            })
            .catch(error => {
              this.$Message.error(error.message)
            })
        }
      })
    }
  }
}
</script>
<style lang="less">
.ivu-upload-drag {
    background: #ffffff73 !important;
}
.demo-upload-list{
    display: inline-block;
    width: 145px;
    height: 145px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
    z-index:1000;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 10px;
    left: 0;
    right: 180px;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
    position: relative;
    top: 40px;
}
</style>
