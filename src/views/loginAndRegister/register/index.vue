<template>
  <el-form>
    <el-form-item class="login-register-input">
      <el-input v-model="user.username" type="text" placeholder="请输入用户名"/>
    </el-form-item>
    <el-form-item class="login-register-input">
      <el-input v-model="user.email" type="text" placeholder="请输入邮箱"/>
    </el-form-item>
    <el-form-item class="login-register-input">
      <el-input v-model="user.password" type="password" placeholder="请输入密码"/>
    </el-form-item>
    <el-form-item class="login-register-input">
      <el-input name="password" type="password" placeholder="请确认密码"/>
    </el-form-item>
    <el-button class="login-btn" :loading="loading" @click="handleSignUp">注册</el-button>
  </el-form>
</template>

<script>
  import qs from 'qs'

  export default {
    name: 'MyRegister',
    data: function() {
      return {
        user: {
          username: '',
          email: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      handleSignUp() {
        this.loading = true
        // todo 写到api里去，调用action，而不是直接调用
        this.$axios({
          url: 'http://localhost:3000/TicketsManagementSystem/user/user_sign_up',
          method: 'post',
          data: qs.stringify({
            username: this.user.username,
            email: this.user.email,
            password: this.user.password
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(() => {
          this.loading = false
          console.log('注册成功')
          // todo 注册成功之后提示验证登录链接
          // this.$router.push({ path: '/' })
        }).catch(() => {
          console.log('注册失败')
          // todo 注册失败时候的提示信息
          this.loading = false
        })
      }
    },
    mounted: function() {
      this.$emit('register')
    }
  }
</script>

<style scoped>
  @import "../common.css";
</style>
