<template>
  <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
    <el-form-item prop="email" class="login-register-input">
      <el-input name="email" v-model="loginForm.email" type="text" placeholder="请输入电子邮箱"/>
    </el-form-item>
    <el-form-item prop="password" class="login-register-input">

      <el-input name="password" type="password" v-model="loginForm.password" placeholder="请输入密码"/>

      <!--TODO gy 可查看密码-->
      <!--<el-input name="password" :type="pwdType" v-model="loginForm.password" placeholder="请输入密码"/>-->
      <!--<span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>-->

    </el-form-item>
    <el-button type="danger" class="login-btn" :loading="loading" @click="handleLogin">立即登录</el-button>

    <!--TODO 讨论忘记密码之后的处理，比如直接发送一个链接并重置密码？感觉比较简单不需要再做界面emm-->
    <a>
      <!--<p class="forget-pwd-btn">忘记密码</p>-->
    </a>
  </el-form>
</template>

<script>
  import { isValidateEmail } from '@/utils/validate'
  import { login } from '../../../api/login'

  export default {
    name: 'MyLogin',
    data: function() {
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
          email: '',
          password: '',
          userType: 'member'
        },
        loginRules: {
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          email: [{ required: true, trigger: 'blur', validator: validateEmail }]
        },

        loading: false
      }
    },
    mounted: function() {
      this.$emit('login')
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true

            new Promise((resolve, reject) => {
              login(this.loginForm.email, this.loginForm.password).then(responseToken => {
                // 登录成功，保存到 vuex 中
                this.$store.dispatch('Login', {
                  token: responseToken
                }).then(() => {
                  console.log('bbb')
                  this.loading = false
                  this.$router.push('/home')
                }).catch(() => {
                  this.loading = false
                })
                resolve()
              }).catch(error => {
                this.loading = false
              })
            }).then()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../common.css";

  .forget-pwd-btn {
    color: #F78989;
    cursor: pointer;
    font-size: 13px;
    margin-top: 13px;
    float: right !important;
  }

</style>
