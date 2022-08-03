<template>
  <Modal
    v-model="display"
    @on-cancel="close"
    width="720"
  >
    <p slot="header" style="text-align: center;font-size: 20px">教职工基本信息</p>
    <div class="model-box">
      <div class="model-list-title">基础信息</div>
      <div class="top-box">
        <div class="modal-item" v-for="(item, index) in checkList1" :key="index">
          <div class="null"></div><div class="title">{{item.title}}:</div><div class="star"></div>
          <div class="core">{{item.value}}</div>
        </div>
      </div>
      <div class="model-list-title">通行信息</div>
      <div class="mid-box">
        <div class="mid-box-left"></div>
        <div class="mid-box-right">
          <Table border :columns="columns"  height="150" :data="msgList"></Table>
        </div>
      </div>
    </div>
    <div slot="footer">
      <Button @click="close" type="primary">关闭</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'index',
  props: ['display', 'checkList1', 'msgList'],
  data() {
    return {
      columns: [
        {
          title: '进入时间',
          key: 'startTime',
          align: 'center',
          width: '170'
        },
        {
          title: '离开时间',
          key: 'endTime',
          align: 'center',
          width: '170'
        },
        {
          title: '健康码颜色',
          key: 'color',
          align: 'center',
          width: '170',
          render: (h, params) => {
            let types = ''
            let typeName = ''
            console.log('查看')
            console.log(params.row)
            if (params.row.color === 0) {
              types = 'success'
              typeName = '绿码'
            } else if (params.row.color === 1) {
              types = 'warning'
              typeName = '黄码'
            } else if (params.row.color === 2) {
              types = 'error'
              typeName = '红码'
            } else {
              types = 'text'
              typeName = '------'
            }
            return h('div', [
              h('Button', {
                props: {
                  type: types
                },
                style: {
                },
                on: {
                }
              }, typeName)
            ])
          }
        }
      ],
      data: []
    }
  },
  methods: {
    close() {
      this.$emit('displayClose', false)
    }
  }
}
</script>

<style lang="less" scoped>
.model-box {
  display: flex;
  flex-direction: column;
  .top-box {
    flex-basis: 40%;
    display: flex;
    flex-wrap: wrap;
    .modal-item {
      width: 50%;
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 16px;
      .null {
        flex-basis: 5%;
      }
      .star {
        flex-basis: 3%;
      }
      .title {
        color: #050505;
        font-weight: 500;
        font-size: 18px;
        flex-basis: 35%;
        text-align: right;
        line-height: 30px;
      }
      .core {
        color: #6c6a6a;
        flex-basis: 55%;
      }
    }
  }
  .mid-box {
    display: flex;
    .mid-box-left {
      margin-top: 1em;
      color: #050505;
      font-weight: 500;
      font-size: 18px;
      text-align: right;
      flex-basis: 20%;
    }
    .mid-box-right {
      flex-basis: 72%;
      .add-condition {
        margin-top: 1em;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        height: 80px;
      }
    }
  }
  .footer-box {
    padding: 0 2em;
  }
}
.model-list-title {
  margin-top: 5px;
  margin-left: 7%;
  font-size: 18px;
  color: #000;
}
</style>
