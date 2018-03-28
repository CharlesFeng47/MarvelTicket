<template>
  <div>
    <h1>订单情况</h1>
    <div v-loading="orderStatisticsLoading">
      <PieChart
        :data="orderStatistics"
        :legend-data="orderStatisticsLegend"
        :title-name="orderStatisticsTitleName">
      </PieChart>
    </div>
  </div>
</template>

<script>
  import PieChart from '../PieChart'
  import { mapGetters } from 'vuex'
  import { getOrdersStatistics } from '../../../api/statistics'

  export default {
    components: {
      PieChart
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    data() {
      return {
        // 订单的统计数据
        orderStatisticsTitleName: '订单统计',
        orderStatisticsLegend: ['已下单', '逾期未付款自动取消', '已支付', '配票失败', '已检票', '已过期', '已退款'],
        orderStatistics: [],

        orderStatisticsLoading: true
      }
    },
    mounted: function() {
      new Promise((resolve, reject) => {
        getOrdersStatistics(this.token).then(response => {
          if (response.state === 'OK') {
            this.orderStatistics = JSON.parse(response.object)
            console.log(this.orderStatistics)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
        this.orderStatisticsLoading = false
      }).catch(() => {
        this.orderStatisticsLoading = false
      })
    }
  }
</script>

<style scoped>

</style>
