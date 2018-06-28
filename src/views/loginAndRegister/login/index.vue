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
    <el-button class="login-btn" :loading="loading" @click="handleLogin">立即登录</el-button>

    <!--TODO 讨论忘记密码之后的处理，比如直接发送一个链接并重置密码？感觉比较简单不需要再做界面emm-->
    <a>
      <p class="forget-pwd-btn">忘记密码</p>
    </a>
  </el-form>
</template>

<script>
  import { isValidUsername, isValidateEmail } from '@/utils/validate'
  import { login } from '../../../api/login'
  import { Message } from 'element-ui'

  export default {
    name: 'MyLogin',
    data: function () {
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
    mounted: function () {
      this.$emit('login')
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true

            new Promise((resolve, reject) => {
              login(this.loginForm.email, this.loginForm.password).then(response => {
                if (response.state === 'OK') {
                  const token = JSON.parse(response.object)

                  // 登录成功，保存到 vuex 中
                  this.$store.dispatch('Login', {
                    token: token
                  }).then(() => {
                    this.loading = false
                    this.$router.push('/home')
                  }).catch(() => {
                    this.loading = false
                  })
                } else {
                  var errorMsg = '未知错误，请联系管理员！'
                  if (response.state === 'USER_NOT_EXIST') {
                    errorMsg = '此会员名还未被注册，请先注册哦～'
                  } else if (response.state === 'USER_PWD_WRONG') {
                    errorMsg = '密码错误，请检查后重试！'
                    // TODO 未激活是否可以登录
                  } else if (response.state === 'MEMBER_INACTIVE') {
                    errorMsg = '此用户还未被激活哦～'
                  }
                  Message({
                    message: errorMsg,
                    type: 'error',
                    duration: 3 * 1000,
                    center: true,
                    showClose: true
                  })

                  this.loading = false
                }
                resolve()
              }).catch(error => {
                this.loading = false
                reject(error)
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
