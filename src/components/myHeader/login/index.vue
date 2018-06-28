<template>
  <div>
    <div v-if="!hasLogin" style="margin-top: 28px">
      <a href="/loginAndRegister/login">
      <span class="svg-container">
        <svg-icon icon-class="user"/>
        <el-button type="text">登录/注册</el-button>
      </span>
      </a>
    </div>
    <div v-else>
      <el-dropdown @command="handleCommand">
        <a href="/center/manage/order">
          <div class="portrait" style="float: left">
            <img :src="portrait"/>
          </div>
          <div class="name" style="float: left">
            {{ name }}
          </div>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="order">订单管理</el-dropdown-item>
          <el-dropdown-item command="like">我的收藏</el-dropdown-item>
          <el-dropdown-item command="message">我的信息</el-dropdown-item>
          <el-dropdown-item command="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getToken } from '@/utils/auth' // 验权
  import { getInfo, logout } from '../../../api/login'

  export default {
    name: 'login-panel',
    data: function() {
      return {
        hasLogin: false,
        portrait: '',
        name: ''
      }
    },
    computed: {
      ...mapGetters([
        'token',
        'message'
      ])
    },
    mounted: function() {
      // TODO 不是这个方法
      console.log(getToken())
      if (getToken()) {
        this.hasLogin = true
        this.initMemberMessage()
      } else {
        this.hasLogin = false
      }
    },
    watch: {
      message: {
        handler: function(newVal, oldVal) {
          // todo FJJ 看一下，修改头像之后 在center/message/sureModifyPortrait，明明SetMessage了， 但是这里没有监听到
        }
      },
      token: {
        handler: function(newVal, oldVal) {
          console.log('init' + this.token)
          this.initMemberMessage()
        }
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
          logout(this.token).then(response => {
            if (response.state === 'OK') {
              resolve()
            } else {
              reject()
            }
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
            this.$store.dispatch('LogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }
        )
      },

      // 初始化会员信息
      initMemberMessage() {
        new Promise((resolve, reject) => {
          getInfo(this.token).then(response => {
            if (response.state === 'OK') {
              const data = JSON.parse(response.object)
              // 将用户信息保存
              console.log(data)
              this.$store.dispatch('SetMessage', {
                message: data
              }).then(() => {
                if (this.message == null) {
                  this.hasLogin = false
                } else {
                  this.hasLogin = true
                  this.portrait = this.message.portrait
                  this.name = this.message.name
                }
              }).catch(() => {
              })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        }).then()
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

