<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'index',
  props: [
    'dialogVisible', 'list', 'isEdit'
  ],
  data() {
    return {
      show: this.dialogVisible
    }
  }
}
</script>

<style scoped>

</style>
