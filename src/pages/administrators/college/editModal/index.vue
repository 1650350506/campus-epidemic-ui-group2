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
          <div class="core">  <Input v-if="item.isEdit&&item.title !== '校内职务'" v-model="item.value"></Input>
            <Select v-model="item.value" style="width:190px" v-else-if="item.isEdit&&item.title === '校内职务'">
              <Option value="学院院长" label="学院院长"></Option>
              <Option value="辅导员" label="辅导员"></Option>
              <Option value="教师" label="教师"></Option>
            </Select>
            <span v-else>{{item.value}}</span>
          </div>
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
import { UpdateFacultyInfo } from '@/api/administorators/manage'

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
      data: []
    }
  },
  methods: {
    close() {
      this.$emit('editClose', false)
    },
    updateMsg() {
      const data = {
        code: this.editList1.code.value,
        phone: this.editList1.phone.value,
        schoolPost: this.editList1.schoolPost.value,
        systemPost: this.editList1.systemPost.value
      }
      UpdateFacultyInfo(data).then(() => {
        this.$Message.success('修改教职工信息成功！')
        this.close()
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
        font-size: 16px;
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
