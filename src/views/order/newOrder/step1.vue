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
      <MemberChoose :schedule-detail="scheduleDetail" ref="MemberChoose"></MemberChoose>
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
              <el-select v-model="notChooseSeatsForm.orderSeatName" placeholder="请选择">
                <el-option
                  v-for="item in seatPriceMap"
                  :key="item.seatName"
                  :label="item.seatName"
                  :value="item.seatName">
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
  import { getSchedule } from '../../../api/schedule'

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

        // 此页面和子组件需要用的场馆座位数据
        scheduleDetail: '',

        // 表格数据
        seatPriceMap: []
      }
    },
    mounted: function() {
      this.fetchData()
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
    },
    methods: {
      fetchData() {
        new Promise((resolve, reject) => {
          getSchedule(this.$route.query.scheduleId).then(response => {
            console.log(response)
            if (response.state === 'OK') {
              const scheduleDetail = JSON.parse(response.object)
              this.scheduleDetail = scheduleDetail

              var seatPriceMapNew = []
              var all_prices = scheduleDetail.all_prices
              var all_seats = scheduleDetail.all_seats
              for (var i = 0; i < all_prices.length; i++) {
                seatPriceMapNew[i] = {}
                seatPriceMapNew[i].seatPrice = all_prices[i]
                seatPriceMapNew[i].seatName = all_seats[i].seatName
                seatPriceMapNew[i].seatNum = all_seats[i].num
                // TODO 计算剩余数量
                seatPriceMapNew[i].seatRemainNum = all_seats[i].num
              }
              this.seatPriceMap = seatPriceMapNew
              resolve()
            }
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      },

      // 重置表单
      resetData() {
        this.$refs['notChooseSeatsForm'].resetFields()
      },
      // 验证座位信息
      validateData() {
        if (this.orderType === 'CHOOSE_SEATS') {
          this.$refs.MemberChoose.storeMemberChooseData()
          this.$emit('next')
        } else {
          this.$refs['notChooseSeatsForm'].validate((valid) => {
            if (valid) {
              this.$store.dispatch('StoreNotChooseSeats', {
                order_num: this.notChooseSeatsForm.orderNum,
                order_seat_name: this.notChooseSeatsForm.orderSeatName
              }).then(() => {
                this.$emit('next')
              }).catch(() => {
              })
            } else {
              console.log('error submit!!')
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
