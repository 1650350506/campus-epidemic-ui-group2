<template>
  <div class="search-container">
    <div class="left-search">
      <i class="ivu-icon ivu-icon-ios-search"></i>
      <Input  placeholder="请输入关键字" style="width: 300px"></Input>
    </div>
    <Button type="primary" class="btn">查询</Button>
    <Button class="btn">重置</Button>
  </div>
</template>

<script>
export default {
  name: 'index'
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
