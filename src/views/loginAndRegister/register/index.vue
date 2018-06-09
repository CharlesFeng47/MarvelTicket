<template>
  <form id="register" method="post">
    <div class="dz-input input-zhuce">
      <input name="mobile" type="text" class="dz-ipu dz-ipu-sj1" maxlength="11" placeholder="请输入手机号" value="">
      <input name="password" type="password" class="dz-ipu dz-ipu-mima1" placeholder="请输入密码">
      <input name="password" type="password" class="dz-ipu dz-ipu-mima1" placeholder="请确认密码">
      <input type="submit" class="dz-denglu dz-denglu2" value="注册并登录">
    </div>
  </form>
</template>

<script>
  export default {
    name: 'MyRegister',
    mounted: function() {
      this.$emit('register')
    }
  }
</script>

<style scoped>
  @import "../common.css";
</style>
