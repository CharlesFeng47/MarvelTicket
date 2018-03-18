<template>
    <div>
      <h1>订单编号：（下达后确认）</h1>

      <!--基本信息-->
      <el-row class="basic_info">
        <el-col :span="8">
          <el-col :span="6">
            <h3>举行场馆</h3>
          </el-col>
          <el-col :span="18">
            <el-tag type="primary" class="basic_content">{{ scheduleDetail.spotName }}</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6">
            <h3>计划名称</h3>
          </el-col>
          <el-col :span="18">
            <el-tag type="primary" class="basic_content">{{ scheduleDetail.name }}</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="10">
            <h3>计划预计开始时间</h3>
          </el-col>
          <el-col :span="14">
            <el-tag type="danger" class="basic_content">{{ scheduleDetail.startDateTime }}</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6">
            <h3>订票类型</h3>
          </el-col>
          <el-col :span="18">
            <el-tag type="primary" class="basic_content">{{ convertOrderTypeToChinese(order_type) }}</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6">
            <h3>订单状态</h3>
          </el-col>
          <el-col :span="18">
            <el-tag v-if="this.$route.meta.isNew" type="primary" class="basic_content">购票中</el-tag>
            <el-tag v-if="!this.$route.meta.isNew" type="primary" class="basic_content">bb</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="10">
            <h3>订单下达时间</h3>
          </el-col>
          <el-col :span="14">
            <el-tag v-if="this.$route.meta.isNew" type="warning" class="basic_content">下单后就可以查看哦</el-tag>
            <el-tag v-if="!this.$route.meta.isNew" type="warning" class="basic_content">aa</el-tag>
          </el-col>
        </el-col>
      </el-row>

      <!--座位价格映射-->
      <el-row class="basic_info">
        <el-col :span="3">
          <h3>订单座位详情</h3>
        </el-col>
      </el-row>
      <el-row class="basic_info" type="flex" justify="space-around">
        <el-col :offset="2">
          <el-table :data="seatPriceNumMap" style="width: 500px" stripe show-summary>
            <el-table-column align="center" prop="seatName" label="坐席名称">
            </el-table-column>
            <el-table-column v-if="order_type==='NOT_CHOOSE_SEATS'" align="center" prop="num" label="订购数量">
            </el-table-column>
            <el-table-column v-if="order_type==='CHOOSE_SEATS'" align="center" prop="seatId" label="座位号（行_列）">
            </el-table-column>
            <el-table-column align="center" prop="price" label="小计">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!--TODO 优惠信息-->
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  // 订单详情
  export default {
    name: 'OrderDetail',
    props: [
      'isNew',
      'scheduleDetail'
    ],
    computed: {
      ...mapGetters([
        'order_type',

        'order_num',
        'order_seat_name',
        'order_price',

        'choose_seats',
        'choose_seats_count'
      ])
    },
    data() {
      return {
        seatPriceNumMap: []
      }
    },
    activated: function() {
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
        var seatPriceNumMapNew = []
        if (this.order_type === 'NOT_CHOOSE_SEATS') {
          seatPriceNumMapNew[0] = {}
          seatPriceNumMapNew[0].seatName = this.order_seat_name
          seatPriceNumMapNew[0].num = this.order_num
          seatPriceNumMapNew[0].price = this.order_price
        } else {
          for (var i = 0; i < this.choose_seats_count; i++) {
            seatPriceNumMapNew[i] = {}
            seatPriceNumMapNew[i].seatName = this.choose_seats[i].data().category
            seatPriceNumMapNew[i].seatId = this.choose_seats[i].settings.id
            seatPriceNumMapNew[i].price = this.choose_seats[i].data().price
          }
        }
        this.seatPriceNumMap = seatPriceNumMapNew
      },

      // order_type转中文展示
      convertOrderTypeToChinese(type) {
        switch (type) {
          case 'CHOOSE_SEATS':
            return '选座购买'
          case 'NOT_CHOOSE_SEATS':
            return '立即购买不选座'
        }
      }
    }
  }
</script>

<style scoped>
  .basic_info {
    margin: 5px;
  }

  .basic_content {
    margin-top: 12px;
  }
</style>
