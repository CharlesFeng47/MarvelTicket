<template>
  <div>
    <h1>{{ spotBasic.name }}</h1>

    <!--基本信息-->
    <el-row class="basic_info">
      <el-col :span="4">
        <el-col :span="8">
          <h3>编号ID</h3>
        </el-col>
        <el-col :span="8">
          <el-tag type="primary" class="basic_content">注册后自动生成哦</el-tag>
        </el-col>
      </el-col>
      <el-col :span="4">
        <el-col :span="8">
          <h3>密码</h3>
        </el-col>
        <el-col :span="8">
          <el-tag type="warning" class="basic_content">{{ spotBasic.password }}</el-tag>
        </el-col>
      </el-col>
    </el-row>

    <!--地址-->
    <el-row class="basic_info">
      <el-col :span="1">
        <h3>地址</h3>
      </el-col>
      <el-col :span="23">
        <!--<el-tag type="info" class="basic_content">{{ textArea }}</el-tag>-->
        <el-input type="textarea" autosize disabled v-model="spotBasic.site" style="margin-top: 13px"></el-input>
      </el-col>
    </el-row>

    <!--座位名称数量对比-->
    <el-row class="basic_info">
      <el-col :span="2">
        <h3>坐席价位</h3>
      </el-col>
    </el-row>
    <el-row class="basic_info" type="flex" justify="space-around">
      <el-col :offset="2">
        <el-table :data="seatNameNumMap" style="width: 500px" stripe>
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


    <el-row class="basic_info">
      <!--座位图-->
      <SeatChartDisplayOnly ref="SeatChart"></SeatChartDisplayOnly>

      <!--图例解说-->
      <!--<div id="legend" class="seatCharts-legend">-->
      <!--</div>-->
    </el-row>

  </div>
</template>

<script>
  import SeatChartDisplayOnly from '../../seatChart/displayOnly'
  import { mapGetters } from 'vuex'

  export default {
    name: 'SpotInfo',
    components: {
      SeatChartDisplayOnly
    },
    computed: {
      ...mapGetters([
        'spot_basic',
        'spot_seats_map',
        'cur_seat_type_count',
        'seat_names'
      ])
    },
    data() {
      this.colConfigs = [
        { prop: 'seatName', label: '坐席名称' },
        { prop: 'seatNum', label: '坐席数量' }
      ]
      return {
        spotBasic: {
          name: '',
          password: '',
          site: ''
        },
        seatNameNumMap: []
      }
    },
    mounted: function() {
      this.fulfillStoredData()
      this.computeSeatNameNumMap()
    },
    methods: {
      // 【提供给父组件中button调用】修改用户数据，跳转页面
      goToModify() {
        this.$router.push('/user_info/modify_spot')
      },
      // 填充store里面的值
      fulfillStoredData() {
        this.spotBasic.name = this.spot_basic.name
        this.spotBasic.password = this.spot_basic.password
        this.spotBasic.site = this.spot_basic.site
      },
      computeSeatNameNumMap: function() {
        const seatRepreChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

        var i = 0
        for (var temp in this.seat_names) {
          this.seatNameNumMap[i] = {}
          this.seatNameNumMap[i].seatName = this.seat_names[temp]
          this.seatNameNumMap[i].seatNum = this.countSpecificChar(seatRepreChar[i])
          i++
          if (i >= this.cur_seat_type_count) break
        }
      },
      // 在 seat_map 中查找指定的 char 的个数
      countSpecificChar: function(char) {
        var count = 0

        const rowNum = this.spot_seats_map.length
        const colNum = this.spot_seats_map[0].length
        for (var i = 0; i < rowNum; i++) {
          for (var j = 0; j < colNum; j++) {
            if (this.spot_seats_map[i].charAt(j) === char) count++
          }
        }
        return count
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
