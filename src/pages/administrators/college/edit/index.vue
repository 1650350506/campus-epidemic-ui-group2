<template>
  <Modal
    v-model="editSwitch"
    @on-cancel="close"
    width="720"
  >
    <p slot="header" style="text-align: center;font-size: 20px">教职工基本信息</p>
    <div class="model-box">
      <div class="model-list-title">基础信息</div>
      <div class="top-box">
        <div class="modal-item" v-for="(item, index) in editList1" :key="index">
          <div class="null"></div><div class="title">{{item.title}}:</div><div class="star"></div>
          <div class="core">  <Input v-if="item.isEdit" v-model="item.value"></Input> <span v-else>{{item.value}}</span></div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <Button @click="close">关闭</Button>
      <Button  type="primary" @click="updateMsg">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { UpdateFacultyInfo } from '../../../../api/administorators/manage'

export default {
  name: 'index',
  props: ['editSwitch', 'editList1'],
  data() {
    return {
      columns: [
        {
          title: '进入时间',
          key: 'name'
        },
        {
          title: '离开时间',
          key: 'age'
        },
        {
          title: '健康码颜色',
          key: 'address'
        }
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ]
    }
  },
  methods: {
    close() {
      this.$emit('editClose', false)
    },
    updateMsg() {
      const data = {
        code: this.editList1.code,
        phone: this.editList1.phone,
        schoolPost: this.editList1.schoolPost,
        systemPost: this.editList1.systemPost
      }
      UpdateFacultyInfo(data).then(() => {
        this.$Message.success('修改教职工信息成功！')
      })
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
