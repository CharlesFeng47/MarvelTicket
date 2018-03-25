<template>
  <div>
    <OrderDetail is-new="false" :schedule-detail="scheduleDetail" :order-detail="orderDetail">
    </OrderDetail>

    <el-row type="flex" justify="space-around">
      <div class="but-group">
        <el-button @click.native.prevent="handlePay" v-show="orderDetail.orderState === '已下单'" type="danger" round>去付款</el-button>
        <el-button @click.native.prevent="handleUnsubscribe" v-show="orderDetail.orderState === '已支付'" type="danger" round>退订</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
  import OrderDetail from './OrderDetail'
  import { mapGetters } from 'vuex'
  import { getOrder, unsubscribe } from '../../../api/order'
  import { makeUpOrderId } from '../../../utils/order_helper'

  export default {
    name: 'OneOrder',
    components: {
      OrderDetail
    },
    computed: {
      ...mapGetters([
        'token'
      ])
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
      // 付款
      handlePay() {
        this.$router.push('/payment/' + this.orderDetail.id)
      },
      // 退订
      handleUnsubscribe() {
        const confirmMsg = '确定退订订单 ' + makeUpOrderId(this.$route.params.orderId) + ' 并在下方输入退款到达账户'
        this.$prompt(confirmMsg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: this.validateRefundAccount
        }).then(({ value }) => {
          new Promise((resolve, reject) => {
            unsubscribe(this.token, this.$route.params.orderId, value).then(response => {
              if (response.state === 'OK') {
                this.$message({
                  message: '退订成功！',
                  type: 'success',
                  duration: 3 * 1000,
                  center: true,
                  showClose: true
                })
                resolve()
              } else {
                var errorMsg = '未知错误，请联系管理员'
                if (response.state === 'ALIPAY_ENTITY_NOT_EXIST') {
                  errorMsg = '您的退款账户不存在，请检查后重试！'
                } else if (response.state === 'ORDER_NOT_REFUNDABLE') {
                  errorMsg = '您的订单状态不可以退款！有问题请联系管理员～'
                }
                this.$message({
                  message: errorMsg,
                  type: 'error',
                  duration: 3 * 1000,
                  center: true,
                  showClose: true
                })
                reject()
              }
            }).catch(error => {
              reject(error)
            })
          }).then(() => {
            // 修改界面状态
            this.orderDetail.orderState = '已退款'
          }).catch(() => {
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '您已取消退订',
            center: true,
            showClose: true
          })
        })
      },
      validateRefundAccount(str) {
        if (str === null || str === '') return '请输入退款到达账户'
        else return true
      }
    }
  }
</script>

<style scoped>

</style>
