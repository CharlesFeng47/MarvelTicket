<template>
  <div>
    <OrderDetail is-new="false" :schedule-detail="scheduleDetail" :order-detail="orderDetail">
    </OrderDetail>

    <el-row type="flex" justify="space-around">
      <div class="but-group">
        <el-button @click.native.prevent="handlePay" v-show="orderDetail.orderState === '已下单'" type="danger" round>去付款</el-button>
      </div>
    </el-row>
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
    },
    methods: {
      handlePay() {
        this.$router.push('/payment/' + this.orderDetail.id)
      }
    }
  }
</script>

<style scoped>

</style>
