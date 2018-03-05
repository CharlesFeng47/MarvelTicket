<template>
  <div>
    <ScheduleDetail is-new="false" ref="detail"></ScheduleDetail>

    <!--可进行的操作-->
    <el-row type="flex" justify="space-around" style="margin-top: 47px">
      <div class="but-group">
        <el-button @click.native.prevent="goToModify" type="primary" round>修改</el-button>
        <el-button @click.native.prevent="deleteSchedule" type="danger" round>删除</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
  import ScheduleDetail from './ScheduleDetail'

  export default {
    name: 'OneSchedule',
    components: {
      ScheduleDetail
    },
    methods: {
      // 修改日程数据，跳转页面
      goToModify() {
        this.$refs.detail.goToModify()
      },
      // 删除此日程
      deleteSchedule() {
        this.$refs.detail.deleteSchedule()
      }
    }
  }
</script>

<style scoped>

</style>
