<template>
  <!--  <div>-->
  <!--    <div class="i-layout-page-header">-->
  <!--      <PageHeader title="工作台" hidden-breadcrumb>-->
  <!--        <div slot="content">-->
  <!--          <Avatar-->
  <!--            class="dashboard-workplace-header-avatar"-->
  <!--            :src="info.avatar"-->
  <!--          />-->
  <!--          <div class="dashboard-workplace-header-tip">-->
  <!--            <p class="dashboard-workplace-header-tip-title">-->
  <!--              您好，{{ info.name }}，开始您一天的工作吧！-->
  <!--            </p>-->
  <!--            &lt;!&ndash; <p class="dashboard-workplace-header-tip-desc">-->
  <!--                            <Icon type="md-rainy" /> 今日阴转小雨，22℃ - 32℃，出门记得带伞哦。-->
  <!--                        </p> &ndash;&gt;-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div slot="extra" class="dashboard-workplace-header-extra">-->
  <!--          <Row type="flex" justify="center" align="middle" :gutter="12">-->
  <!--            <Col span="8">-->
  <!--              <p>-->
  <!--                <Avatar-->
  <!--                  icon="md-apps"-->
  <!--                  size="small"-->
  <!--                  v-color="'#40a9ff'"-->
  <!--                  v-bg-color="'#e6f7ff'"-->
  <!--                />-->
  <!--                <span>应用数</span>-->
  <!--              </p>-->
  <!--              <p>{{ appNumber }}</p>-->
  <!--            </Col>-->
  <!--            <Col span="8">-->
  <!--              <p>-->
  <!--                <Avatar-->
  <!--                  icon="md-checkbox-outline"-->
  <!--                  size="small"-->
  <!--                  v-color="'#ffa940'"-->
  <!--                  v-bg-color="'#fff7e6'"-->
  <!--                />-->
  <!--                <span>待办项</span>-->
  <!--              </p>-->
  <!--              <p>-->
  <!--                {{ workToDoNumber }}-->
  <!--                &lt;!&ndash; <Tooltip placement="top" content="待办：3 / 总计：24">-->
  <!--                                    3 / 24-->
  <!--                                </Tooltip> &ndash;&gt;-->
  <!--              </p>-->
  <!--            </Col>-->
  <!--            <Col span="8">-->
  <!--              <p>-->
  <!--                <Avatar-->
  <!--                  icon="logo-usd"-->
  <!--                  size="small"-->
  <!--                  v-color="'#73d13d'"-->
  <!--                  v-bg-color="'#f6ffed'"-->
  <!--                />-->
  <!--                <span>积分</span>-->
  <!--              </p>-->
  <!--              <p>-->
  <!--                <Numeral :value="1689" format="'0,'" />-->
  <!--              </p>-->
  <!--            </Col>-->
  <!--          </Row>-->
  <!--        </div>-->
  <!--      </PageHeader>-->
  <!--    </div>-->
  <!--    <Row :gutter="24" class="ivu-mt">-->
  <!--      <Col :xl="16" :lg="24" :md="24" :sm="24" :xs="24" class="ivu-mb">-->
  <!--        <Card :bordered="false" dis-hover :padding="6" class="ivu-mb">-->
  <!--          <div slot="title">-->
  <!--            <Avatar-->
  <!--              icon="md-apps"-->
  <!--              size="small"-->
  <!--              v-color="'#1890ff'"-->
  <!--              v-bg-color="'#e6f7ff'"-->
  <!--            />-->
  <!--            <span class="ivu-pl-8">我的项目</span>-->
  <!--          </div>-->
  <!--          <div slot="extra">-->
  <!--            <a href="/">全部项目</a>-->
  <!--          </div>-->
  <!--          <my-apps v-model="appMenus" />-->
  <!--        </Card>-->
  <!--        &lt;!&ndash; <Card :bordered="false" dis-hover>-->
  <!--                    <div slot="title">-->
  <!--                        <Avatar icon="md-bulb" size="small" v-color="'#722ed1'" v-bg-color="'#f9f0ff'" />-->
  <!--                        <span class="ivu-pl-8">动态</span>-->
  <!--                    </div>-->
  <!--                    <feeds />-->
  <!--                </Card> &ndash;&gt;-->
  <!--      </Col>-->
  <!--      <Col :xl="8" :lg="24" :md="24" :sm="24" :xs="24" class="ivu-mb">-->
  <!--        <Card :bordered="false" dis-hover class="ivu-mb">-->
  <!--          <div slot="title">-->
  <!--            <Avatar-->
  <!--              icon="md-heart"-->
  <!--              size="small"-->
  <!--              v-color="'#ff4d4f'"-->
  <!--              v-bg-color="'#fff1f0'"-->
  <!--            />-->
  <!--            <span class="ivu-pl-8">快捷操作</span>-->
  <!--          </div>-->
  <!--          <div slot="extra">-->
  <!--            <Tooltip placement="top" content="配置">-->
  <!--              <Icon type="md-settings" />-->
  <!--            </Tooltip>-->
  <!--          </div>-->
  <!--          <shortcut v-model="shortcutList" />-->
  <!--        </Card>-->
  <!--        <Card :bordered="false" dis-hover :padding="0" class="ivu-mb">-->
  <!--          <div slot="title">-->
  <!--            <Avatar-->
  <!--              icon="md-checkbox-outline"-->
  <!--              size="small"-->
  <!--              v-color="'#faad14'"-->
  <!--              v-bg-color="'#fffbe6'"-->
  <!--            />-->
  <!--            <span class="ivu-pl-8">待办事项Top10</span>-->
  <!--          </div>-->
  <!--          <todo v-model="workToDoList" />-->
  <!--        </Card>-->
  <!--        &lt;!&ndash; <Card :bordered="false" dis-hover class="ivu-mb">-->
  <!--                    <div slot="title">-->
  <!--                        <Avatar icon="ios-people" size="small" v-color="'#52c41a'" v-bg-color="'#f6ffed'" />-->
  <!--                        <span class="ivu-pl-8">小组成员</span>-->
  <!--                    </div>-->
  <!--                    <member />-->
  <!--                </Card> &ndash;&gt;-->
  <!--      </Col>-->
  <!--    </Row>-->
  <!--  </div>-->
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import myApps from './my-apps'
import shortcut from './shortcut'
import todo from './todo'
import axios from 'axios'

