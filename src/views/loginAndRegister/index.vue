<template>
  <div class="Bg">
    <div class="Bg-w w">
      <div class="tanchuang-dz">
        <el-row class="link-tab">
          <el-col :span="12" class="login-link link" :class="{'link-on': loginOn}">
            <router-link to="login">登录</router-link>
          </el-col>
          <el-col :span="12" class="register-link link" :class="{'link-on': registerOn}">
            <router-link to="register">注册</router-link>
          </el-col>
        </el-row>
        <router-view @login="handleLogin" @register="handleRegister"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginAndRegister',
    data: function() {
      return {
        loginOn: true,
        registerOn: false
      }
    },
    methods: {
      handleLogin() {
        this.loginOn = true
        this.registerOn = false
      },
      handleRegister() {
        this.loginOn = false
        this.registerOn = true
      }
    }
  }
</script>

<style scoped>
  .Bg {
    width: 100%;
    height: 599px;
    background-color: #0c1130;
  }

  .Bg-w {
    height: 599px;
    background: url(../../../src/assets/background.jpg) no-repeat;
    background-size: 100% 599px;
    position: relative;
  }

  .w {
    margin: 0 auto;
    position: relative;
    width: 1200px !important;
  }

  .tanchuang-dz {
    background-color: #ffffff;
    border-radius: 3px;
    right: 55px;
    top: 115px;
    min-height: 254px;
    padding: 21px;
    position: absolute;
    width: 408px;
    z-index: 1020;
  }

  .link-tab {
    margin-bottom: 22px;
  }

  .link {
    text-align: center;
    color: #7f8c8d;
    font-size: 17px;
    font-weight: 800;
    cursor: pointer;
    font-family: "Microsoft YaHei", 微软雅黑, STHeiti, MingLiu, STHeiti, MingLiu, serif;
    outline: medium none;
    text-decoration: none;
  }

  .login-link {
    border-right: 1px solid #e0e7eb;
  }

  .link-on {
    color: #ff6633 !important;
  }
</style>
