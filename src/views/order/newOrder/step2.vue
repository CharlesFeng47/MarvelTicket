<template>
  <div>
    <OrderDetail is-new="true" :schedule-detail="scheduleDetail" ref="OrderDetail" v-on:order="gotoOrder">
    </OrderDetail>
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
    },
    methods: {
      // 验证座位信息
      validateData() {
        this.$refs.OrderDetail.validateData()
      },
      // 前往下一步预定
      gotoOrder() {
        this.$emit('order')
      }
    }
  }
</script>

<style scoped>

</style>
