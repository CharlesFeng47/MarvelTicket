<template>
  <div>
    <!--<h1>组件三</h1>-->
    <!--<h1>{{ curStep }}</h1>-->
    <ScheduleDetail is-new="true"></ScheduleDetail>
  </div>
</template>

<script>
  import ScheduleDetail from '../oneSchedule/ScheduleDetail'

  export default {
    components: {
      ScheduleDetail
    },
    name: 'step3',
    props: ['curStep']
  }
</script>

<style scoped>

</style>
