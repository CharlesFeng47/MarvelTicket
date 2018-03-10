<template>
  <div>

    <MemberInfo v-if="roles[0]==='MEMBER'" ref="child"></MemberInfo>
    <SpotInfo v-if="roles[0]==='SPOT'" ref="child" is-new="false"></SpotInfo>
    <ManagerInfo v-if="roles[0]==='MANAGER'" ref="child"></ManagerInfo>

    <!--可进行的操作-->
    <el-row type="flex" justify="space-around" style="margin-top: 47px">
      <div class="but-group">
        <el-button @click.native.prevent="goToModify" type="primary" round>修改</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import MemberInfo from './member/index'
  import SpotInfo from './spot/index'
  import ManagerInfo from './manager/index'

  export default {
    name: 'UserInfo',
    computed: {
      ...mapGetters([
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
      }
    }
  }
</script>

<style scoped>

</style>
