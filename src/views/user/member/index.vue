<template>
  <div>
    <h1>我是一个用户</h1>
  </div>
</template>

<script>
  export default {
    name: 'MemberInfo',
    methods: {
      // 【提供给父组件中button调用】修改用户数据，跳转页面
      goToModify() {
        this.$router.push('/user_info/modify_member')
      }
    }
  }
</script>

<style scoped>

</style>
