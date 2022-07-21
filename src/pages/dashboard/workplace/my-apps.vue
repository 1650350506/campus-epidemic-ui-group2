<!--<template>-->
<!--  <Grid :col="3" class="dashboard-workplace-apps" :border="false" padding="6px" hover>-->
<!--    <GridItem v-for="(item, index) in data" :key="index">-->
<!--      <i-link :to='item.normalUrl' :target='item.jumpType==="open" ? "_blank" : "_self" '>-->
<!--        <div class="dashboard-workplace-apps-item" :style="'background-image:url(' + item.cover + ')'">-->
<!--          <div class="dashboard-workplace-apps-item-main">-->
<!--            <div class="dashboard-workplace-apps-name">{{ item.name }}</div>-->
<!--            <div class="dashboard-workplace-apps-desc">{{ item.desc }}</div>-->
<!--            &lt;!&ndash; <div class="dashboard-workplace-apps-extra">-->
<!--                        <Tooltip placement="top" content="设置">-->
<!--                            <Icon type="md-settings" />-->
<!--                        </Tooltip>-->
<!--                        <Tooltip placement="top" content="取消星标" v-if="item.collect">-->
<!--                            <Icon type="md-star" class="dashboard-workplace-apps-extra-star" @click="handleUnCollect(index)" />-->
<!--                        </Tooltip>-->
<!--                        <Tooltip placement="top" content="星标" v-if="!item.collect">-->
<!--                            <Icon type="md-star" @click="handleCollect(index)" />-->
<!--                        </Tooltip>-->
<!--                    </div> &ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->
<!--      </i-link>-->
<!--    </GridItem>-->
<!--  </Grid>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--  props: {-->
<!--    value: {-->
<!--      type: Array,-->
<!--      default: () => []-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      data: []-->
<!--    }-->
<!--  },-->
<!--  watch: {-->
<!--    value(newVal) {-->
<!--      newVal.forEach((item, index) => {-->
<!--        this.data.push({-->
<!--          name: item.appName,-->
<!--          desc: item.appKey,-->
<!--          cover: require(`@/assets/app-images/app${index % 4 + 1}.jpeg`),-->
<!--          normalUrl: item.indexUrl,-->
<!--          jumpType: item.jumpType-->
<!--        })-->
<!--      })-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    handleCollect(index) {-->
<!--      this.data[index].collect = 1-->
<!--    },-->
<!--    handleUnCollect(index) {-->
<!--      this.data[index].collect = 0-->
<!--    },-->
<!--    handJump(jumpType) {-->
<!--      return jumpType === 'open' ? '_blank' : ''-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style lang="less">-->
<!--    .dashboard-workplace-apps{-->
<!--        &-item{-->
<!--            height: 100px;-->
<!--            background-repeat: no-repeat;-->
<!--            background-size: cover;-->
<!--            background-position: center;-->
<!--            cursor: pointer;-->
<!--            border-radius: 3px;-->
<!--            text-shadow: 0 1px 1px rgba(0,0,0,.1);-->
<!--            position: relative;-->
<!--            &:after{-->
<!--                content: '';-->
<!--                display: block;-->
<!--                position: absolute;-->
<!--                border-radius: 3px;-->
<!--                top: 0;-->
<!--                bottom: 0;-->
<!--                left: 0;-->
<!--                right: 0;-->
<!--                background-color: rgba(0,0,0,.1);-->
<!--                z-index: 0;-->
<!--            }-->
<!--            &-main{-->
<!--                position: relative;-->
<!--                z-index: 1;-->
<!--            }-->
<!--        }-->
<!--        &-name, &-desc{-->
<!--            color: #fff;-->
<!--            font-weight: bold;-->
<!--            padding: 4px 0 0 8px;-->
<!--            font-size: 16px;-->
<!--            margin-right: 45px;-->
<!--        }-->
<!--        &-desc{-->
<!--            font-weight: normal;-->
<!--            font-size: 12px;-->
<!--        }-->
<!--        &-extra{-->
<!--            position: absolute;-->
<!--            top: 6px;-->
<!--            right: 6px;-->
<!--            color: #f8f8f9;-->
<!--            i{-->
<!--                margin-left: 4px;-->
<!--                font-size: 16px;-->
<!--            }-->
<!--            i.dashboard-workplace-apps-extra-star{-->
<!--                color: #ff9900;-->
<!--            }-->
<!--            i:not(.dashboard-workplace-apps-extra-star){-->
<!--                display: none;-->
<!--            }-->
<!--        }-->
<!--        &-item:hover &-extra i{-->
<!--            display: inline-block;-->
<!--        }-->
<!--    }-->
<!--</style>-->
