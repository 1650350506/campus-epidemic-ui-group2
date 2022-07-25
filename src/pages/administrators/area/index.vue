<template>
  <div>
    <Card :bordered="false"  class="card">
      <!--       这是面包屑组件-->
      <i-header-breadcrumb  ref="breadcrumb" />
      <h2>你好！ 管理员！</h2>
    </Card>
    <Card class="card-marginTop card">
      <div slot="title" class="search-module">
        <div class="search-left">
          <i class="ivu-icon ivu-icon-ios-search"></i>
          <Cascader style="width: 300px" :data="place" v-model="placeValue" @on-change="loadData"></Cascader>
        </div>
        <Button type="primary" class="btn">查询</Button>
        <Button class="btn">重置</Button>
      </div>
      <Card style="margin-bottom: 1em">
        <div class="batch-box">
          <div class="select-text">已选择 <span style="color: #d41944; font-size: 18px">{{batchNum}}</span> 项</div>
          <div class="group">
            <RadioGroup  @on-change="chooseRiskGrade">
              <Radio  v-for="(item, index) in riskGradeList" :key="index" :label="item"></Radio>
            </RadioGroup>
          </div>
          <Button class="btn" type="primary" @click="batchSubmit">批量提交</Button>
        </div>
      </Card>
      <Table  :columns="columns2" :data="data2" :border="false" class="table"
              @on-selection-change="selectItem"
      ></Table>
      <Page :total="100" show-elevator show-sizer class-name="page"></Page>
    </Card>
  </div>
</template>

<script>

import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'
import { GetProvinceList } from '@api/administorators/riskArea'

export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb
  },
  data() {
    return {
      riskGrade: 0,
      riskGradeList: ['高风险', '中风险', '低风险'],
      placeValue: [],
      place: [],
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
        res.forEach(ele => {
          arrays.push({
            level: 1,
            label: ele.label,
            value: ele.value,
            children: []
          })
        })
        this.place = arrays
        console.log(this.place)
      })
    },
    loadData(item, selectedData) {
      console.log(item)
      console.log(selectedData)
    },   //   console.log(item)
    getCityListByValue(val) {
      // const valueList = { value: val[0] }
      // GetCityList(valueList).then((res) => {
      //   console.log(res)
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.search-module {
  width: 70%;
  display: flex;
  .search-left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2em;
    i {
      font-size: 2em;
      margin-right: 5px;
    }
  }
  .btn {
    margin-right: 2em;
  }
}
.batch-box {
  display: flex;
  align-items: center;
  .select-text {
    margin-left: 1.2vw;
  }
  .group {
    margin-left: 10px;
  }
  .btn {
    margin-left: 1vw;
  }
}
</style>
