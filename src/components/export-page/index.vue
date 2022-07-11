<template>
    <Modal
      v-model='modal'
      :mask-closable='false'
      :title='exportTitle'>
      <RadioGroup v-model="exportPattern" vertical>
        <Radio label="onlyPage">
            <span>导出本页</span>
        </Radio>
        <Radio label="all">
            <span>导出全部</span>
        </Radio>
        </RadioGroup>
        <div slot='footer'>
            <Button type='text' @click='modal=false'>取消</Button>
            <Button type='primary' @click='exportData'>导出</Button>
        </div>
    </Modal>
</template>
<script>
    import axios from 'axios';
    import util from '@/libs/util';
    import { serialize } from '@/util/util'

    export default {
        name: 'export-page',
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
            params: {
                type: Object,
                default: () => {}
            }
        },
        data () {
            return {
                exportTitle: '导出',
                modal: false,
                exportPattern: 'onlyPage'
            }
        },
        watch: {
            value (newVal) {
                this.modal = newVal
                this.exportTitle = this.data + '导出'
            },
            modal (newVal) {
                !newVal && this.$emit('input', false)
            }
        },
        methods: {
            exportData () {
                const token = util.cookies.get('token');
                this.params.exportPattern = this.exportPattern
                let data = this.params
                data = serialize(data);
                data = encodeURI(data)
                axios({
                    headers: {
                        auth: 'bearer ' + token
                    },
                    url: this.action,
                    method: 'post',
                    data,
                    responseType: 'blob'
                }).then(res => {
                    const blob = new Blob([res.data], { type: res.data.type })
                    const downloadElement = document.createElement('a')
                    const href = window.URL.createObjectURL(blob) // 创建下载的链接
                    downloadElement.href = href
                    downloadElement.download = this.data + '导出.xlsx' // 下载后文件名
                    document.body.appendChild(downloadElement)
                    downloadElement.click() // 点击下载
                    document.body.removeChild(downloadElement) // 下载完成移除元素
                    window.URL.revokeObjectURL(href) // 释放掉blob对象
                });
            }
        }
    }
</script>
