<template>
        <iframe  ref='bdIframe' :src='source' frameborder='0' width="100%" />
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'innerPage',
        computed: {
            ...mapGetters('admin/menu', [
                'filterSider'
            ]),
            source () {
                let url = ''
                const menusId = this.$route.params.menuId
                if (menusId) {
                    this.filterSider.forEach(m => {
                        if (m.children) {
                            m.children.forEach(p => {
                                if (menusId === p.id) {
                                    url = p.normalUrl
                                }
                            })
                        }
                    })
                }
                return url
            }
        },
        mounted () {
            const deviceHeight = document.documentElement.clientHeight;
            this.$refs.bdIframe.style.height = (Number(deviceHeight) - 260) + 'px'; // 数字是页面布局高度差
        }

    }
</script>
