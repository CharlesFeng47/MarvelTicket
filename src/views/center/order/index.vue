<template>
  <div>
    <!-- 订单界面的上部导航 -->
    <OrderNav/>
    <template v-if="maxPage !== 0">
      <div class="order-panel">
        <template v-for="order in showOrders">
          <MyOrder :order="order"/>
        </template>
      </div>
      <Pagination :max_page="maxPage" :current_page="currentPage" v-on:changePage="changePage"/>
    </template>
    <template v-else>
      <el-row>
        <el-col :span="11" style="text-align: right">
          <img  src="../../../assets/sad.png" style="margin-top: 80px;margin-bottom: 60px" height="100" width="100"/>
        </el-col>
        <el-col :span="13" style="text-align: left">
          <div style="display: inline-block;margin-top: 100px"> 你还没有该类型的订单！</div>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
  import OrderNav from './orderNav/index'
  import MyOrder from './Order'
  import { getMyOrders } from '../../../api/order'
  import Pagination from '../../../components/pagination/index'
  import { mapGetters } from 'vuex'

  // 我的订单管理
  export default {
    name: 'order-panel',
    components: {
      OrderNav,
      MyOrder,
      Pagination
    },
    computed: {
      ...mapGetters([
        'token'
      ]),
      type: function() {
        if (this.$route.query.type <= 4 && this.$route.query.type >= 0) {
          return this.$route.query.type
        } else {
          return '0'
        }
      }
    },
    watch: {
      // 根据路由参数选定当前激活的type
      type: {
        handler: function(newVal, oldVal) {
          this.initOrders()
        }
      },
      currentPage: {
        handler: function(newVal, oldVal) {
          this.refreshOrders()
        }
      }
    },
    mounted: function() {
      this.initOrders()
    },
    data() {
      return {
        orders: [],
        // 当前展示的当页概况
        showOrders: [],
        // 当前的页码
        currentPage: 1,
        // 最大页码
        maxPage: 1,
        // 每页的条数
        everyPage: 4
      }
    },
    methods: {
      refreshOrders() {
        this.showOrders = []
        console.log(this.showOrders)
        for (var index = (this.currentPage - 1) * this.everyPage;
          index < this.currentPage * this.everyPage && index < this.orders.length;
          index++) {
          this.showOrders.push(this.orders[index])
        }
      },
      changePage: function(page) {
        this.currentPage = page
      },
      initOrders() {
        var typeName = ''
        switch (this.type) {
          case '0':
            typeName = '全部'
            break
          case '1':
            typeName = '未支付'
            break
          case '2':
            typeName = '已支付'
            break
          case '3':
            typeName = '已取消'
            break
          case '4':
            typeName = '已退款'
            break
        }
        new Promise((resolve, reject) => {
          getMyOrders(typeName, this.token).then(orders => {
            this.orders = orders
            this.maxPage = Math.ceil(this.orders.length / this.everyPage)
            this.currentPage = 1
            this.refreshOrders()
            resolve()
          }).catch(error => {
          })
        }).then(() => {
        })
      }
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
  .no-order{
    margin-top: 10px;
    height: 300px;
    line-height: 200px;
    /*text-align: center;*/
    width: 90%;
    padding-left: 43%;
  }
</style>
