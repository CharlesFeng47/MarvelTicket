<template>
  <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
    <el-form-item prop="email" class="login-register-input">
      <el-input name="email" v-model="loginForm.email" autoComplete="on" type="text" placeholder="请输入电子邮箱"/>
    </el-form-item>
    <el-form-item prop="password" class="login-register-input">
      <el-input name="password" v-model="loginForm.password" autoComplete="on" type="password" placeholder="请输入密码"/>
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
  import { isValidUsername, isValidateEmail } from '@/utils/validate'

  export default {
    name: 'MyLogin',
    data: function() {
      const validateUsername = (rule, value, callback) => {
        if (!isValidUsername(value)) {
          callback(new Error('请输入正确的会员名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于 6 位'))
        } else {
          callback()
        }
      }
      const validateEmail = (rule, value, callback) => {
        if (!isValidateEmail(value)) {
          callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          password: '',
          email: '',
          userType: 'member'
        },
        loginRules: {
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          email: [{ required: true, trigger: 'blur', validator: validateEmail }]
        },
        loading: false,
        pwdType: 'password',
        wantToLogin: true
      }
      // return {
      //   user: {
      //     email: '',
      //     password: ''
      //   },
      //   loading: false
      // }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              // alert("登录成功");
              // this.$router.go(-1)
              this.$router.push('/home')
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
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
