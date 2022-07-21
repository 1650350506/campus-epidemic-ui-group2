<template>
  <div class="search-container">
    <div class="left-search">
      <i class="ivu-icon ivu-icon-ios-search"></i>
      <Input  placeholder="请输入关键字" style="width: 300px" v-model="keyValue"></Input>
    </div>
    <Button type="primary" class="btn" @click="select">查询</Button>
    <Button class="btn" @click="keyValue = ''">重置</Button>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: ['keyValue'],
  methods: {
    select(e) {
      this.$emit('selectFun', this.keyValue)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
    display: flex;
    border: 0;
    .left-search {
        display: flex;
        align-items: center;
        margin-right: 2em;
        i {
            font-size: 2em;
        }
    }
    .btn {
        margin-right: 2em;
    }
}
</style>
