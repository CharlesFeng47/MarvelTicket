<template>
  <div>
    <el-row>
      <h2>购买类型</h2>
    </el-row>
    <el-row>
      <el-form :inline="true" style="text-align: center;">
        <el-form-item label="" prop="type">
          <el-radio-group v-model="order_type">
            <el-tooltip class="item" effect="light" content="每单限 6 张，需要指定订单座位。" placement="top-start">
              <el-radio label="CHOOSE_SEATS">选座购买</el-radio>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="每单限 20 张，演出前两周统一配票，若配票失败则退款。" placement="top-start">
              <el-radio label="NOT_CHOOSE_SEATS">立即购买不选座</el-radio>
            </el-tooltip>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-row>

    <!-- 选座 -->
    <el-row v-show="order_type==='CHOOSE_SEATS'">
      <MemberChoose></MemberChoose>
    </el-row>

    <!-- 要购买的座位数量 -->
    <el-row v-show="order_type==='NOT_CHOOSE_SEATS'">
      <el-col :span="4" :offset="10">
        <el-input v-model="order_num" placeholder="请输入要购买的数量"></el-input>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import MemberChoose from '../../seatChart/memberChoose'

  // 选择订座类型并订座
  export default {
    name: 'step1',
    components: {
      MemberChoose
    },
    data() {
      return {
        order_type: 'CHOOSE_SEATS',
        order_num: ''
      }
    },
    methods: {
      // 验证表单
      validateData() {
        // this.$refs['basicInfoForm'].validate((valid) => {
        //   if (valid) {
        //     this.$emit('next')
        //   } else {
        //     console.log('error submit!!')
        //   }
        // })
        this.$emit('next')
      }
    }
  }
</script>

<style scoped>

</style>
