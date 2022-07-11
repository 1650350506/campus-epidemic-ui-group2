/**
 * 通用复杂查询表单混合
 * */

import { mapState } from 'vuex';
export default {
    data () {
        return {
            grid: {
                xl: 8,
                lg: 8,
                md: 12,
                sm: 24,
                xs: 24
            },
            collapse: false,
            params: {}
        }
    },
    computed: {
        ...mapState('admin/layout', [
            'isMobile'
        ]),
        labelWidth () {
            return this.isMobile ? undefined : 100;
        },
        labelPosition () {
            return this.isMobile ? 'top' : 'right';
        }
    },
    methods: {
        handleSubmit () {
            this.$emit('on-submit', this.params);
        },
        handleReset () {
            this.$refs.form.resetFields();
            this.$emit('on-reset', this.params);
        }
    }
}
