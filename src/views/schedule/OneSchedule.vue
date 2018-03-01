<template>
  <div>
    <h1>2018徐佳莹心理学音乐会</h1>

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
          <h3>日程类型</h3>
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
        <el-input type="textarea" autosize disabled v-model="basicInfo.textArea"></el-input>
      </el-col>
    </el-row>

    <!--座位价格映射-->
    <el-row class="basic_info">
      <el-col :span="2">
        <h3>坐席价位</h3>
      </el-col>
    </el-row>
    <el-row class="basic_info" type="flex" justify="space-around">
      <el-col>
        <template>
          <el-table :data="seatPriceMap" style="width: 500px">
            <el-table-column prop="seatName" label="坐席名称" width="180"></el-table-column>
            <el-table-column prop="seatNum" label="坐席数量" width="180"></el-table-column>
            <el-table-column prop="seatPrice" label="此次价格"></el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import { getSchedule } from '@/api/schedule'

  export default {
    data() {
      return {
        basicInfo: {
          spotName: '南京市江苏大剧院',
          type: '演唱会',
          startTime: '2018-03-17 19:30',
          textArea: '这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会这是一场精彩的演唱会'
        },
        seatPriceMap: [
          {
            seatName: '一等座',
            seatNum: '100',
            seatPrice: '1000'
          }, {
            seatName: '二等座',
            seatNum: '200',
            seatPrice: '500'
          }, {
            seatName: '三等座',
            seatNum: '400',
            seatPrice: '200'
          }, {
            seatName: '四等座',
            seatNum: '600',
            seatPrice: '1200'
          }
        ]
      }
    },
    created: {
    },
    methods: {
      fetchData() {
        // console.log(this.$route.params)
        // getSchedule(this.$route.params.scheduleId)
        // if (result.state === 'OK') {
        //   const scheduleDetail = result.object
        //   this.basicInfo.spotName = scheduleDetail.name
        //   this.basicInfo.type = scheduleDetail.type
        //   this.basicInfo.startTime = scheduleDetail.startDateTime
        //   this.basicInfo.textArea = scheduleDetail.description
        //
        //   var seatPriceMapNew = []
        //   for (var i = 0; i < scheduleDetail.seatPrices.length; i++) {
        //     var curMap = scheduleDetail.seatPrices[i]
        //     seatPriceMapNew[i].seatPrice = curMap.value
        //     seatPriceMapNew[i].seatName = curMap.key.seatName
        //     seatPriceMapNew[i].seatNum = curMap.key.num
        //   }
        //   this.seatPriceMap = seatPriceMapNew
        // }
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
