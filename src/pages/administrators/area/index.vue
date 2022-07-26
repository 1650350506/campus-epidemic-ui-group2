<template>
  <div>
    <Card :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2 class="bread-title">你好！ 管理员！</h2>
    </Card>
    <Card class="card">
      <div class="search-module">
        <div class="search-left">
          <div>地区查询</div>
          <Cascader style="width: 150px; margin: 0 10px 0 5px" :data="provinceData" v-model="provinceValue" placeholder="请选择省份" @on-change="loadData"></Cascader>
          <Cascader style="width: 150px; margin: 0 10px 0 5px" :data="cityData" v-model="cityValue" placeholder="请选择城市" @on-change="loadData"></Cascader>
          <Cascader style="width: 150px; margin: 0 10px 0 5px" :data="countyData" v-model="countyValue" placeholder="请选择区县" @on-change="loadData"></Cascader>
          <Cascader style="width: 150px; margin: 0 10px 0 5px" :data="streetData" v-model="streetValue" placeholder="请选择街道" @on-change="loadData"></Cascader>
        </div>
        <Button class="btn" type="primary">查询</Button>
        <Button>重置</Button>
      </div>
    </Card>
    <Card class="card-marginTop card">

      <div class="batch-box">
        <div class="select-text">已选择 <span>{{batchSum}}</span>项</div>
        <div class="group">
          <RadioGroup  @on-change="chooseRiskGrade">
            <Radio  v-for="(item, index) in riskGradeList" :key="index" :label="item"></Radio>
          </RadioGroup>
        </div>
        <Button class="btn" type="ghost" @click="batchSubmit">批量提交</Button>
      </div>
      <div class="table-box"> <Table  :columns="columns2" :data="data2" :border="false" class="table" @on-selection-change="selectItem"></Table></div>
      <Page :total="100" show-elevator show-sizer class-name="page"></Page>
    </Card>
  </div>
</template>

<script>

import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import { GetProvinceList, GetCityList, GetCountyList, GetStreetList } from '@api/administorators/riskArea'

