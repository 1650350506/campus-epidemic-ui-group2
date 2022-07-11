<template>
    <div class="setting-account-safety">
        <h2>安全设置</h2>
        <Form ref="userInfo" :model="userInfo" :rules="rules" label-position="top" class="ivu-mt" >
            <Row type="flex" :gutter="48">
                <Col>
                    <FormItem prop='userName' label='账户名称:'>
                        <Input type='text' v-model='userInfo.userName' readonly/>
                    </FormItem>
                    <FormItem prop='password' label='密码:'>
                        <Input type='password' v-model='userInfo.password' placeholder='请输入新密码' />
                        </FormItem>
                    <FormItem prop='confirmPwd' label='确认密码:'>
                        <Input type='password' v-model='userInfo.confirmPwd' placeholder='请输入新密码' />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="resetPsd">更新基本信息</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
    import { updatePassword } from '@/api/system/user';
    import util from '@/libs/util';
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
                userInfo: {
                    userName: '',
                    password: '',
                    confirmPwd: ''
                },
                rules: {
                    password: [
                        { required: true, message: '用户密码不能为空！', trigger: 'blur' },
                        { type: 'string', min: 6, message: '用户密码不能少于6个字符！', trigger: 'blur' }
                    ],
                    confirmPwd: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                        {
                        validator: (rule, value, callback) => { //eslint-disable-line
                                if (value !== this.userInfo.password) {
                                    callback(new Error('两次密码输入不一致！'))
                                }
                                callback()
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            resetPsd () {
                this.$refs.userInfo.validate((valid) => {
                    if (valid) {
                        const params = {
                            id: util.cookies.get('uuid'),
                            password: this.userInfo.password
                        }
                        updatePassword(params)
                            .then(rst => { //eslint-disable-line
                                this.$Message.success('信息更新成功!');
                            })
                            .catch(error => {
                                this.$Message.error(error.message)
                            })
                    }
                })
            }
        },
        computed: {
            ...mapState('admin/user', [
                'info'
            ])
        },
        mounted () {
            console.log(this.info.name)
            this.userInfo.userName = this.info.name
        }
    }
</script>
<style lang="less">
    .setting-account-safety{
        .ivu-col{
            p{
                margin-top: 8px;
                color: #808695;
            }
        }
    }
</style>
