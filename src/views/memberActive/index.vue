<template>
  <div>
    <el-row>
      <el-col :offset="8" :span="8" style="margin-top: 150px">
        <h1 v-show="activating">正在验证中...</h1>
        <h1 v-show="!activating&&!hasError">验证成功！</h1>
        <h1 v-show="!activating&&hasError">{{ errorMsg }}</h1>
        <el-button v-show="!activating" @click="gotoLogin" type="primary" round>去登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { memberActivate } from '../../api/user'

  export default {
    data() {
      return {
        activating: true,

        hasError: false,
        errorMsg: ''
      }
    },
    mounted: function() {
      this.activating = true
      new Promise((resolve, reject) => {
        // TODO 解析方式需要修改
        memberActivate(this.$route.params.activeUrl).then(response => {
          if (response.state === 'OK') {
            this.hasError = false
          } else {
            this.hasError = true
            if (response.state === 'MEMBER_ACTIVATE_URL_EXPIRE') {
              this.errorMsg = '此链接已失效！'
            } else if (response.state === 'MEMBER_ACTIVATE_URL_WRONG') {
              this.errorMsg = '链接错误！'
            }
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
        this.activating = false
      }).catch(() => {
      })
    },
    methods: {
      gotoLogin() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>

</style>
