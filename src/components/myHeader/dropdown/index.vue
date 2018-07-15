<template>
  <el-popover
    placement="bottom-start"
    width="600"
    trigger="hover">
    <div style="font-size: 14px">
      <el-row class="row">
        <el-col :span="3" :offset="1">
          <div class="">当前城市:</div>
        </el-col>
        <el-col :span="19" :offset="1">
          <el-row>
            <el-col :span="3">
              <div style="background-color: #FFF4F8;" class="city">{{ current }}</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="row" style="margin-top: 10px">
        <el-col :span="3" :offset="1">
          <div class="">热门城市:</div>
        </el-col>
        <el-col :span="19" :offset="1">
          <el-row>
            <el-col v-for="city in cityList" :key="city" :span="3">
              <div class="city" @click="current = city">{{ city }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-for="city in cityDisableList" :key="city" :span="3">
              <div class="city disable">{{ city }}</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <span slot="reference" class="location">{{ current }}<i class="el-icon-caret-bottom"></i></span>
  </el-popover>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'popover',
    data: function() {
      return {
        current: '上海',
        cityList: ['上海', '南京', '无锡', '苏州', '常州'],
        cityDisableList: ['北京', '天津', '重庆', '杭州', '大连']
      }
    },
    computed: {
      ...mapGetters([
        'cur_city'
      ])
    },
    watch: {
      current: {
        handler: function(newVal, oldVal) {
          this.$store.dispatch('StoreCurCity', {
            cur_city: newVal
          }).then(() => {
          }).catch(() => {
          })
        }
      }
    },
    methods: {}
  }
</script>


<style scoped>
  .location {
    color: #777;
  }

  .city {
    text-align: center;
    padding: 0 2px 0 2px;
  }

  .disable {
    color: gainsboro;
  }

  .city:hover {
    cursor: pointer;
  }

  .location:hover {
    cursor: pointer;
  }
</style>
