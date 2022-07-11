<template>
  <Modal
    v-model='modal'
    width="70%"
    height="100%"
    class="img-model">

    <div align="center">
      <img :src="flowPic"/>
    </div>
  </Modal>
</template>
<script>
    import { diagramView, resourceView } from '@/api/flow/process';

    export default {
        name: 'process-image-modal',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            processDefinitionId: {
                type: String,
                default: ''
            },
            processInstanceId: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                modal: false,
                flowPic: ''
            }
        },
        watch: {
            value (newVal) {
                this.modal = newVal
            },
            modal (newVal) {
                !newVal && this.$emit('input', false)
            },
            processInstanceId (newVal) {
                diagramView({ processInstanceId: newVal })
                    .then(res => {
                        // 返回数据
                        this.makeImg(res)
                    })
                    .catch(error => {
                        // 异常情况
                        this.$Message.error(error.message)
                    })
            },
            processDefinitionId (newVal) {
                resourceView({ processDefinitionId: newVal })
                    .then(res => {
                        // 返回数据
                        this.makeImg(res)
                    })
                    .catch(error => {
                        // 异常情况
                        this.$Message.error(error.message)
                    })
            }
        },
        methods: {
            makeImg (res) {
                const blob = new Blob([res], { type: res.type })
                const url = window.URL.createObjectURL(blob)
                this.flowPic = url;
            }
        }
    }
</script>
<style lang="less" scoped>
.img-model{
    & /deep/ .ivu-modal-footer{
        display: none;
    }
}
</style>
