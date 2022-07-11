<template>
  <div class="dashboard-workplace-todo i-table-no-border">
    <Table :data="data" :columns="columns" :draggable="true" @on-drag-drop="onDragDrop" @on-row-click="handJump">
      <template slot="move">
        <Icon type="md-menu" class="dashboard-workplace-todo-move" title="拖拽排序" />
      </template>
      <template slot-scope="{ row }" slot="user">
        <AvatarList :list="row.user" size="small" />
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: [],
      columns: [
        {
          title: ' ',
          width: 40,
          slot: 'move'
        },
        {
          title: '流程名称',
          minWidth: 80,
          key: 'processDefinitionName'
        },
        {
          title: '当前步骤',
          minWidth: 100,
          key: 'taskName'
        }
      ]
    }
  },
  watch: {
    value(newVal) {
      this.data = newVal
    }
  },
  methods: {
    onDragDrop(a, b) {
      this.data.splice(b, 1, ...this.data.splice(a, 1, this.data[b]))
    },
    handJump() {
      this.$router.push('/work/todo')
    }
  }
}
</script>
<style lang="less">
    .dashboard-workplace-todo{
        padding-bottom: 8px;
        &-move{
            cursor: pointer;
            position: relative;
            left: -14px;
            color: #808695;
        }
    }
</style>
