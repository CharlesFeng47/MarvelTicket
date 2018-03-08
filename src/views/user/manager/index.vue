<template>
  <div>
    <h1>我是一个管理员</h1>
  </div>
</template>

<script>
  export default {
    name: 'ManagerInfo',
    methods: {
      // 【提供给父组件中button调用】修改用户数据，跳转页面
      goToModify() {
        this.$router.push('/user_info/modify_manager')
      }
    }
  }
</script>

<style scoped>

</style>
