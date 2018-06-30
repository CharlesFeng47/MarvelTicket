<template>
  <div>
    <div v-if="hasLogin">
      <el-dropdown @command="handleCommand">
        <a href="/center/manage/message">
          <div class="portrait" style="float: left">
            <img :src="this.portrait"/>
          </div>
          <div class="name" style="float: left">
            {{ this.name }}
          </div>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="order">订单管理</el-dropdown-item>
          <el-dropdown-item command="like">我的收藏</el-dropdown-item>
          <el-dropdown-item command="message">我的信息</el-dropdown-item>
          <el-dropdown-item command="logout">注销会员</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-else style="margin-top: 28px">
      <a href="/loginAndRegister/login">
      <span class="svg-container">
        <svg-icon icon-class="user"/>
        <el-button type="text">登录/注册</el-button>
      </span>
      </a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { logout } from '../../../api/login'

  export default {
    name: 'login-panel',
    computed: {
      ...mapGetters([
        'token',
        'name',
        'portrait'
      ]),
      hasLogin: function() {
        console.log('token: ' + this.token)
        return this.token !== undefined && this.token !== ''
      }
    },
    methods: {
      handleCommand(command) {
        if (command === 'logout') {
          this.memberLogOut()
        } else {
          this.$router.push('/center/manage/' + command)
        }
      },

      // 会员登出
      memberLogOut() {
        new Promise((resolve, reject) => {
          logout(this.token).then(() => {
            resolve()
          }).catch(error => {
          })
        }).then(() => {
          this.$store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>

  .svg-container {
    color: #777777;
    vertical-align: middle;
    display: inline-block;
    font-size: 22px;
    font-weight: bold;
  }
  .portrait{
    margin: 12px -10px 0px;
    height: 60px;
    width: 60px;
    /*margin-top: 20px;*/
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%
    }
  }
  .name{
    margin-top: 34px;
    margin-left: 10px;
    /*line-height: 80px;*/
    /*height: 80px;*/
    font-size: 18px;
  }
</style>

