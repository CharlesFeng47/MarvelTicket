<template>
  <div>
    <OrderDetail is-new="true"></OrderDetail>
  </div>
</template>

<script>
  import OrderDetail from '../oneOrder/OrderDetail'

  // 订单付款
  export default {
    name: 'step2',
    components: {
      OrderDetail
    }
  }
</script>

<style scoped>

</style>
