<template>
    <Select
        placeholder='请选择'
        v-model="code"
        :disabled='disabled' >
        <Option v-for='option in searchList' :value='option.uniqueCode' :key='option.uniqueCode'>{{option.displayName}}</Option>
    </Select>
</template>
<script>
    import { listByPrefix } from '@/api/system/propertyDict';
    export default {
        name: 'propertyDictSelect',
        props: {
            value: {
                type: Number,
                default: 0
            },
            domainCode: {
                type: [Number, String],
                default: 0
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                searchList: [],
                code: 0
            }
        },
        mounted () {
            listByPrefix({ prefix: this.domainCode })
                .then(rst => {
                    this.searchList = rst
                    this.code = this.value
                })
        },
        watch: {
            value (newValue) {
                this.code = newValue
            },
            code (value) {
                if (value !== 0) {
                    this.$emit('input', value);
                }
            }
        }
    }
</script>
