<template>
  <div>
    <OrderDetail is-new="false" :schedule-detail="scheduleDetail" :order-detail="orderDetail">
    </OrderDetail>
  </div>
</template>

<script>
  import OrderDetail from './OrderDetail'
  import { getOrder } from '../../../api/order'

  export default {
    name: 'OneOrder',
    components: {
      OrderDetail
    },
    data: function() {
      return {
        scheduleDetail: '',
        orderDetail: ''
      }
    },
    mounted: function() {
      new Promise((resolve, reject) => {
        getOrder(this.$route.params.orderId).then(response => {
          if (response.state === 'OK') {
            const order = JSON.parse(response.object)
            this.scheduleDetail = order.schedule
            this.orderDetail = order
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
      }).catch(() => {
      })
    }
  }
</script>

<style scoped>

</style>
