<template>
  <!--TODO 整体颜色根据用户不同而修改 -->
  <div>

    <Member v-if="userType==='member'"></Member>
    <Spot v-if="userType==='spot'"></Spot>
    <Manager v-if="userType==='manager'"></Manager>

    <el-button-group>
      <el-button v-if="userType!=='member'" type="success" @click.native="changeToMember">转为会员登录</el-button>
      <el-button v-if="userType!=='spot'" type="warning" @click.native="changeToSpot">转为场馆登录</el-button>
      <el-button v-if="userType!=='manager'" type="info" @click.native="changeToManager">转为管理员登录</el-button>
    </el-button-group>

  </div>
</template>

<script>
import Member from './member/index'
import Spot from './spot/index'
import Manager from './manager/index'

export default {
  name: 'login',
  components: {
    Member,
    Spot,
    Manager
  },
  data() {
    return {
      userType: 'member'
    }
  },
  methods: {
    changeToMember() {
      this.userType = 'member'
    },
    changeToSpot() {
      this.userType = 'spot'
    },
    changeToManager() {
      this.userType = 'manager'
    }
  }
}
</script>


<style scoped>

</style>
