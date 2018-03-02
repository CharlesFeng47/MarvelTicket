<template>
  <div>
    <h1>{{ basicInfo.scheduleName }}</h1>

    <!--基本信息-->
    <el-row class="basic_info">
      <el-col :span="8">
        <el-col :span="6">
          <h3>举行场馆</h3>
        </el-col>
        <el-col :span="18">
          <el-tag type="primary" class="basic_content">{{ basicInfo.spotName }}</el-tag>
        </el-col>
      </el-col>
      <el-col :span="8">
        <el-col :span="6">
          <h3>计划类型</h3>
        </el-col>
        <el-col :span="18">
          <el-tag type="warning" class="basic_content">{{ basicInfo.type }}</el-tag>
        </el-col>
      </el-col>
      <el-col :span="8">
        <el-col :span="8">
          <h3>预计开始时间</h3>
        </el-col>
        <el-col :span="16">
          <el-tag type="danger" class="basic_content">{{ basicInfo.startTime }}</el-tag>
        </el-col>
      </el-col>
    </el-row>

    <!--描述-->
    <el-row class="basic_info">
      <el-col :span="1">
        <h3>描述</h3>
      </el-col>
      <el-col :span="23">
        <!--<el-tag type="info" class="basic_content">{{ textArea }}</el-tag>-->
        <el-input type="textarea" autosize disabled v-model="basicInfo.textArea" style="margin-top: 13px"></el-input>
      </el-col>
    </el-row>

    <!--座位价格映射-->
    <el-row class="basic_info">
      <el-col :span="2">
        <h3>坐席价位</h3>
      </el-col>
    </el-row>
    <el-row class="basic_info" type="flex" justify="space-around">
      <el-col :offset="2">
        <el-table :data="seatPriceMap" style="width: 500px" stripe>
          <el-table-column
            v-for="{ prop, label } in colConfigs"
            :key="prop"
            :prop="prop"
            :label="label">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--可进行的操作-->
    <el-row type="flex" justify="space-around" style="margin-top: 47px">
      <div class="but-group">
        <el-button @click.native.prevent="goToModify" type="primary" round>修改</el-button>
        <el-button @click.native.prevent="deleteSchedule" type="danger" round>删除</el-button>
      </div>
    </el-row>

    <div>{{ fetchData() }}</div>
  </div>
</template>

<script>
  import { getSchedule } from '../../api/schedule'
  import { getRelativeScheduleType } from '../../utils/schedule'

  export default {
    data() {
      this.colConfigs = [
        { prop: 'seatName', label: '坐席名称' },
        { prop: 'seatNum', label: '坐席数量' },
        { prop: 'seatPrice', label: '此次价格' }
      ]

      return {
        basicInfo: {
          scheduleName: '',
          spotName: '',
          type: '',
          startTime: '',
          textArea: ''
        },
        seatPriceMap: []
      }
    },
    created: function() {
      this.fetchData()
    },
    methods: {
      // 修改日程数据，跳转页面
      goToModify() {

      },
      // 删除此日程 TODO 先进行提示
      deleteSchedule() {

      },
      fetchData() {
        console.log(this.$route.params.scheduleId)
        new Promise((resolve, reject) => {
          getSchedule(this.$route.params.scheduleId).then(response => {
            console.log(response)
            if (response.state === 'OK') {
              const scheduleDetail = JSON.parse(response.object)
              this.basicInfo.scheduleName = scheduleDetail.name
              this.basicInfo.spotName = scheduleDetail.spotName
              this.basicInfo.type = getRelativeScheduleType(scheduleDetail.type)
              this.basicInfo.startTime = scheduleDetail.startDateTime
              this.basicInfo.textArea = scheduleDetail.description

              var seatPriceMapNew = []
              var all_prices = scheduleDetail.all_prices
              var all_seats = scheduleDetail.all_seats
              for (var i = 0; i < all_prices.length; i++) {
                console.log('index: ' + i)
                seatPriceMapNew[i] = {}
                seatPriceMapNew[i].seatPrice = all_prices[i]
                seatPriceMapNew[i].seatName = all_seats[i].seatName
                seatPriceMapNew[i].seatNum = all_seats[i].num
              }
              this.seatPriceMap = seatPriceMapNew
              console.log(seatPriceMapNew)
              console.log(this.seatPriceMap)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
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
