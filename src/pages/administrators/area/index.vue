<template>
  <div  style="margin:84px 24px 0 24px">
    <Card :bordered="false"  class="card">
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2 style="margin-top: 10px;">你好！ {{userInfo.roleName}}！</h2>
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
        <Button @click="reset">重置</Button>
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
        <Poptip
          confirm
          title="你确定要修改所选地区的风险等级吗？"
          @on-ok="batchSubmit"
        >
          <div class="btn">批量提交</div>
        </Poptip>
      </div>
      <div class="table-box">
        <Table  :columns="columns2" :data="data2" :border="false" class="table"
                @on-select="onSelectAll" @on-select-cancel='onSelectCancel'
                @on-select-all ='onSelectAll' @on-select-all-cancel='onSelectAllCancel'
        >
        </Table>
      </div>
      <Page :total="total" :current="queryInfo.pageNum" show-elevator show-sizer class-name="page" @on-change="editPageNum" @on-page-size-change="editPageSize"></Page>
    </Card>
  </div>
</template>

<script>

import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import {
  GetProvinceList,
  GetCityList,
  GetCountyList,
  GetStreetList,
  UpdateRiskAreaByCode,
  BatchUpdateRiskAreaByCode,
  GetRiskInfoListByProvince
} from '@api/administorators/riskArea'
import { mapState } from 'vuex'

export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb
  },
  data() {
    return {
      batchSum: 0,
      riskGrade: null,
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
          key: 'code'
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
          key: 'riskLevel',
          render: (h, params) => {
            const arr = [{ riskLevel: '低风险', checked: false },
              { riskLevel: '中风险', checked: false },
              { riskLevel: '高风险', checked: false }]
            const temp = params.row.riskLevel
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
                  label: item.riskLevel,
                  value: item.checked
                },
                on: {
                  'on-change': (e) => {
                    this.data2[params.index].riskLevel = index
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
          key: 'updateTime'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [h('Poptip', {
              props: {
                placement: 'top-start',
                confirm: true,
                transfer: true,
                title: '你确定要修改所选地区的风险等级吗？'
              },
              on: {
                'on-ok': () => {
                  this.submitInfo(params.row)
                },
                // eslint-disable-next-line no-empty-function
                'on-cancel': () => {
                }
              }
            }, [
              h('Button', {
                class: 'deleteHover',
                props: {
                  size: 'small'
                },
                style: {
                  color: '#01b0ff',
                  marginRight: '5px',
                  border: '0px',
                  background: 'transparent'
                },
                on: {
                }
              }, '提交')
            ])
            ])
          }
        }
      ],
      data2: [],
      batchList: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        value: ''
      },
      total: 0,
      selectedData: [], // 选中的数组
      arr1: [], // 原本
      arr2: [] // 去重后的，
    }
  },
  computed: {
    ...mapState('admin/account', ['userInfo'])
  },
  created() {
    this.getProvinceList()
    this.getRiskInfoListByProvince()
  },
  methods: {
    onSelectAll(selection) {
      // arr1 去重之前的 选中后合并的数组
      this.arr1 = [...selection, ...this.selectedData]
      // 去重  some  和every 相反，只要有一个满足条件，就返回true
      for (const val of this.arr1) {
        if (!this.arr2.some(item => item.code === val.code)) {
          this.arr2.push(val)
        }
      }
      if (this.arr2.length >= 30) {
        this.enableModal = true
      }
      this.batchSum = this.arr2.length
    },

    // 取消选中某一项时触发
    onSelectCancel(selection, row) {
      const result = this.arr2.findIndex((ele) => {
        return ele.code === row.code
      })
      this.arr2.splice(result, 1)
      this.batchSum = this.arr2.length
    },

    // 点击取消全选时触发
    onSelectAllCancel() {
      this.arr2 = this.arr2.filter(item => {
        return this.data.every(item2 => {
          return item.code !== item2.code
        })
      })
      console.log(this.arr2)
      this.batchSum = this.arr2.length
    },
    // 批量提交
    batchSubmit() {
      this.batchList = []
      this.arr2.forEach((item) => {
        this.batchList.push(item.code)
      })
      const data = {
        list: this.batchList,
        riskLevel: this.riskGrade
      }
      BatchUpdateRiskAreaByCode(data).then(() => {
        this.$Message.success('批量修改风险地区成功！')
        this.queryInfo.value = ''
        this.arr1 = []
        this.arr2 = []
        this.batchSum = 0
        this.getRiskInfoListByProvince()
      })
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
        riskLevel: info.riskLevel
      }
      UpdateRiskAreaByCode(RiskInfo).then(res => {
        this.$Message.success('修改风险等级成功!')
        this.getRiskInfoListByProvince()
      })
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
    reset() {
      this.provinceValue = ''
      this.cityValue = ''
      this.countyValue = ''
      this.streetValue = ''
      this.getRiskInfoListByProvince()
    },
    loadData(value, selectedData) {
      console.log(value[0])
      console.log(selectedData[0].level)
      if (selectedData[0].level === 1) {
        this.getCityListByValue(value[0])
        this.queryInfo.pageNum = 1
        this.queryInfo.value = value[0]
        this.getRiskInfoListByProvince()
        this.cityValue = ''
        this.countyValue = ''
        this.streetValue = ''
      } else if (selectedData[0].level === 2) {
        this.queryInfo.pageNum = 1
        this.getCountyListByValue(value[0])
        this.queryInfo.value = value[0]
        this.getRiskInfoListByProvince()
        this.countyValue = ''
        this.streetValue = ''
      } else if (selectedData[0].level === 3) {
        this.queryInfo.pageNum = 1
        this.queryInfo.value = value[0]
        this.getRiskInfoListByProvince()
        this.getStreetListByValue(value[0])
        this.streetValue = ''
      } else if (selectedData[0].level === 4) {
        this.queryInfo.pageNum = 1
        this.queryInfo.value = value[0]
        this.getRiskInfoListByProvince()
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
    },
    // 选择页码
    editPageNum(e) {
      this.queryInfo.pageNum = e
      GetRiskInfoListByProvince(this.queryInfo).then(res => {
        res.field.data.forEach(item => {
          this.arr2.forEach(element => {
            if (element.code === item.code) {
              this.$set(item, '_checked', true)
            }
          })
        })
        this.total = res.field.total
        this.data2 = res.field.data
      })
    },
    // 选择当页最大条数
    editPageSize(e) {
      this.queryInfo.pageSize = e
      this.getRiskInfoListByProvince()
    },
    getRiskInfoListByProvince() {
      console.log(this.queryInfo)
      GetRiskInfoListByProvince(this.queryInfo).then(res => {
        this.total = res.field.total
        this.data2 = res.field.data
      })
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
    cursor: pointer;
    margin-left: 1vw;
    border: 0;
    background: transparent;
    color: #1e93ff;
  }
}
</style>
