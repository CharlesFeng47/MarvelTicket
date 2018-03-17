<template>
    <div>
      <h1>单个订单详情</h1>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  // 订单详情
  export default {
    name: 'OrderDetail',
    props: ['isNew'],
    computed: {
      ...mapGetters([
        'order_type',
        'order_num',
        'choose_seats',
        'choose_seats_count'
      ])
    },
    mounted: function() {
      if (this.isNew === 'false') {
        // 不是新的，从后端加载数据
        console.log('to fetch')
        this.fetchData()
      } else {
        // 新计划预览，从store中加载数据
        console.log('to fulfill')
        this.fulfillData()
      }
    },
    methods: {
      fetchData() {
      },
      fulfillData() {
      }
    }
  }
</script>

<style scoped>

</style>
