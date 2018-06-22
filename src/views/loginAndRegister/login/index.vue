<template>
  <el-form>
    <el-form-item class="login-register-input">
      <el-input v-model="user.email" type="text" placeholder="请输入电子邮箱"/>
    </el-form-item>
    <el-form-item class="login-register-input">
      <el-input v-model="user.password" type="password" placeholder="请输入密码"/>
    </el-form-item>
    <el-button class="login-btn" :loading="loading" @click="handleLogin">立即登录</el-button>
    <!-- todo click -->
    <a>
      <!-- todo click -->
      <p class="forget-pwd-btn">忘记密码</p>
    </a>
  </el-form>
</template>

<script>
  import qs from 'qs'

  export default {
    name: 'MyLogin',
    data: function() {
      return {
        user: {
          email: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      handleLogin() {
        this.loading = true
        // todo 写到api里去，调用action，而不是直接调用
        this.$axios({
          url: 'http://localhost:3000/TicketsManagementSystem/user/user_login',
          method: 'post',
          data: qs.stringify({
            email: this.user.email,
            password: this.user.password
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(() => {
          this.loading = false
          console.log('登录成功')
          // todo 登录成功之后跳转
          this.$router.go(-1);
        }).catch(() => {
          console.log('登录失败')
          // todo 登录失败时候的提示信息
          this.loading = false
        })
      }
    },
    mounted: function() {
      this.$emit('login')
    }
  }
</script>

<style scoped>
  @import "../common.css";

  .forget-pwd-btn {
    color: #ff6633;
    cursor: pointer;
    font-size: 13px;
    margin-top: 13px;
    float: right !important;
  }

</style>