export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb
  },
  data() {
    return {
      batchSum: 0,
      riskGrade: 0,
      riskGradeList: ['高风险', '中风险', '低风险'],
      provinceValue: '',
      provinceData: [],
      cityValue: '',
      cityData: [],
      countyValue: '',
      countyData: [],
      streetValue: '',
      streetData: [],
      columns2: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          on: {
            'on-change': (e) => {
              console.log('全选')
              console.log(e)
            }
          }
        },
        {
          title: '地区编号',
          align: 'left',
          key: 'uid'
        },
        {
          title: '地区名称',
          width: '300',
          key: 'name',
          align: 'left'
        },
        {
          title: '风险等级',
          align: 'left',
          width: '340',
          key: 'grade',
          render: (h, params) => {
            const arr = [{ grade: '低风险', checked: false },
              { grade: '中风险', checked: false },
              { grade: '高风险', checked: false }]
            const temp = params.row.grade
            if (temp === 0) {
              arr[0].checked = true
            } else if (temp === 1) {
              console.log()
              arr[1].checked = true
            } else if (temp === 2) {
              arr[2].checked = true
            }
            const CheckboxList = []
            arr.forEach((item, index) => {
              CheckboxList.push(h('Radio', {
                props: {
                  label: item.grade,
                  value: item.checked
                },
                on: {
                  'on-change': (e) => {
                    this.data2[params.index].grade = index
                  }
                }
              }, item))
            })
            return h('div', {}, [
              CheckboxList])
          }

        },
        {
          title: '更新时间',
          align: 'left',
          key: 'update'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                  color: '#01b0ff',
                  background: 'transparent',
                  border: '0px'
                },
                on: {
                  click: () => {
                    this.submitInfo(params.row)
                  }
                }
              }, '提交')
            ])
          }
        }
      ],
      data2: [
        {
          uid: 199200118,
          name: '浙江省杭州市余杭区无常街道后山路',
          grade: 0,
          update: '2022-05-01'
        },
        {
          uid: 199200118,
          name: '浙江省杭州市余杭区无常街道后山路',
          grade: 1,
          update: '2022-05-01'
        },
        {
          uid: 199200118,
          name: '浙江省杭州市余杭区无常街道后山路',
          grade: 2,
          update: '2022-05-01'
        },
        {
          uid: 199200118,
          name: '浙江省杭州市余杭区无常街道后山路',
          grade: 2,
          update: '2022-05-01'
        },
        {
          uid: 199200118,
          name: '浙江省杭州市余杭区无常街道后山路',
          grade: 2,
          update: '2022-05-01'
        },
        {
          uid: 199200118,
          name: '浙江省杭州市余杭区无常街道后山路',
          grade: 2,
          update: '2022-05-01'
        },
        {
          uid: 199200118,
          name: '浙江省杭州市余杭区无常街道后山路',
          grade: 2,
          update: '2022-05-01'
        }
      ],
      batchList: [
      ]
    }
  },
  created() {
    this.getProvinceList()
  },
  methods: {
    // 批量提交
    batchSubmit() {
      console.log(this.riskGrade)
      this.batchList.forEach((item) => {
        item.risk_level = this.riskGrade
      })
      console.log(this.batchList)
    },
    // 表格
    selectItem(e) {
      this.batchList = []
      e.forEach((item, index) => {
        console.log(item)
        this.batchList.push({
          code: item.uid,
          risk_level: item.grade
        })
      })
      this.batchSum = this.batchList.length
    },
    //  选择批量修改的等级
    chooseRiskGrade(index) {
      let state
      if (index === '低风险') {
        state = 0
      } else if (index === '中风险') {
        state = 1
      } else if (index === '高风险') {
        state = 2
      }
      this.riskGrade = state
    },
    submitInfo(info) {
      const RiskInfo = {
        code: info.code,
        risk_level: info.risk_level
      }
    //  post请求
    },
    getProvinceList() {
      const arrays = []
      GetProvinceList().then((res) => {
        console.log(res)
        res.forEach(ele => {
          arrays.push({
            level: 1,
            label: ele.label,
            value: ele.value
          })
        })
        this.provinceData = arrays
      })
    },
    loadData(value, selectedData) {
      console.log(value[0])
      console.log(selectedData[0].level)
      if (selectedData[0].level === 1) {
        this.getCityListByValue(value[0])
      } else if (selectedData[0].level === 2) {
        this.getCountyListByValue(value[0])
      } else if (selectedData[0].level === 3) {
        this.getStreetListByValue(value[0])
      } else if (selectedData[0].level === 4) {
        this.getRiskAreaListByCode(value[0])
      }
    },
    getCityListByValue(val) {
      const valueList = { value: val }
      const arrays = []
      GetCityList(valueList).then((res) => {
        res.forEach(ele => {
          arrays.push({
            level: 2,
            label: ele.label,
            value: ele.value
          })
        })
      })
      this.cityData = arrays
    },
    getCountyListByValue(val) {
      const valueList = { value: val }
      const arrays = []
      GetCountyList(valueList).then((res) => {
        res.forEach(ele => {
          arrays.push({
            level: 3,
            label: ele.label,
            value: ele.value
          })
        })
      })
      this.countyData = arrays
    },
    getStreetListByValue(val) {
      const valueList = { value: val }
      const arrays = []
      GetStreetList(valueList).then((res) => {
        res.forEach(ele => {
          arrays.push({
            level: 4,
            label: ele.label,
            value: ele.value
          })
        })
      })
      this.streetData = arrays
    },
    getRiskAreaListByCode(code) {
      const container = { code: code }
      console.log(container)
    }
  }
}
</script>

<style lang="less" scoped>
.search-module {
  width: 100%;
  display: flex;
  .search-left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1em;
    i {
      font-size: 2em;
      margin-right: 5px;
    }
  }
  .btn {
    margin-right: 1em;
  }
}
.batch-box {
  margin-bottom: 10px;
  border: 1px solid #afd0ee;
  background: #E6F7FF;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  .select-text {
    margin:0 1.2vw;
    span {
      color: #0e92e7;
      font-size: 18px;
      padding: 0 2px;
    }
  }
  .btn {
    margin-left: 1vw;
    border: 0;
    background: transparent;
    color: #1e93ff;
  }
}
</style>
