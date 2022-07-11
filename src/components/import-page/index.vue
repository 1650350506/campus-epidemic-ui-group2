<template>
     <Modal
      v-model='modal'
      :mask-closable='false'
      :title='importTitle'>
      <a v-on:click="downLoad"  >
        <span><font v-color="'#ed4014'">{{importTitle}}模版下载</font></span>
      </a>
      <Upload
        :action="this.action"
        name ='uploadFile'
        :format="['xls','xlsx']"
        :accept="fileType"
        :on-error="handError"
        :headers='httpHeader' class="upload-file">
        <Button icon="ios-cloud-upload-outline">文件导入</Button>
      </Upload>
      <div slot='footer'>
         <Button type='text' @click='modal=false'>关闭</Button>
      </div>
     </Modal>
</template>
<script>
    import { Message } from 'view-design';
    import request from '@/plugins/request';
    import util from '@/libs/util';
    export default {
        name: 'import-page',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            data: {
                type: String,
                default: ''
            },
            action: {
                type: String,
                default: ''
            },
            templateUrl: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                importTitle: '导入',
                modal: false,
                httpHeader: {},
                fileType: '.xls,.xlsx'
            }
        },
        watch: {
            value (newVal) {
                this.modal = newVal
                this.importTitle = this.data + '导入'
                // 在请求发送之前做一些处理
                const token = util.cookies.get('token');
                // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
                this.httpHeader.auth = 'bearer ' + token;
            },
            modal (newVal) {
                !newVal && this.$emit('input', false)
            }
        },
        methods: {
            downLoad () {
                return request({
                    url: this.templateUrl,
                    method: 'get',
                    responseType: 'blob'
                }).then(res => {
                    const blob = new Blob([res], { type: res.type })
                    const downloadElement = document.createElement('a')
                    const href = window.URL.createObjectURL(blob) // 创建下载的链接
                    downloadElement.href = href
                    downloadElement.download = this.data + '导入模版.xlsx' // 下载后文件名
                    document.body.appendChild(downloadElement)
                    downloadElement.click() // 点击下载
                    document.body.removeChild(downloadElement) // 下载完成移除元素
                    window.URL.revokeObjectURL(href) // 释放掉blob对象
                });
            },
            handError (errMsg, file, filelist) {
                Message.error({
                    content: file.msg
                });
            }
        }
    }
</script>
<style  lang="less" scoped>
.upload-file {
    height: auto;
    & /deep/ .ivu-upload-list{
        height: 90px;
        overflow-y: auto;
    }
}

</style>
