<template>
  <div class="search-container">
    <div class="left-search">

      <div></div>
      <Input :placeholder="placeholderData" style="width: 220px;flex: 1" v-model="keyValue">
        <i class="ivu-icon ivu-icon-ios-search"></i>
      </Input>
    </div>
    <Button type="primary" class="btn" @click="select">查询</Button>
    <Button class="btn" @click="keyValue = ''">重置</Button>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: ['keyValue', 'title'],
  computed: {
    placeholderData() {
      return this.title
    }
  },
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
    }
    .btn {
        margin-right: 2em;
    }
}
</style>
