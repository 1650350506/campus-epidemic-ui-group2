<template>
  <GlobalFooter class="i-copyright" :links="links" :copyright="copyright" />
</template>
<script>
export default {
  name: 'i-copyright',
  data() {
    return {
      links: [
        {
          title: '',
          key: '官网',
          href: 'http://www.hztianque.com/home',
          blankTarget: true
        }
        /*  {
                        title: '社区',
                        key: '社区',
                        href: 'https://dev.iviewui.com',
                        blankTarget: true
                    },
                    {
                        title: '专业版',
                        key: '专业版',
                        href: 'https://pro.iviewui.com',
                        blankTarget: true
                    } */
      ],
      copyright: '张枨涯 © 2023 嘉兴南湖学院'
    }
  }
}
</script>
<style lang="less">
    .i-copyright{
        flex: 0 0 auto;
        &-hidden{
           display: none;
        }
    }
</style>
