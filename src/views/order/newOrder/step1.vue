<template>
  <div>
    <el-row>
      <h2>购买类型</h2>
    </el-row>
    <el-row>
      <el-form :inline="true" style="text-align: center;">
        <el-form-item label="" prop="type">
          <el-radio-group v-model="orderType">
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
    <el-row v-show="orderType==='CHOOSE_SEATS'">
      <MemberChoose ref="MemberChoose"></MemberChoose>
    </el-row>

    <!-- 要购买的座位数量 -->
    <el-row v-show="orderType==='NOT_CHOOSE_SEATS'">
      <el-col :span="4" :offset="10">
        <el-input v-model="orderNum" placeholder="请输入要购买的数量"></el-input>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import MemberChoose from '../../seatChart/memberChoose'
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  import { isValidatePositiveIntegers } from '../../../utils/validate'

  // 选择订座类型并订座
  export default {
    name: 'step1',
    components: {
      MemberChoose
    },
    computed: {
      ...mapGetters([
        'order_modified',
        'order_type',
        'order_num'
      ])
    },
    data() {
      return {
        orderType: 'CHOOSE_SEATS',
        orderNum: ''
      }
    },
    mounted: function() {
      if (this.order_modified === true) {
        this.orderType = this.order_type
        if (this.orderType === 'NOT_CHOOSE_SEATS') {
          this.orderNum = this.order_num
        }
      } else {
        // 默认加载情况
        this.orderType = 'CHOOSE_SEATS'
      }
    },
    methods: {
      // 验证座位信息
      validateData() {
        if (this.orderType === 'CHOOSE_SEATS') {
          this.$refs.MemberChoose.storeMemberChooseData()
          this.$emit('next')
        } else {
          // 验证输入框
          if (isValidatePositiveIntegers(this.orderNum)) {
            if (this.orderNum > 20) {
              Message({
                message: '立即购买不选座一次不能超过 20 张票哦～',
                type: 'error',
                duration: 3 * 1000,
                center: true,
                showClose: true
              })
            } else {
              this.$store.dispatch('StoreNotChooseSeats', this.orderNum).then(() => {
                this.$emit('next')
              }).catch(() => {
              })
            }
          } else {
            Message({
              message: '请输入合法的正整数哦～',
              type: 'error',
              duration: 3 * 1000,
              center: true,
              showClose: true
            })
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
