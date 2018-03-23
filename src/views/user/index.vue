<template>
  <div>

    <MemberInfo v-if="roles[0]==='MEMBER'" ref="child"></MemberInfo>
    <SpotInfo v-if="roles[0]==='SPOT'" ref="child" is-new="false"></SpotInfo>
    <ManagerInfo v-if="roles[0]==='MANAGER'" ref="child"></ManagerInfo>

    <!--可进行的操作-->
    <el-row type="flex" justify="space-around" style="margin-top: 47px">
      <div class="but-group">
        <el-button @click.native.prevent="goToModify" type="primary" round>修改</el-button>
        <el-button v-if="roles[0]==='MEMBER'" @click.native.prevent="invalidateMember" type="danger" round>注销用户</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  import { memberInvalidate } from '../../api/user'

  import MemberInfo from './member/index'
  import SpotInfo from './spot/index'
  import ManagerInfo from './manager/index'

  export default {
    name: 'UserInfo',
    computed: {
      ...mapGetters([
        'token',
        'roles'
      ])
    },
    components: {
      MemberInfo,
      SpotInfo,
      ManagerInfo
    },
    methods: {
      // 修改用户数据，跳转页面
      goToModify() {
        this.$refs.child.goToModify()
      },
      // 注销用户
      invalidateMember() {
        new Promise((resolve, reject) => {
          memberInvalidate(this.token).then(response => {
            if (response.state === 'OK') {
              Message({
                message: '您已成功注销此用户，现已登出！',
                type: 'success',
                duration: 3 * 1000,
                center: true,
                showClose: true
              })
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
          this.$store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>

</style>
