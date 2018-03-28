<template>
  <div>
    <ScheduleDetail is-new="false" ref="detail"></ScheduleDetail>

    <!--可进行的操作-->
    <el-row type="flex" justify="space-around" style="margin-top: 47px">
      <div class="but-group" v-if="roles[0]==='SPOT'">
        <el-button @click.native.prevent="buyTicketOnSpot" type="success" round>现场购票</el-button>
        <el-button @click.native.prevent="goToModify" type="primary" round>修改</el-button>
        <el-button @click.native.prevent="deleteSchedule" type="danger" round>删除</el-button>
      </div>
      <div class="but-group" v-if="roles[0]==='MEMBER'">
        <el-button @click.native.prevent="goToOrder" type="primary" round>订购</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
  import ScheduleDetail from './ScheduleDetail'
  import { mapGetters } from 'vuex'

  // 单个schedule的界面
  export default {
    name: 'OneSchedule',
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    components: {
      ScheduleDetail
    },
    methods: {
      // 场馆现场购票
      buyTicketOnSpot() {
        this.$router.push({
          path: '/buy_on_spot/new',
          query: {
            scheduleId: this.$route.params.scheduleId
          }
        })
      },

      // 修改日程数据，跳转页面
      goToModify() {
        this.$refs.detail.goToModify()
      },
      // 删除此日程
      deleteSchedule() {
        this.$refs.detail.deleteSchedule()
      },

      // 在此计划中订票
      goToOrder() {
        this.$router.push({
          path: '/order/new_order',
          query: {
            scheduleId: this.$route.params.scheduleId
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
