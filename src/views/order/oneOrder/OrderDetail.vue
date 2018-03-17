<template>
    <div>
      <h1>订单编号：（待确认）</h1>

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
            <el-tag type="primary" class="basic_content">购票中</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6">
            <h3>订单总价</h3>
          </el-col>
          <el-col :span="18">
            <el-tag type="warning" class="basic_content">3280</el-tag>
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
            <el-table-column
              v-for="{ prop, label } in colConfigs"
              align="center"
              :key="prop"
              :prop="prop"
              :label="label">
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
        'choose_seats',
        'choose_seats_count'
      ])
    },
    data() {
      this.colConfigs = [
        { prop: 'seatName', label: '坐席名称' },
        { prop: 'num', label: '订购数量' },
        { prop: 'price', label: '计价' }
      ]

      return {
        seatPriceNumMap: [
          { seatName: 'das', num: 100, price: 200 },
          { seatName: 'das', num: 100, price: 200 },
          { seatName: 'das', num: 100, price: 200 },
          { seatName: 'das', num: 100, price: 200 },
          { seatName: 'das', num: 100, price: 200 },
          { seatName: 'das', num: 100, price: 200 }
        ]
      }
    },
    mounted: function() {
      console.log('11')
      console.log(this.scheduleDetail)
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
        // TODO 座位名称不知道是哪一个。。。
        console.log(this.choose_seats)
        console.log(this.choose_seats_count)
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
