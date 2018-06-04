<template>
  <!--TODO 整体颜色根据用户不同而修改 -->
  <div>
  <Top></Top>

  </div>
</template>

<script>
  import Top from '../header/index'
  export default {
    name: 'home',
    components: { Top },
    data() {
      return {
        userType: 'member'
      }
    },
    methods: {}
  }
</script>


<style scoped>

</style>
