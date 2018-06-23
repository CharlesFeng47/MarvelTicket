<template>
  <div>
    <div v-if="!hasLogin" style="margin-top: 28px">
      <span class="svg-container"  @click="login">
        <svg-icon icon-class="user"/>
        <el-button type="text">登录/注册</el-button>
      </span>
    </div>
    <div v-else>
      <a href="/center/manage/order">
        <div class="portrait">
          <img :src="portrait"/>
        </div>
      </a>
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
        portrait :''
      }
    },
    computed: {
      ...mapGetters([
        'token',
        'getToken'
      ])
    },
    mounted:function () {
      if(getToken()){
        this.hasLogin = true
        this.initMemberMessage()
      }
    },
    watch:{
      getToken: {
        handler: function (newVal, oldVal) {
          if(this.token == ''){
            this.hasLogin=false
          }else{
            this.hasLogin=true
            // this.initMemberMessage()
          }
        }
      },
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      login(){
        this.$router.push("loginAndRegister/login");
      },
      initMemberMessage(){
        new Promise((resolve, reject) => {
          getInfo(this.token).then(response => {
            if (response.state === 'OK') {
              const data = JSON.parse(response.object)
              this.portrait = data.portrait
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
    }
  }
</style>

