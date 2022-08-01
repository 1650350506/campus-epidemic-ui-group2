<template>
  <div style="margin:84px 24px 0 24px">
    <Card :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2 style="margin-top: 10px;">你好！ 管理员！</h2>
    </Card>
    <!--        <i class="ivu-icon ivu-icon-ios-refresh" slot="extra"></i>-->
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
        <h2 slot="title" style="margin: 1em 0;">各学院防疫人员分布</h2>
        <i class="ivu-icon ivu-icon-ios-refresh" slot="extra"></i>
        <div id="main3" :style="{ width: '100%' , height: '22vw'}"></div>
      </Card>
    </div>
    <div class="chart-mid card-marginTop">
      <Card class="card" :bordered="false">
        <h2 slot="title" style="margin: 1em 0;">新增隔离人数趋势</h2>
        <div slot="extra">
          <Select :value="timeList" class="select-box" @on-change="selectTime">
            <Option v-for="item in timeList" :value="item.value" :key="item">{{ item.label }}</Option>
          </Select>
        </div>
        <div id="main" style="width: 100%; height: 58vh;"></div>
      </Card>
      <Card class="card" :bordered="false">
        <h2 slot="title" style="margin: 1em 0;">各个学院隔离人员分布</h2>
        <i class="ivu-icon ivu-icon-ios-refresh" slot="extra"></i>
        <div id="main2" :style="{ width: '98%', height: '60vh' }"></div>
      </Card>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import {
  GetAllIsolationTotal, GetEachEpidemicListAnalysis, GetEachIsolationListAnalysis,
  GetIsolationListByDate,
  GetNewIsolationTotal,
  GetRelieveIsolationTotal
} from '@api/administorators/analysis'
import { GetUserInfo } from '../../../api/system/user'

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
        { name: '新增隔离人数', num: 0, icon: 'iconfont icon-tubiaoshangshengqushi', color: '#c31c1c' },
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
          // data: this.eachDays
          // data: [7.4, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7]
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
            padding: [0, 0, 0, 0, 0] // 加上padding可以调整其位置
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
            name: '新增隔离人数',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            smooth: true,
            lineStyle: { // 设置线条的style等
              normal: {
                color: '#9bcfff' // 折线线条颜色:红色
              }
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
          top: '20%',
          right: '10%',
          itemGap: 40
        },
        series: [
          {
            name: 'Access From',
            itemGap: -10,
            type: 'pie',
            radius: ['65%', '40%'],
            center: ['30%', '50%'],
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
          name: '比例',
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
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#435EBE',
                label: {
                  show: false
                }
              }
            },
            markLine: {
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#57CAEB',
                  label: {
                    show: true
                  }
                }
              },
              data: [{ type: 'average', name: '平均值' }]
            }
          }
        ]
      },
      option3: {
        xAxis: {
          type: 'category',
          data: [],
          splitLine: false,
          axisTick: false,
          show: false
        },
        yAxis: {
          type: 'value',
          splitLine: false,
          show: false
        },
        series: [
          {
            data: [0, 2, 1, 1, 4, 3, 8, 6, 3, 1, 1, 4, 3.5, 5, 5, 4, 3, 8, 6, 3, 1, 1, 4, 3.5, 5, 5, 4, 3, 8, 4, 3.5, 1, 2],
            type: 'line',
            smooth: true,
            symbol: 'none'
          }
        ],
        eachDays: [],
        eachCount: [],
        queryDayInfo: {
          command: 7
        }
      }
    }
  },
  mounted() {
    this.updateOptions()
    this.updateOptions1()
    this.updateOptions2()
  },
  created() {
    this.getOldIsolationListByDate()
    this.getAllIsolationTotal()
    this.getNewIsolationTotal()
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
    optionsAve() {
      let sum = 0
      for (let i = 0; i < this.option2.series[0].data.length; i++) {
        sum += this.option2.series[0].data[i]
      }
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
        this.option.series[0].data = arr2
        this.option.xAxis.data = arr1
        this.updateOptions()
      })
    },
    getEachEpidemicListAnalysis() {
      GetEachEpidemicListAnalysis().then(res => {
        const arr1 = Object.keys(res.field)
        const arr2 = Object.values(res.field)
        this.option2.series[0].data = arr2
        this.option2.xAxis.data = arr1
        this.updateOptions1()
      })
    },
    getEachIsolationListAnalysis() {
      GetEachIsolationListAnalysis().then(res => {
        const arr1 = Object.keys(res.field)
        const arr2 = Object.values(res.field)
        const arr = []
        console.log(res.field)
        for (let i = 0; i < arr1.length; i++) {
          if (i < 7) {
            arr.push({
              name: arr1[i],
              value: arr2[i]
            })
          }
        }
        this.option1.series[0].data = arr
        // console.log(this.option.series)
        this.updateOptions2()
      })
    },
    dateFormat(time) {
      const date = new Date(time)
      const year = date.getFullYear()
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
      // 拼接
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
  //background: #55a532;
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
  //background: #55a532;
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
  height: 30vw;
  .card {
    height: 100%;
    width: 100%;
  }
}
</style>
