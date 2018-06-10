<template>
  <div>
    <OrderNav/>
    <div class="order-panel">
      <template v-for="order in orders">
        <MyOrder :order="order"/>
      </template>
    </div>
  </div>
</template>

<script>
  import OrderNav from './orderNav/index'
  import MyOrder from './Order'
  export default {
    name: 'order-panel',
    components: {
      OrderNav,
      MyOrder
    },
    data() {
      return {
        orders:[
          {
            orderid : "1234567890",
            planid : "123456789",
            posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
            name: '"绝色"莫文蔚巡回演唱会2018-上海站5',
            state : "未支付",
            orderTime : "2018-06-10 18:35",
            planTime : "2018-06-23 19:30",
            spot : "虹口足球场",
            orderNum : 1,
            orderPrice : 400
          },
          {
            orderid : "1234567890",
            planid : "123456789",
            posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
            name: '"绝色"莫文蔚巡回演唱会2018-上海站5',
            state : "未支付",
            orderTime : "2018-06-10 18:35",
            planTime : "2018-06-23 19:30",
            spot : "虹口足球场",
            orderNum : 1,
            orderPrice : 400
          }
        ]
      }
    },
    methods: {

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .order-panel {
    /*text-align: center;*/
    border: #EFEFEF solid 1px;
    padding: 0px 0 30px 0;
    margin: 30px 0 0;
  }
</style>
