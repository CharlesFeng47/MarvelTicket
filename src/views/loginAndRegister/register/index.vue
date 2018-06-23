<template>
  <el-form autoComplete="on" :model="registerForm" :rules="registerRules" ref="registerForm">
    <el-form-item prop="email" class="login-register-input">
      <el-input name="email" v-model="registerForm.email" autoComplete="on" type="text" placeholder="请输入电子邮箱"/>
    </el-form-item>
    <el-form-item  prop="username" class="login-register-input">
      <el-input name="username" v-model="registerForm.username" type="text" placeholder="请输入用户名"/>
    </el-form-item>
    <el-form-item prop="password" class="login-register-input">
      <el-input name="password" v-model="registerForm.password" autoComplete="on" type="password" placeholder="请输入密码"/>
    </el-form-item>
    <el-form-item  prop="checkPass" class="login-register-input">
      <el-input name="checkPass"  v-model="registerForm.checkPass" type="password" placeholder="请确认密码"/>
    </el-form-item>
    <el-button class="login-btn" :loading="loading" @click="handleSignUp">注册</el-button>
  </el-form>
</template>

<script>
  import qs from 'qs'
  import { isValidUsername, isValidateEmail } from '@/utils/validate'

  export default {
    name: 'MyRegister',
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
      const validatePass2 = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          password: '',
          email: '',
          checkPass:"",
          userType: 'member'
        },
        registerRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          email: [{ required: true, trigger: 'blur', validator: validateEmail }],
          checkPass: [{required: true, validator: validatePass2, trigger: 'blur' }]
        },
        loading: false,
        pwdType: 'password'
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
      handleSignUp() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('MemberSignUp', this.registerForm).then(() => {
              this.loading = false
              this.$router.push( '/loginAndRegister/login')
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
      // handleSignUp() {
      //   this.loading = true
      //   // todo 写到api里去，调用action，而不是直接调用
      //   this.$axios({
      //     url: 'http://localhost:3000/TicketsManagementSystem/user/user_sign_up',
      //     method: 'post',
      //     data: qs.stringify({
      //       username: this.user.username,
      //       email: this.user.email,
      //       password: this.user.password
      //     }),
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //     }
      //   }).then(() => {
      //     this.loading = false
      //     console.log('注册成功')
      //     // todo 注册成功之后提示验证登录链接
      //     // this.$router.push({ path: '/' })
      //   }).catch(() => {
      //     console.log('注册失败')
      //     // todo 注册失败时候的提示信息
      //     this.loading = false
      //   })
      // }
    },
    mounted: function() {
      this.$emit('register')
    }
  }
</script>

<style scoped>
  @import "../common.css";
</style>
