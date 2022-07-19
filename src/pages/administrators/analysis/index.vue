<template>
  <div>
    <Card :bordered="false"  class="card-top card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2>你好！ 管理员！</h2>
    </Card>
    <Card class="container" :bordered="false" dis-hover>
      <div class="chart-top">
        <Card v-for="(item, index) in topList" :key="index" class="card">
          <h2>{{ item.name }}</h2>
          <i class="ivu-icon ivu-icon-ios-refresh" slot="extra"></i>
          <h2 class="name">{{ item.num }}</h2>
        </Card>
      </div>
      <div class="chart-mid">
        <Card class="card" :bordered="false">
          <h2 slot="title" style="margin: 1em 0;">新增隔离人数趋势</h2>
          <div slot="extra">
            <Select :value="timeList[0].label" style="width:200px">
              <Option v-for="item in timeList" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </div>
          <div id="main" style="aspect-ratio: 1.2/1; height: 60vh"></div>
        </Card>
        <Card class="card" :bordered="false">
          <h2 slot="title" style="margin: 1em 0;">各个学院隔离人员分布</h2>
          <i class="ivu-icon ivu-icon-ios-refresh" slot="extra"></i>
          <div id="main2" :style="{ width: '100%', height: '60vh' }"></div>
        </Card>
      </div>
      <div class="chart-bottom">
        <Card class="card">
          <h2 slot="title" style="margin: 1em 0;">各学院防疫人员分布</h2>
          <i class="ivu-icon ivu-icon-ios-refresh" slot="extra"></i>
          <div id="main3" :style="{ width: '90%' , height: '20vw'}"></div>
        </Card>
      </div>
    </Card>
  </div>
</template>
<script>
import _ from 'lodash'
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import { GetAllIsolationTotal, GetIsolationList, GetNewIsolationTotal } from '@api/administorators/analysis'
const echarts = require('echarts')
export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb
  },
  data() {
    return {
      topList: [
        { name: '总隔离人数', num: 0 },
        { name: '新增隔离人数', num: 5 },
        { name: '新增解除人数', num: 10 }
      ],
      timeList: [{
        value: 7,
        label: '过去7天'
      },
      {
        value: 14,
        label: '过去14天'
      }
      ],
      option: {
        title: {
          text: '每日新增隔离人数'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新增隔离人数'],
          top: '0%',
          right: '4%',
          color: '#0093ff'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          name: '时间',
          boundaryGap: false,
          nameLocation: 'center',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ebebeb'
            }
          },
          axisLine: {
            show: true
          },
          nameGap: 10,
          nameTextStyle: {
            fontSize: 20,
            padding: [0, 0, 10, 0]
          },
          data: [7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, '']
        },
        yAxis: {
          type: 'value',
          name: '人数',
          axisLine: {
            show: true
          },
          nameGap: 20,
          nameLocation: 'center',
          nameRotate: '90',
          nameTextStyle: {
            fontSize: 16,
            padding: [0, 0, 0, 0, 0] // 加上padding可以调整其位置
          }
        },
        series: [
          {
            name: '新增隔离人数',
            type: 'line',
            stack: 'Total',
            data: [3, 5, 10, 6, 3, 12, 5],
            lineStyle: {
              color: '#0093ff'
            },
            itemStyle: {
              normal: {
                color: '#0093ff'
              }
            },
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0.1,
                      color: '#36a8fc' // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: '#76c2fa' // 0% 处的颜色
                    },
                    {
                      offset: 0.7,
                      color: '#c3e0f6' // 0% 处的颜色
                    },
                    {
                      offset: 0.9,
                      color: 'rgba(252,252,252,0.1)' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          }
        ]
      },
      option1: {
        title: {
          text: '各院隔离人员比例'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          top: '40%',
          right: '10%',
          itemGap: 40
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['70%', '50%'],
            center: ['30%', '60%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      },
      option2: {
        xAxis: {
          type: 'category',
          name: '二级学院',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          name: '比例',
          axisLine: {
            show: true
          }
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            markLine: {
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#ff1e52',
                  label: {
                    show: true
                  }
                }
              },
              data: [{ type: 'average', name: '平均值' }]
            }
          }
        ]
      }
    }
  },
  mounted() {
    const myChart = echarts.init(document.getElementById('main'))
    const result = _.merge(this.option.series.data, this.option)
    myChart.setOption(result)
    const myChart1 = echarts.init(document.getElementById('main2'))
    const result1 = _.merge(this.option1.series.data, this.option1)
    myChart1.setOption(result1)
    this.optionsAve()
    const myChart2 = echarts.init(document.getElementById('main3'))
    const result2 = _.merge(this.option2.series.data, this.option2)
    myChart2.setOption(result2)
  },
  created() {
    // this.getAllIsolationTotal()
    // this.getNewIsolationTotal()
    this.getIsolationList()
  },
  methods: {
    optionsAve() {
      let sum = 0
      for (let i = 0; i < this.option2.series[0].data.length; i++) {
        sum += this.option2.series[0].data[i]
      }
    },
    // getAllIsolationTotal() {
    //   GetAllIsolationTotal().then((res) => {
    //     console.log(res)
    //     this.topList[0].num = res.field
    //   })
    // },
    // getNewIsolationTotal() {
    //   GetNewIsolationTotal().then((res) => {
    //     console.log(res)
    //   })
    // },
    getIsolationList() {
      const list = { command: 7 }
      GetIsolationList(list).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
h3 {
  margin-top: 1em;
}
.container {
  background: #f7f7f7;
  //background: #55a532;
  padding: 0;
  margin-top: 16px;
  overflow-y: hidden;
}
.chart-top {
  //background: #55a532;
  width: 100%;
  height: 12vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .card {
    width: 30%;
    height: 85%;
    .name {
      font-size: 4em;
    }
  }
}
i {
  font-size: 3em;
  font-weight: bold;
  cursor: pointer;
}
.chart-mid {
  height: 40vw;
  width: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .card {
    position: relative;
    width: 49%;
    height: 96%;
  }
}
.chart-bottom {
  height: 28vw;
  .card {
    height: 100%;
    width: 100%;
  }
}
</style>
