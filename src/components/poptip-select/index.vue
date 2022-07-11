<template>
  <Poptip trigger="focus" placement = "bottom" v-model='visible'>
    <Input placeholder="请输入..." v-model='textValue' @on-change="selectChange" />
    <div slot="content" class="popcontent">
      <ul>
        <li v-for="item in selectData" :key="item.path" class="popmenus" @click="handClick(item.path)">
          <Icon :custom="item.icon" />
          <div class ="name">{{item.name}}</div>
          <div class ="adress">{{item.path}}</div>
        </li>
      </ul>
    </div>
  </Poptip>
</template>
<script>
export default {
  name: 'poptip-select',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      selectData: [],
      textValue: '',
      dataList: []
    }
  },
  mounted() {
    if (this.data) {
      this.data.forEach(element => {
        if (element.children) {
          element.children.forEach(item => {
            this.selectData.push({
              name: item.title,
              icon: item.custom,
              path: item.path
            })
          })
        }
      })
      this.dataList = this.selectData
    }
  },
  methods: {
    handClick(path) {
      this.$router.push(path)
      this.textValue = ''
      this.selectData = this.dataList
    },
    selectChange() {
      if (this.textValue) {
        this.selectData = this.dataList.filter(item => item.name.indexOf(this.textValue) === 0)
      } else {
        this.selectData = this.dataList
      }
      if (this.selectData.length === 0) {
        this.visible = false
      } else {
        this.visible = true
      }
    }
  }
}
</script>
<style scoped>
  .popcontent{
    white-space: normal;
    width: auto;
    overflow-y: auto;
    max-height: 150px;
  }
  .popmenus{
    text-align:left;
    line-height: normal;
    padding: 7px;
  }
  .popmenus:hover{
    background: #f3f3f3;
  }
  .name{
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: middle;
  }
  .adress{
    padding-top: 5px;
    width: 100%;
    font-size: 12px;
    color: #b4b4b4;
  }
</style>
