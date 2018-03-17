<template>
    <div>
      <h1>订单编号：1234565432</h1>

      <!--基本信息-->
      <el-row class="basic_info">
        <el-col :span="8">
          <el-col :span="6">
            <h3>举行场馆</h3>
          </el-col>
          <el-col :span="18">
            <el-tag type="primary" class="basic_content">江苏大剧院</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6">
            <h3>计划名称</h3>
          </el-col>
          <el-col :span="18">
            <el-tag type="primary" class="basic_content">2018大寺大街上的撒娇的撒娇</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="10">
            <h3>计划预计开始时间</h3>
          </el-col>
          <el-col :span="14">
            <el-tag type="danger" class="basic_content">2018-21-21</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6">
            <h3>订票类型</h3>
          </el-col>
          <el-col :span="18">
            <el-tag type="primary" class="basic_content">立即购票</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6">
            <h3>订票状态</h3>
          </el-col>
          <el-col :span="18">
            <el-tag type="primary" class="basic_content">已购票</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6">
            <h3>订票总价</h3>
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
  .basic_info {
    margin: 5px;
  }

  .basic_content {
    margin-top: 12px;
  }
</style>
