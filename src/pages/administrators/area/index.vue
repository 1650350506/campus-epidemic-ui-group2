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
            <Checkbox-group  v-for="(item, index) in riskGradeList" :key="index" :change="chooseRiskGrade(index)">
              <Checkbox :label="item"></Checkbox>
            </Checkbox-group>
          </div>
          <Button class="btn" type="primary" @click="batchSubmit">批量提交</Button>
        </div>
      </Card>
      <Table border :columns="columns2" :data="data2" class="table"
             @on-select="selectItem"
      ></Table>
      <Page :total="100" show-elevator show-sizer class-name="page"></Page>
    </Card>
  </div>
</template>

<script>

import iHeaderBreadcrumb from '@/layouts/basic-layout/header-breadcrumb'

export default {
  name: 'index',
  components: {
    iHeaderBreadcrumb
  },
  data() {
    return {
      riskGrade: '',
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
              console.log(e)
            }
          }
        },
        {
          title: '地区编号',
          align: 'center',
          width: 130,
          key: 'uid'
        },
        {
          title: '地区名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '风险等级',
          width: '280',
          align: 'center',
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
          align: 'center',
          width: 130,
          key: 'update'
        },
        {
          title: '操作',
          width: 150,
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.show(params.index)
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
      batchNum: 0
    }
  },
  created() {
    // this.getProvinceList()
  },
  methods: {
    // 批量提交
    batchSubmit() {

    },
    selectItem(e) {
      console.log(e)
    },
    //  选择批量修改的等级
    chooseRiskGrade(index) {
      this.riskGrade = index
    }
    // getProvinceList() {
    //   const arrays = []
    //   GetProvinceList().then((res) => {
    //     res.forEach(ele => {
    //       arrays.push({
    //         level: 1,
    //         label: ele.label,
    //         value: ele.value,
    //         children: []
    //       })
    //     })
    //     this.place = arrays
    //     console.log(this.place)
    //   })
    // }
    // loadData(item, selectedData) {
    //   console.log(item)
    //   let index
    //   for (let i = 0; i < this.place.length; i++) {
    //     // eslint-disable-next-line eqeqeq
    //     if (this.place[i].value == item) {
    //       index = i
    //     }
    //   }
    //   let datalist = this.place[index]
    //   const arrays = []
    //   let parentValue
    //   if (datalist.level === 1) {
    //     parentValue = datalist.value
    //     GetCityList({ value: parentValue }).then((res) => {
    //       res.forEach(ele => {
    //         arrays.push({
    //           level: 2,
    //           label: ele.label,
    //           value: ele.value,
    //           children: []
    //         })
    //       })
    //     })
    //   }
    //   datalist.children = arrays
    //   this.place = datalist
    //   console.log(this.place)
    // },   //   console.log(item)
    //   let index
    //   for (let i = 0; i < this.place.length; i++) {
    //     // eslint-disable-next-line eqeqeq
    //     if (this.place[i].value == item) {
    //       index = i
    //     }
    //   }
    //   let datalist = this.place[index]
    //   const arrays = []
    //   let parentValue
    //   if (datalist.level === 1) {
    //     parentValue = datalist.value
    //     GetCityList({ value: parentValue }).then((res) => {
    //       res.forEach(ele => {
    //         arrays.push({
    //           level: 2,
    //           label: ele.label,
    //           value: ele.value,
    //           children: []
    //         })
    //       })
    //     })
    //   }
    //   datalist.children = arrays
    //   this.place = datalist
    //   console.log(this.place)
    // },
    // getCityListByValue(val) {
    //   // const valueList = { value: val[0] }
    //   // GetCityList(valueList).then((res) => {
    //   //   console.log(res)
    //   // })
    // }
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
