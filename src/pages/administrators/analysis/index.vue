<template>
  <div style="margin:84px 24px 0 24px">
    <Card :bordered="false"  class="card">
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2 style="margin-top: 10px;">你好！ {{userInfo.roleName}}！</h2>
    </Card>
    <div class="chart-top">
      <Card v-for="(item, index) in topList" :key="index"  class="card-box" :style="{background:'linear-gradient(-45deg, transparent 50%,'+bgColorList[index]+' 0)'}">
        <Row>
          <Col span="8">
            <div class="card-left-item">
              <i :class="item.icon"></i>
            </div>
          </Col>
          <Col span="2"></Col>
          <Col span="12" class="col-style">
            <h2 style="font-size: 24px">{{item.name}}</h2>
            <h2 class="num">{{item.num}}</h2>
          </Col>
        </Row>
      </Card>
    </div>
    <div class="chart-bottom" style="background: #fff">
      <Card class="card">
        <h2 slot="title" style="margin: 1em 0;">隔离人员/防疫人员配比</h2>
        <div id="main3" :style="{ width: '100%' , height: '24vw'}"></div>
      </Card>
    </div>
    <div class="chart-mid card-marginTop">
      <Card class="card" :bordered="false">
        <h2 slot="title" style="margin: 1em 0;">新增隔离人数趋势</h2>
        <div slot="extra">
          <Select v-model="selectModel" class="select-box" @on-change="selectTime" placeholder="过去7天">
            <Option value="7">过去7天</Option>
            <Option value="14">过去14天</Option>
          </Select>
        </div>
        <div id="main" style="width: 100%; height: 58vh;"></div>
      </Card>
      <Card class="card" :bordered="false">
        <h2 slot="title" style="margin: 1em 0;">各个学院隔离人员分布</h2>
        <div id="main2" :style="{ width: '100%', height: '60vh' }"></div>
      </Card>
    </div>
  </div>
</template>
<script>
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import {
  GetAllIsolationTotal, GetEachEpidemicListAnalysis, GetEachIsolationListAnalysis,
  GetIsolationListByDate,
  GetNewIsolationTotal,
  GetRelieveIsolationTotal
} from '@api/administorators/analysis'
import { mapState } from 'vuex'
const echarts = require('echarts')

