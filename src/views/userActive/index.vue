<template>
  <div>
    <el-row>
      <el-col :offset="8" :span="8" style="margin-top: 150px">
        <h1 v-show="activating">正在验证中...</h1>
        <h1 v-show="!activating&&!hasError">验证成功！</h1>
        <h1 v-show="!activating&&hasError">{{ errorMsg }}</h1>
        <el-button v-show="!activating&&!hasError" @click="gotoLogin" type="primary" round>去登录</el-button>
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
        memberActivate(this.$route.params.activeUrl).then(activeResult => {
          this.hasError = false
          resolve()
        }).catch(error => {
          console.log(error)
          console.log(error.code)
          this.hasError = true
          if (error.code === 16) {
            this.errorMsg = '此链接已失效！'
          } else if (error.code === 17) {
            this.errorMsg = '链接错误！'
          }
          reject(error)
        })
      }).then(() => {
        this.activating = false
      }).catch(() => {
        this.activating = false
      })
    },
    methods: {
      gotoLogin() {
        this.$router.push('/loginAndRegister/login')
      }
    }
  }
</script>

<style scoped>

</style>
