/**
 * 通用表单混合
 * */
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: () => ({})
        },
        type: {
            type: String,
            default: 'add'
        }
    },
    data () {
        return {
            modal: false,
            submiting: false,
            loading: true,
            dataName: '功能'
        }
    },
    watch: {
        modal (val) {
            !val && this.$emit('input', false)
        }
    },
    computed: {
        formTitle () {
            const option = this.type === 'add' ? '新增' : this.type === 'edit' ? '修改' : this.type === 'check' ? '查看' : '复制'
            return `${option}${this.dataName}`
        }
    }
}
