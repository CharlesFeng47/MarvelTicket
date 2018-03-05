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
  import { getSchedule, deleteSchedule } from '../../../api/schedule'
  import { getUser } from '../../../api/user'
  import { getRelativeScheduleType } from '../../../utils/schedule'
  import { timeFormater } from '../../../utils/time'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ScheduleDetail',
    props: ['isNew'],
    computed: {
      ...mapGetters([
        'token',
        'basic_info_form',
        'seat_price_map'
      ])
    },
    data() {
      this.colConfigs = [
        { prop: 'seatName', label: '坐席名称' },
        { prop: 'seatNum', label: '坐席数量' },
        { prop: 'seatPrice', label: '此次价格' }
      ]

      return {
        basicInfo: {
          id: '',
          scheduleName: '',
          spotName: '',
          type: '',
          startTime: '',
          textArea: ''
        },
        seatPriceMap: []
      }
    },
    mounted: function() {
      console.log('OneSchedule detail mounted, isNew: ' + this.isNew)
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
      // 【提供给父组件中button调用】修改日程数据，跳转页面
      goToModify() {
        this.$router.push('/schedule/modify/' + this.basicInfo.id)
      },
      // 【提供给父组件中button调用】删除此日程 TODO 先进行提示
      // TODO 界面提示报错500是因为删除之后，前端又发了一个请求当前页面到后端，后端此数据已删除，所以报错
      deleteSchedule() {
        alert('删除计划：' + this.basicInfo.id)
        new Promise((resolve, reject) => {
          deleteSchedule(this.$route.params.scheduleId).then(response => {
            console.log(response)
            if (response.state === 'OK') {
              alert('已删除')
              this.$router.push('/schedule')
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      },
      fetchData() {
        console.log(this.$route.params.scheduleId)
        new Promise((resolve, reject) => {
          getSchedule(this.$route.params.scheduleId).then(response => {
            console.log(response)
            if (response.state === 'OK') {
              const scheduleDetail = JSON.parse(response.object)
              this.basicInfo.id = scheduleDetail.id
              this.basicInfo.scheduleName = scheduleDetail.name
              this.basicInfo.spotName = scheduleDetail.spotName
              this.basicInfo.type = getRelativeScheduleType(scheduleDetail.type)
              this.basicInfo.startTime = scheduleDetail.startDateTime
              this.basicInfo.textArea = scheduleDetail.description

              var seatPriceMapNew = []
              var all_prices = scheduleDetail.all_prices
              var all_seats = scheduleDetail.all_seats
              for (var i = 0; i < all_prices.length; i++) {
                seatPriceMapNew[i] = {}
                seatPriceMapNew[i].seatPrice = all_prices[i]
                seatPriceMapNew[i].seatName = all_seats[i].seatName
                seatPriceMapNew[i].seatNum = all_seats[i].num
              }
              this.seatPriceMap = seatPriceMapNew
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      },
      fulfillData() {
        new Promise((resolve, reject) => {
          getUser(this.token).then(response => {
            console.log(response)
            if (response.state === 'OK') {
              const curSpot = JSON.parse(response.object)
              this.basicInfo.spotName = curSpot.spotName

              this.basicInfo.scheduleName = this.basic_info_form.name
              this.basicInfo.type = this.basic_info_form.type
              this.basicInfo.textArea = this.basic_info_form.description

              this.basicInfo.startTime = this.basic_info_form.date + this.basic_info_form.time
              const date = this.basic_info_form.date
              const time = this.basic_info_form.time
              const dateString = date.getFullYear() + '-' + timeFormater(date.getMonth() + 1) + '-' + timeFormater(date.getDate())
              const timeString = timeFormater(time.getHours()) + ':' + timeFormater(time.getMinutes()) + ':' + timeFormater(time.getSeconds())
              this.basicInfo.startTime = dateString + ' ' + timeString

              var seatPriceMapNew = []
              var allPrices = this.seat_price_map
              for (var i = 0; i < allPrices.length; i++) {
                seatPriceMapNew[i] = {}
                seatPriceMapNew[i].seatPrice = allPrices[i].seatPrice
                seatPriceMapNew[i].seatName = allPrices[i].seatName
                seatPriceMapNew[i].seatNum = allPrices[i].seatNum
              }
              this.seatPriceMap = seatPriceMapNew
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
