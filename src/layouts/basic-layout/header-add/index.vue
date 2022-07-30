<template>
  <div style="float: left">
    <i class="ivu-icon ivu-icon-ios-add" style="font-size: 1.4em; font-weight: bold; cursor: pointer" @click="addDisplay = true"></i>
    <Modal
      v-model="addDisplay"
      @on-ok="handleAddList"
      @on-cancel="addDisplay = false"
      width="720"
    >
      <div slot="header" class="header-title" style="font-size: 20px; color: #000">提交通行记录</div>
      <div class="modal-box">
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>职工工号:</span></div><div class="star"></div>
          <div class="core"><Input placeholder="请输入账号" v-model="addList1.code"></Input>
          </div>
        </div>
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>职工姓名:</span></div><div class="star"></div>
          <div class="core"><Input placeholder="请输入密码" v-model="addList1.name"></Input>
          </div>
        </div>
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>进入时间:</span></div><div class="star"></div>
          <div class="core"> <Date-picker type="datetime" v-model="addList1.stateTime" placeholder="选择日期和时间" style="width: 190px" format="yyyy-MM-dd HH:mm:ss"></Date-picker>
          </div>
        </div>
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>离开时间:</span></div><div class="star"></div>
          <div class="core"> <Date-picker type="datetime" v-model="addList1.endTime" placeholder="选择日期和时间" style="width: 190px" format="yyyy-MM-dd HH:mm:ss"></Date-picker>
          </div>
        </div>
        <div class="modal-item">
          <div class="null"></div><div class="title"><span>健康码颜色:</span></div><div class="star"></div>
          <div class="core">
            <Radio-group v-model="addList1.color">
              <Radio label="绿码" value="0"></Radio>
              <Radio label="黄码" value="1"></Radio>
              <Radio label="红码" value="2"></Radio>
            </Radio-group>
          </div>
        </div>
      </div>
      <div class="temp">代表必填项</div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      addDisplay: false,
      addList1: {
        code: '',
        name: '',
        stateTime: '',
        endTime: '',
        color: 0
      }
    }
  },
  methods: {
    handleAddList() {
      console.log(this.addList1)
      this.addDisplay = false
    }
  }
}
</script>

<style lang="less" scoped>
.modal-box {
  display: flex;
  flex-wrap: wrap;
  .temp {
    position: absolute;
    right: 5%;
    bottom: 13%;
    font-size: 16px;
    color: #000;
    &::before {
      content: '*';
      position: absolute;
      left: -10%;
      top: 70%;
      font-size: 16px;
      color: #fc0000;
      transform: translate(-50%, -50%);
    }
  }
  .modal-item {
    width: 50%;
    height: 60px;
    display: flex;
    margin: 5px 0;
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
      flex-basis: 30%;
      text-align: right;
      line-height: 30px;
      span {
        position: relative;
        &::before {
          content: '*';
          position: absolute;
          left: -13%;
          top: 70%;
          color: #fc0000;
          transform: translate(-50%, -50%);
        }
      }
    }
    .core {
      color: #000000;
      flex-basis: 55%;
    }
  }
}
.temp {
  position: absolute;
  right: 5%;
  bottom: 20%;
  font-size: 16px;
  color: #000;
  &::before {
    content: '*';
    position: absolute;
    left: -10%;
    top: 70%;
    font-size: 16px;
    color: #fc0000;
    transform: translate(-50%, -50%);
  }
}
</style>