export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb
  },
  data() {
    return {
      bgColorList: [
        '#f4a858', '#7cb5f8', '#7df7b0'
      ],
      topList: [
        { name: '总隔离人数', num: 0, icon: 'iconfont icon-computeChart' },
        { name: '新增隔离人数', num: 0, icon: 'iconfont icon-tubiaoshangshengqushi' },
        { name: '新增解除人数', num: 0, icon: 'iconfont icon-tubiaoxiajiangqushi' }
      ],
      selectModel: '过去7天',
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
          boundaryGap: false,
          nameLocation: 'center',
          splitLine: {
            show: false,
            lineStyle: {
              color: '#ebebeb'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          nameGap: 10,
          nameTextStyle: {
            fontSize: 14,
            padding: [0, 0, 10, 0]
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          nameGap: 20,
          nameLocation: 'center',
          nameRotate: '90',
          nameTextStyle: {
            fontSize: 14,
            padding: [0, 0, 0, 0, 0]
          },
          splitLine: {
            // 网格线
            lineStyle: {
              type: 'dashed'
            },
            show: true
          }
        },
        series: [
          {
            name: '新增隔离人数',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            smooth: true,
            lineStyle: { // 设置线条的style等
              normal: {
                color: '#bda1f8', // 折线线条颜色:红色,
                width: 3
              }
            },
            itemStyle: {
              normal: {
                color: '#996df7'
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
                      color: '#996df7' // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: '#c2a8f9' // 0% 处的颜色
                    },
                    {
                      offset: 0.8,
                      color: '#e4d9fb' // 0% 处的颜色
                    },
                    {
                      offset: 0.9,
                      color: '#f8f6fc' // 100% 处的颜色
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
          text: '各院隔离人员比例',
          subtextStyle: {
            color: '#B4E4FF',
            fontSize: 8
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          top: '30%',
          right: '0%',
          itemGap: 20
        },
        series: [
          {
            itemGap: -10,
            type: 'pie',
            radius: ['65%', '40%'],
            center: ['40%', '60%'],
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
            }
          }
        ]
      },
      option2: {
        legend: {
        },
        xAxis: {
          type: 'category',
          name: '二级学院',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: '人数',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            // 网格线
            lineStyle: {
              type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
            },
            show: true // 隐藏或显示
          }
        },
        series: [
          {
            name: '防疫人员',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: []
          },
          {
            name: '隔离人员',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: []
          }
        ]
      },
      queryDayInfo: {
        command: 7
      }
    }
  },
  computed: {
    ...mapState('admin/account', ['userInfo'])
  },
  mounted() {
    this.updateOptions()
    this.updateOptions1()
    this.updateOptions2()
  },
  created() {
    this.getOldIsolationListByDate()
    this.getNewIsolationTotal()
    this.getAllIsolationTotal()
    this.getReliveIsolationTotal()
    this.getEachEpidemicListAnalysis()
    this.getEachIsolationListAnalysis()
  },
  methods: {
    // 选择修改时间
    selectTime(e) {
      this.queryDayInfo.command = e
      this.getOldIsolationListByDate()
    },
    updateOptions() {
      const myChart = echarts.init(document.getElementById('main'))
      myChart.setOption(this.option, true)
    },
    updateOptions1() {
      const myChart = echarts.init(document.getElementById('main3'))
      myChart.setOption(this.option2, true)
    },
    updateOptions2() {
      const myChart = echarts.init(document.getElementById('main2'))
      myChart.setOption(this.option1, true)
    },
    // 获得总隔离人数
    getAllIsolationTotal() {
      GetAllIsolationTotal().then((res) => {
        this.topList[0].num = res.field
      })
    },
    // 获得新增隔离人数
    getNewIsolationTotal() {
      GetNewIsolationTotal().then((res) => {
        this.topList[1].num = res.field
      })
    },
    // 获得新增解除人数
    getReliveIsolationTotal() {
      GetRelieveIsolationTotal().then((res) => {
        this.topList[2].num = res.field
      })
    },
    getOldIsolationListByDate() {
      GetIsolationListByDate(this.queryDayInfo).then((res) => {
        const arr1 = []
        const arr2 = []
        res.field.forEach(item => {
          arr1.push(parseFloat(this.dateFormat(item.to_char)))
          arr2.push(item.count)
        })
        this.option.series[0].data = arr2.reverse()
        this.option.xAxis.data = arr1.reverse()
        this.updateOptions()
      })
    },
    getEachEpidemicListAnalysis() {
      GetEachEpidemicListAnalysis().then(res => {
        const arr1 = Object.keys(res.field[0])
        const arr2 = Object.values(res.field[0])
        const arr4 = Object.values(res.field[1])
        console.log(res)
        this.option2.series[0].data = arr2
        this.option2.series[1].data = arr4
        this.option2.xAxis.data = arr1
        this.updateOptions1()
      })
    },
    getEachIsolationListAnalysis() {
      GetEachIsolationListAnalysis().then(res => {
        const arr = []
        for (let i = 0; i < res.field.length; i++) {
          if (i < 7) {
            arr.push({
              name: Object.keys(res.field[i])[0],
              value: Object.values(res.field[i])[0]
            })
          }
        }
        this.option1.series[0].data = arr
        this.updateOptions2()
      })
    },
    dateFormat(time) {
      const date = new Date(time)
      const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      return `${month}.${day}`
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
  padding: 0;
  margin-top: 16px;
  overflow-y: hidden;
}
canvas {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.select-box {
  width: 140px;
  margin-top: 1em;
}
.chart-top {
  width: 100%;
  height: 14vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .card-box {
    width: 30%;
    height: 85%;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.4);
  }
}
i {
  font-size: 3em;
  font-weight: bold;
  cursor: pointer;
}
.card-left-item {
  margin-top: 8%;
  text-align: center;
  i {
    font-size: 6em;
  }
}
.col-style {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}
.num {
  font-size: 4em;
}
.chart-mid {
  height: 42vw;
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
  height: 33vw;
  .card {
    height: 100%;
    width: 100%;
  }
}
</style>
