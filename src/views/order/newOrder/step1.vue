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
      <h3>座位图</h3>
      <MemberChoose :schedule-detail="scheduleDetail" ref="MemberChoose" v-on:next="gotoNext"></MemberChoose>
    </el-row>

    <!-- 要购买的座位数量 -->
    <el-row v-show="orderType==='NOT_CHOOSE_SEATS'">
      <h3>座位类型</h3>
      <el-row>
        <el-col :offset="2" :span="20">
          <el-alert
            style="margin-bottom: 20px"
            title="在左侧表格上了解座位类型信息后，在右侧输入框中选择填写哦～"
            type="info"
            close-text="已了解"
            show-icon>
          </el-alert>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2" :span="10">
          <el-table :data="seatPriceMap" stripe ref="SeatPriceMap">
            <!--<el-table-column-->
              <!--type="index"-->
              <!--width="50">-->
            <!--</el-table-column>-->
            <el-table-column
              v-for="{ prop, label } in colConfigs"
              align="center"
              :key="prop"
              :prop="prop"
              :label="label">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :offset="2" :span="8">

          <el-form :model="notChooseSeatsForm" :rules="notChooseSeatsFormRules" ref="notChooseSeatsForm" label-position="right">
            <el-form-item label="购买座位类型名称" prop="orderSeatName">
              <el-select v-model="notChooseSeatsForm.orderSeatName" placeholder="请选择" @change="selectChange">
                <el-option
                  v-for="item in seatPriceMap"
                  :key="item.seatName"
                  :label="item.seatName"
                  :value="item.seatPrice">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="购买数量" prop="orderNum">
              <el-input style="width: 250px" v-model="notChooseSeatsForm.orderNum"></el-input>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>
    </el-row>

  </div>
</template>

<script>
  import MemberChoose from '../../seatChart/memberChoose'
  import { mapGetters } from 'vuex'
  import { isValidatePositiveIntegers } from '../../../utils/validate'

  // 选择订座类型并订座
  export default {
    name: 'step1',
    props: ['scheduleDetail'],
    components: {
      MemberChoose
    },
    computed: {
      ...mapGetters([
        'order_modified',
        'order_type',
        'order_num',
        'order_seat_name'
      ])
    },
    data() {
      this.colConfigs = [
        { prop: 'seatName', label: '坐席名称' },
        { prop: 'seatNum', label: '坐席总数量' },
        { prop: 'seatRemainNum', label: '坐席剩余数量' },
        { prop: 'seatPrice', label: '价格' }
      ]

      const validateOrderSeatName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择一种座位类型'))
        } else {
          callback()
        }
      }
      const validatePositiveInteger = (rule, value, callback) => {
        if (!isValidatePositiveIntegers(value)) {
          callback(new Error('请输入合法正整数'))
        } else {
          if (value > 20) {
            callback(new Error('立即购买不选座一次不能超过 20 张票哦～'))
          } else {
            callback()
          }
        }
      }

      return {
        orderType: 'CHOOSE_SEATS',
        notChooseSeatsForm: {
          orderSeatName: '',
          orderNum: ''
        },

        notChooseSeatsFormRules: {
          orderSeatName: [{ required: true, trigger: 'blur', validator: validateOrderSeatName }],
          orderNum: [{ required: true, trigger: 'blur', validator: validatePositiveInteger }]
        },

        // 不选座时的表格数据
        seatPriceMap: [],

        // 不选座时的座位类型的单价
        seatPricePer: ''
      }
    },
    // 因为created/mounted的时候scheduleDetail可能还没取到，所以watch取到之后再添加
    watch: {
      scheduleDetail: function() {
        this.initData()
        if (this.order_modified === true) {
          this.orderType = this.order_type

          if (this.orderType === 'NOT_CHOOSE_SEATS') {
            this.notChooseSeatsForm.orderNum = this.order_num
            this.notChooseSeatsForm.orderSeatName = this.order_seat_name
          }
        } else {
          // 默认加载情况
          this.orderType = 'CHOOSE_SEATS'
        }
      }
    },
    methods: {
      initData() {
        var seatPriceMapNew = []
        var all_prices = this.scheduleDetail.all_prices
        var all_seats = this.scheduleDetail.all_seats
        for (var i = 0; i < all_prices.length; i++) {
          seatPriceMapNew[i] = {}
          seatPriceMapNew[i].seatPrice = all_prices[i]
          seatPriceMapNew[i].seatName = all_seats[i].seatName
          seatPriceMapNew[i].seatNum = all_seats[i].num
          // TODO 计算剩余数量
          seatPriceMapNew[i].seatRemainNum = all_seats[i].num
        }
        this.seatPriceMap = seatPriceMapNew
      },

      // 重置表单
      resetData() {
        this.$refs['notChooseSeatsForm'].resetFields()
      },
      // 验证座位信息
      validateData() {
        if (this.orderType === 'CHOOSE_SEATS') {
          this.$refs.MemberChoose.validateData()
        } else {
          this.$refs['notChooseSeatsForm'].validate((valid) => {
            if (valid) {
              this.$store.dispatch('StoreNotChooseSeats', {
                order_num: this.notChooseSeatsForm.orderNum,
                order_seat_name: this.notChooseSeatsForm.orderSeatName,
                order_price: this.seatPricePer * this.notChooseSeatsForm.orderNum
              }).then(() => {
                this.gotoNext()
              }).catch(() => {
              })
            } else {
              console.log('error submit!!')
            }
          })
        }
      },
      // 前往下一步
      gotoNext() {
        this.$emit('next')
      },

      // 选择器值改变
      selectChange(val) {
        this.seatPricePer = val
      }
    }
  }
</script>

<style scoped>

</style>
