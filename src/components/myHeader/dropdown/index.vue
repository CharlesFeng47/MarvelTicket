<template>
  <el-popover
    placement="bottom-start"
    width="600"
    trigger="hover">
    <div style="font-size: 14px">
      <el-row class="row">
        <el-col :span="3" :offset="1" ><div class="">当前城市:</div></el-col>
        <el-col :span="19" :offset="1" >
          <el-row>
            <el-col :span="3"><div style="background-color: #FFF4F8;" class="city">{{ current }}</div></el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="3" :offset="1" ><div class="">热门城市:</div></el-col>
        <el-col :span="19" :offset="1" >
          <el-row>
            <el-col :span="3"><div class="city">上海</div></el-col>
            <el-col :span="3"><div class="city">南京</div></el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <span slot="reference" class="location">{{ current }}<i class="el-icon-caret-bottom"></i></span>
  </el-popover>
</template>

<script>
export default {
  name: 'popover',
  components: {
  },
  data() {
    return {
      current: '上海'
    }
  },
  methods: {

  }
}
</script>


<style scoped>
.location{
  color: #777;
}
  .city{
    text-align: center;padding:0 2px 0 2px;
  }
  .city:hover{
    cursor: pointer;
  }
  .location:hover{
    cursor: pointer;
  }
</style>