export default {
  name: 'dashboard-workplace',
  components: { myApps, shortcut, todo },
  data() {
    return {
      appMenus: [],
      appNumber: 0,
      workToDoNumber: 0,
      workToDoList: [],
      shortcutList: []
    }
  },
  computed: {
    ...mapState('admin/user', ['info']),
    ...mapGetters('admin/menu', ['filterSider'])
  },
  mounted() {
    this.filterSider.forEach((menu) => {
      if (this.shortcutList.length < 6) {
        this.shortcutList.push(menu)
      }
    })
    this.listBaseMenuT()
    this.listTopTodo()
  },
  methods: {
    listBaseMenuT() {
      // listBaseMenu({ groupEname: 'LightGroup' }).then((res) => {
      //   res.forEach((element) => {
      //     element.children.forEach((item) => {
      //       this.appMenus.push(item)
      //     })
      //   })
      //   this.appNumber = this.appMenus.length
      // })
    },
    listTopTodo() {}
    // testDemo() {
    //   // eslint-disable-next-line no-undef
    //   demo().then((res) => {
    //     alert(res)
    //     return res
    //   })
    // }
  }
}
</script>
<style lang="less">
.dashboard-workplace {
  &-header {
    &-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin-right: 16px;
    }
    &-tip {
      display: inline-block;
      vertical-align: middle;
      &-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 12px;
      }
      &-desc {
        color: #808695;
      }
    }
    &-extra {
      .ivu-col {
        p {
          text-align: right;
        }
        p:first-child {
          span:first-child {
            margin-right: 4px;
          }
          span:last-child {
            color: #808695;
          }
        }
        p:last-child {
          font-size: 22px;
        }
      }
    }
  }
}
</style>
