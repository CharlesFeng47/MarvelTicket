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
          <div class="portrait">
            <img :src="portrait"/>
          </div>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="/center/manage/order">订单管理</el-dropdown-item>
          <el-dropdown-item command="/center/manage/like">我的收藏</el-dropdown-item>
          <el-dropdown-item command="/center/manage/message">我的信息</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getToken } from '@/utils/auth' // 验权
  import { getInfo } from '@/api/login'
  export default {
    name: 'login-panel',
    data: function() {
      return {
        hasLogin:false,
        portrait: ''
      }
    },
    computed: {
      ...mapGetters([
        'token',
        'message',
      ])
    },
    mounted:function () {
      console.log(getToken())
      if(getToken()){
        this.hasLogin = true
        this.initMemberMessage()
      }else{
        this.hasLogin =false
      }
    },
    watch:{
      message: {
        handler: function (newVal, oldVal) {
          //todo FJJ 看一下，修改头像之后 在center/message/sureModifyPortrait，明明SetMessage了， 但是这里没有监听到
          console.log("message has changed")
          console.log(newVal)
          // this.portrait =
        }
      }
    },
    methods: {
      handleCommand(command) {
        this.$router.push(command);
      },
      initMemberMessage(){
        new Promise((resolve, reject) => {
          getInfo(this.token).then(response => {
            if (response.state === 'OK') {
              const data = JSON.parse(response.object)
              //将用户信息保存
              // console.log(data)
              this.$store.dispatch('SetMessage', {
                message: data
              }).then(() => {
                this.portrait = this.message.portrait
              }).catch(() => {
              })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        });
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
    margin: 12px auto 0px;
    height: 60px;
    width: 60px;
    /*margin-top: 20px;*/
    img{
      width: 100%;
      height: 100%;
      border-radius: 4px
    }
  }
</style>

