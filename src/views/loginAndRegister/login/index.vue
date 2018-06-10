<template>
  <form id="login" method="post">
    <input v-model="user.email" name="email" type="text" class="dz-ipu dz-ipu-sj" placeholder="请输入电子邮箱">
    <input v-model="user.password" name="password" type="password" class="dz-ipu dz-ipu-mima" placeholder="请输入密码">
    <input type="submit" class="dz-denglu dz-denglu1" value="立即登录">
    <!-- todo click -->
    <a>
      <!-- todo click -->
      <p class="r DengLu">忘记密码</p>
    </a>
  </form>
</template>

<script>
  export default {
    name: 'MyLogin',
    data: function() {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    mounted: function() {
      this.$emit('login')
    }
  }
</script>

<style scoped>
  @import "../common.css";

  .DengLu {
    color: #ff6633;
    cursor: pointer;
    font-size: 13px;
    margin-top: 13px;
  }

  .r {
    float: right !important;
  }
</style>
