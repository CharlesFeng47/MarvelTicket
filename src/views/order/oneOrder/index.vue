<template>
  <div>
    <OrderDetail is-new="false"></OrderDetail>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import OrderDetail from './OrderDetail'

  export default {
    name: 'OneOrder',
    components: {
      OrderDetail
    },
    computed: {
      ...mapGetters([
        'order_type',
        'order_num',
        'choose_seats',
        'choose_seats_count'
      ])
    }
  }
</script>

<style scoped>

</style>
