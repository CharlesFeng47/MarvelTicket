<template>
  <div>
    <OrderDetail is-new="true" :schedule-detail="scheduleDetail"></OrderDetail>
  </div>
</template>

<script>
  import OrderDetail from '../oneOrder/OrderDetail'

  // 订单付款
  export default {
    name: 'step2',
    props: ['scheduleDetail'],
    components: {
      OrderDetail
    }
  }
</script>

<style scoped>

</style>
