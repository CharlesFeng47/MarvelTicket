<template>
  <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
    <el-form-item prop="email" class="login-register-input">
      <el-input name="email" v-model="registerForm.email" type="text" placeholder="请输入电子邮箱"/>
    </el-form-item>
    <el-form-item prop="username" class="login-register-input">
      <el-input name="username" v-model="registerForm.username" type="text" placeholder="请输入用户名"/>
    </el-form-item>
    <el-form-item prop="password" class="login-register-input">
      <el-input name="password" v-model="registerForm.password" type="password" placeholder="请输入密码"/>
    </el-form-item>
    <el-form-item prop="checkPwd" class="login-register-input">
      <el-input name="checkPwd" v-model="registerForm.checkPwd" type="password" placeholder="请确认密码"/>
    </el-form-item>
    <el-button class="login-btn" :loading="loading" @click="handleSignUp">注册</el-button>
  </el-form>
</template>

<script>
  import { isValidUsername, isValidateEmail } from '@/utils/validate'
  import { signUp } from '../../../api/login'
  import { Message } from 'element-ui'

  export default {
    name: 'MyRegister',
    data: function () {
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
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          email: '',
          username: '',
          password: '',
          checkPwd: ""
        },
        registerRules: {
          email: [{ required: true, trigger: 'blur', validator: validateEmail }],
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          checkPwd: [{ required: true, trigger: 'blur', validator: validatePass2 }]
        },

        loading: false
      }
    },
    mounted: function () {
      this.$emit('register')
    },
    methods: {
      handleSignUp() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.loading = true

            new Promise((resolve, reject) => {
              signUp(this.registerForm.email, this.registerForm.username, this.registerForm.password).then(response => {
                if (response.state === 'OK') {
                  const token = JSON.parse(response.object)

                  // TODO 未激活是否可以登录
                  // 注册成功，自动登录，将信息保存到 vuex 中
                  this.$store.dispatch('Login', {
                    token: token
                  }).then(() => {
                    this.loading = false
                    this.$router.push('/home')
                  }).catch(() => {
                    this.loading = false
                  })
                } else{
                  var errorMsg = '未知错误，请联系管理员！'
                  if (response.state === 'USER_HAS_BEEN_SIGN_UP') {
                    errorMsg = '此会员名已被注册'
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
</style>
