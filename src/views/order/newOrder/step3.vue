<template>
  <div>
    <el-row type="flex" justify="space-around">
      <el-col :offset="1" :span="8">
        <h1>您的订单已经成功下达！</h1>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" v-if="this.roles[0]==='MEMBER'">
      <el-col :offset="2" :span="13">
        <h1>您可以选择现在付款／到订单中查看后付款</h1>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'step3',
    computed: {
      ...mapGetters([
        'roles'
      ])
    }
  }
</script>

<style scoped>

</style>
