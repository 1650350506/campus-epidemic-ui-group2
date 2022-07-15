<template>
  <div>
    <PageHeader>
      <div>
        111
      </div>
      <div class="demo-title" slot="title">
        <i-header-breadcrumb  ref="breadcrumb" />
      </div>
      <div class="demo-logo" slot="logo">

      </div>
      <div class="demo-content" slot="content">
        <h2>今天是2022年7月15日</h2>
      </div>
    </PageHeader>
    <div class="container">
      <div class="chart-top">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
      <div class="chart-mid"></div>
      <div class="chart-bottom"></div>
    </div>
  </div>
</template>

<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import Card from '@/components/chart/card'
export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb, Card
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 1200px;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
}
.chart-top {
  flex-basis: 20%;
  display: flex;
  justify-content: space-between;
}
.chart-mid {
  flex-basis: 50%;
  background: #1d42ab;
}
.chart-bottom {
  flex-basis: 30%;
  background: #1e93ff;
}
</style>
