<template>
  <div>
    <!--    审批信息-->
    <Card :bordered="false" dis-hover class="ivu-mt">
      <p slot="title">审批信息</p>
      <slot></slot>
    </Card>

    <!--    流程信息-->
    <Card :bordered="false" dis-hover class="ivu-mt">
      <p slot="title">流程信息</p>
      <div style="padding-left: 50px">
        <Timeline>
          <TimelineItem  v-for="item in historyList" :key='item.id'>
            <p class="time">{{ item.createTime }}</p>
            <Card style="width:450px">
              <p class="content">{{ item.assigneeName }} 在 [{{ item.createTime }}] 开始处理 [{{ item.historyActivityName }}] 环节</p>
              <p class="content" v-if='item.historyActivityDurationTime'>任务历时 [{{ item.historyActivityDurationTime }}]</p>
              <p class="content" v-if='item.comment'>批复意见: [{{ item.comment }}]</p>
              <p class="content" v-if='item.endTime'>结束时间: [{{ item.endTime }}]</p>
            </Card>
          </TimelineItem>
        </Timeline>
      </div>
    </Card>

    <!--    流程跟踪-->
    <Card :bordered="false" dis-hover class="ivu-mt">
      <p slot="title">流程跟踪</p>
<!--      <div align="center">-->
      <div>
        <img :src="flowPic"/>
      </div>
    </Card>
  </div>
</template>
<script>

    import { diagramView, historyFlowList } from '@/api/flow/process';

    export default {
        name: 'process-detail',
        props: {
            processInstanceId: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                historyList: [],
                flowPic: ''
            }
        },
        created () {
            this.getHistoryFlowList()
            this.getDiagramView()
        },
        methods: {
            getHistoryFlowList () {
                historyFlowList({ processInstanceId: this.processInstanceId })
                    .then(rst => {
                        this.historyList = rst
                    })
                    .catch(error => {
                        this.$Message.error(error.message)
                    })
            },
            getDiagramView () {
                diagramView({ processInstanceId: this.processInstanceId })
                    .then(res => {
                        // 返回数据
                        const blob = new Blob([res], { type: res.type })
                        const url = window.URL.createObjectURL(blob)
                        this.flowPic = url;
                    })
                    .catch(error => {
                        // 异常情况
                        this.$Message.error(error.message)
                    })
            }
        }
    }
</script>
<style lang="less" scoped>
.time{
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 10px;
}
.content{
    padding-left: 5px;
}
</style>
