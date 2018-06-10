<template>
  <div>
    <OrderNav/>
    <div class="order-panel">
      <div>订单一</div>
      <div>订单二</div>
      <div>订单三</div>
      <div>订单四</div>
      <div>订单一</div>
      <div>订单二</div>
      <div>订单三</div>
      <div>订单四</div>
      <div>订单一</div>
      <div>订单二</div>
      <div>订单三</div>
      <div>订单四</div>
      <div>订单一</div>
      <div>订单二</div>
      <div>订单三</div>
      <div>订单四</div>
    </div>
  </div>
</template>

<script>
  import OrderNav from './orderNav/index'
  export default {
    name: 'order-panel',
    components: {
      OrderNav
    },
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .order-panel {
    text-align: center;
    border: #EFEFEF solid 1px;
    padding: 30px 0 30px 0;
    margin: 30px 0 0;
  }
</style>
