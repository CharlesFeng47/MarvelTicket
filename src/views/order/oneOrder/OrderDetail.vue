<template>
    <div>
      <h1 v-if="this.$route.meta.isNew">订单编号：（下达后确认）</h1>
      <h1 v-if="!this.$route.meta.isNew">订单编号：{{ makeUpOrderId(orderDetail.id) }}</h1>

      <!--基本信息-->
      <el-row class="basic_info">
        <el-col :span="8">
          <el-col :span="6">
            <h3>举行场馆</h3>
          </el-col>
          <el-col :span="18">
            <el-tag type="primary" class="basic_content">{{ scheduleDetail.spotName }}</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6">
            <h3>计划名称</h3>
          </el-col>
          <el-col :span="18">
            <el-tag type="primary" class="basic_content">{{ scheduleDetail.name }}</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="10">
            <h3>计划预计开始时间</h3>
          </el-col>
          <el-col :span="14">
            <el-tag type="danger" class="basic_content">{{ scheduleDetail.startDateTime }}</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6">
            <h3>订票类型</h3>
          </el-col>
          <el-col :span="18">
            <el-tag type="primary" class="basic_content">{{ convertOrderTypeToChinese(order_type) }}</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6">
            <h3>订单状态</h3>
          </el-col>
          <el-col :span="18">
            <el-tag v-if="this.$route.meta.isNew" type="primary" class="basic_content">购票中</el-tag>
            <el-tag v-if="!this.$route.meta.isNew" type="primary" class="basic_content">{{ orderDetail.orderState }}</el-tag>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="10">
            <h3>订单下达时间</h3>
          </el-col>
          <el-col :span="14">
            <el-tag v-if="this.$route.meta.isNew" type="warning" class="basic_content">下单后就可以查看哦</el-tag>
            <el-tag v-if="!this.$route.meta.isNew" type="warning" class="basic_content">{{ orderDetail.orderTime }}</el-tag>
          </el-col>
        </el-col>
      </el-row>

      <el-alert
        title="填写会员编号享受会员折扣，更可选择使用自己的优惠券哦～"
        type="info"
        close-text="已了解"
        show-icon>
      </el-alert>
      <!--会员编号-->
      <el-row class="basic_info" v-if="roles[0] === 'SPOT'">
        <el-col :span="2">
          <h3>会员购票</h3>
        </el-col>
        <el-col :span="1">
          <el-switch v-model="buyOnSpotIsMember" style="margin-top: 18px" :disabled="!this.$route.meta.isNew"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </el-col>
        <el-col :span="20" v-show="buyOnSpotIsMember">
          <el-button type="text" @click="buyOnSpotInputMemberId" style="margin-top: 10px" :disabled="!this.$route.meta.isNew">
            {{ buyOnSpotMemberId }}
          </el-button>
        </el-col>
      </el-row>

      <!--优惠券使用-->
      <el-row class="basic_info">
        <el-col :span="2">
          <h3>优惠券使用</h3>
        </el-col>
        <el-col :span="1">
          <el-switch v-model="didUseCoupon" style="margin-top: 18px" :disabled="!(this.$route.meta.isNew && buyOnSpotIsMember)"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </el-col>
        <el-col :span="20" v-show="didUseCoupon">
          <el-button type="text" @click="dialogTableVisible = true" style="margin-top: 10px" :disabled="!this.$route.meta.isNew">
            {{ wantToUseCouponDescription }}
          </el-button>
        </el-col>

        <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
          <el-table :data="myCouponData" stripe class="coupon_table" highlight-current-row @row-click="handleUsedCouponChange">
            <!--使ID不显示-->
            <el-table-column v-if="false" prop="id" label="优惠券Id" width="0">
            </el-table-column>
            <el-table-column
              v-for="{ prop, label } in myCouponConfigs"
              align="center"
              :key="prop"
              :prop="prop"
              :label="label">
            </el-table-column>
          </el-table>
        </el-dialog>
      </el-row>

      <!--座位价格映射-->
      <el-row class="basic_info">
        <el-col :span="3">
          <h3>订单座位详情</h3>
        </el-col>

        <el-col :offset="2" class="basic_info" type="flex" justify="space-around">
          <el-table :data="seatPriceNumMap" style="width: 500px" stripe show-summary>
            <el-table-column align="center" prop="seatName" label="坐席名称">
            </el-table-column>
            <el-table-column v-if="order_type==='NOT_CHOOSE_SEATS'" align="center" prop="num" label="订购数量">
            </el-table-column>
            <el-table-column v-if="order_type==='CHOOSE_SEATS'" align="center" prop="seatId" label="座位号（行_列）">
            </el-table-column>
            <el-table-column align="center" prop="price" label="小计">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!--最终价格-->
      <el-row class="basic_info">
        <el-col :span="2">
          <h3>最终价格</h3>
        </el-col>
        <el-col :span="18" class="basic_content">
          <div style="margin-top: 7px">{{ finalTotalPriceProcess }}</div>
        </el-col>
        <el-col :span="2">
          <el-tag type="danger" class="basic_content">{{ finalTotalPrice }}</el-tag>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getUser, spotGetMemberInfo } from '../../../api/user'
  import { isValidUsername } from '@/utils/validate'

  // 订单详情
  export default {
    name: 'OrderDetail',
    props: [
      'isNew',
      'scheduleDetail',
      'orderDetail'
    ],
    computed: {
      ...mapGetters([
        'token',
        'roles',

        'order_type',

        'order_num',
        'order_seat_name',

        'choose_seats',
        'choose_seats_count',

        'order_price',

        'order_did_use_coupon',
        'order_used_coupon',
        'order_total_price'
      ])
    },
    data() {
      this.myCouponConfigs = [
        { prop: 'neededCredit', label: '所需兑换积分' },
        { prop: 'offPrice', label: '减免价格' },
        { prop: 'description', label: '描述' }

      ]
      return {
        seatPriceNumMap: [],

        myCouponData: [
          { neededCredit: 100, offPrice: 5, description: '快来尝试使用优惠券吧' },
          { neededCredit: 1000, offPrice: 100, description: '使用 1000 分即可减免最多 100 元' },
          { neededCredit: 2000, offPrice: 150, description: '特惠！2000 分即可减免最多 150 元' }
        ],
        dialogTableVisible: false,

        // 现场购票会员信息
        buyOnSpotIsMember: false,
        buyOnSpotMemberId: '点击输入会员编号',
        buyOnSpotMemberIdValid: false,

        // 优惠券相关
        didUseCoupon: false,
        wantToUseCouponDescription: '点击选择优惠券',
        couponTableRow: null,

        // 会员等级
        memberLevel: '',
        // 表现价格计算过程
        finalTotalPriceProcess: '',
        // 最终价格
        finalTotalPrice: 0
      }
    },
    watch: {
      orderDetail: function() {
        if (this.isNew === 'false') {
          // 不是新的，从后端加载数据
          console.log('to fetch props')
          this.fetchPropsData()
        }
      },

      // 优惠券使用情况变化导致最终价格变化
      didUseCoupon: function() {
        this.getCalculateProcess()
      },
      wantToUseCouponDescription: function() {
        this.getCalculateProcess()
      },

      // 现场购票时会员编号改变导致积分的会员信息改变
      buyOnSpotMemberId: function() {
        if (this.buyOnSpotMemberId !== '点击输入会员编号') this.loadMemberInfo()
      },

      // 现场购票时是否是会员，导致优惠券改变
      buyOnSpotIsMember: function(val, oldVal) {
        if (!val) {
          // 关闭
          this.buyOnSpotMemberId = '点击输入会员编号'
          this.buyOnSpotMemberIdValid = false
          this.didUseCoupon = false
          this.wantToUseCouponDescription = '点击选择优惠券'
          this.couponTableRow = null
          this.myCouponData = []
          this.getCalculateProcess()
        }
      }
    },
    // 获取用户等级
    mounted: function() {
      this.loadMemberInfo()
    },

    activated: function() {
      // 在新建订单的时候keep-alive，但此处需要保持更新
      // 新计划预览，从store中加载数据
      console.log('to fulfill store')
      this.fulfillStoredData()
    },
    methods: {
      // 加载用户信息，进行选用优惠券和进行会员折扣
      loadMemberInfo() {
        if (this.roles[0] === 'MEMBER') {
          // 会员自己购票
          new Promise((resolve, reject) => {
            getUser(this.token).then(response => {
              if (response.state === 'OK') {
                const curMember = JSON.parse(response.object)
                this.memberLevel = curMember.level
                this.myCouponData = curMember.coupons
                // 呈现计算结果
                this.getCalculateProcess()
              }
              resolve()
            }).catch(error => {
              reject(error)
            })
          }).then(() => {
          }).catch(() => {
          })
        } else if (this.roles[0] === 'SPOT') {
          // 场馆现场购票
          if (this.buyOnSpotIsMember) {
            new Promise((resolve, reject) => {
              spotGetMemberInfo(this.buyOnSpotMemberId).then(response => {
                if (response.state === 'OK') {
                  const curContentMember = JSON.parse(response.object)
                  this.memberLevel = curContentMember.level
                  this.myCouponData = curContentMember.coupons
                  this.buyOnSpotMemberIdValid = true
                } else if (response.state === 'USER_NOT_EXIST') {
                  this.$message({
                    type: 'error',
                    message: '会员编号不存在',
                    duration: 3 * 1000,
                    center: true,
                    showClose: true
                  })

                  // 此用户不存在，重置数据
                  this.didUseCoupon = false
                  this.wantToUseCouponDescription = '点击选择优惠券'
                  this.couponTableRow = null

                  this.memberLevel = ''
                  this.myCouponData = []
                  this.buyOnSpotMemberIdValid = false
                }
                resolve()
              }).catch(error => {
                reject(error)
              })
            }).then(() => {
              // 呈现计算结果
              this.getCalculateProcess()
            }).catch(() => {
            })
          }
        }
      },

      fetchPropsData() {
        // 给chooseSeats赋默认值
        var chooseSeats
        if (typeof (this.orderDetail.orderedSeatsJson) !== 'undefined') {
          chooseSeats = JSON.parse(this.orderDetail.orderedSeatsJson)
        } else {
          chooseSeats = []
        }

        this.$store.dispatch('StoreDownloadedData', {
          order_type: this.orderDetail.orderType,
          order_num: this.orderDetail.notChoseSeats.num,
          order_seat_name: this.orderDetail.notChoseSeats.seatName,
          order_price: this.orderDetail.notChoseSeats.price,
          choose_seats: chooseSeats,
          choose_seats_count: chooseSeats.length,
          order_did_use_coupon: this.orderDetail.usedCoupon !== undefined,
          order_used_coupon: this.orderDetail.usedCoupon,
          order_total_price: this.orderDetail.totalPrice
        }).then(() => {
          // 设置优惠券信息
          this.didUseCoupon = this.order_did_use_coupon
          if (this.didUseCoupon) {
            this.wantToUseCouponDescription = this.order_used_coupon.description
          }

          this.refillSeatPriceNumMap()
        }).catch(() => {
        })
      },
      // 根据后后端获取的值填充
      refillSeatPriceNumMap() {
        var seatPriceNumMapNew = []
        if (this.order_type === 'NOT_CHOOSE_SEATS') {
          seatPriceNumMapNew[0] = {}
          seatPriceNumMapNew[0].seatName = this.order_seat_name
          seatPriceNumMapNew[0].num = this.order_num
          seatPriceNumMapNew[0].price = this.order_price
        } else {
          for (var i = 0; i < this.choose_seats_count; i++) {
            seatPriceNumMapNew[i] = {}
            seatPriceNumMapNew[i].seatName = this.choose_seats[i].seatName
            seatPriceNumMapNew[i].seatId = this.choose_seats[i].id
            seatPriceNumMapNew[i].price = this.choose_seats[i].price
          }
        }
        this.seatPriceNumMap = seatPriceNumMapNew

        // 呈现计算结果
        this.getCalculateProcess()
      },

      // 根据预览提供填充
      fulfillStoredData() {
        var seatPriceNumMapNew = []
        if (this.order_type === 'NOT_CHOOSE_SEATS') {
          seatPriceNumMapNew[0] = {}
          seatPriceNumMapNew[0].seatName = this.order_seat_name
          seatPriceNumMapNew[0].num = this.order_num
          seatPriceNumMapNew[0].price = this.order_price
        } else {
          for (var i = 0; i < this.choose_seats_count; i++) {
            seatPriceNumMapNew[i] = {}
            seatPriceNumMapNew[i].seatName = this.choose_seats[i].data().category
            seatPriceNumMapNew[i].seatId = this.choose_seats[i].settings.id
            seatPriceNumMapNew[i].price = this.choose_seats[i].data().price
          }
        }
        this.seatPriceNumMap = seatPriceNumMapNew

        // 呈现计算结果
        this.getCalculateProcess()
      },

      // 订单id转为8位标准展示
      makeUpOrderId(id) {
        var temp = id + ''
        while (temp.length < 8) {
          temp = '0' + temp
        }
        return temp
      },

      // order_type转中文展示
      convertOrderTypeToChinese(type) {
        switch (type) {
          case 'CHOOSE_SEATS':
            return '选座购买'
          case 'NOT_CHOOSE_SEATS':
            return '立即购买不选座'
        }
      },

      // 使用优惠券时的对话框操作
      handleUsedCouponChange(val) {
        this.couponTableRow = val
        this.wantToUseCouponDescription = val.description + '【最多减免 ' + val.offPrice + ' 元】'
        this.dialogTableVisible = false
      },

      // 呈现计算过程
      getCalculateProcess() {
        var totalPrice = 0
        var result = ''
        if (this.$route.meta.isNew) {
          // 基础价格
          totalPrice += this.order_price
          result += totalPrice

          // 会员折扣
          if ((this.roles[0] === 'MEMBER') || (this.roles[0] === 'SPOT' && this.buyOnSpotMemberIdValid)) {
            const memberDiscount = this.getMemberLevelDiscount(this.memberLevel)
            totalPrice *= parseInt(memberDiscount) / 100.0
            result += ' * ' + memberDiscount
          }

          // 优惠券
          if (this.didUseCoupon && this.couponTableRow) {
            const couponDiscount = this.couponTableRow.offPrice
            totalPrice -= couponDiscount
            if (totalPrice < 0) totalPrice = 0
            result += ' - ' + couponDiscount
          }

          result += ' = '
          this.finalTotalPriceProcess = result
          this.finalTotalPrice = totalPrice

          // 同步到store中
          this.$store.dispatch('StoreCoupon', {
            order_did_use_coupon: this.didUseCoupon,
            order_used_coupon: this.couponTableRow,
            order_total_price: this.finalTotalPrice
          }).then(() => {
          }).catch(() => {
          })
        } else {
          // 基础价格
          var basicPrice = 0
          if (this.order_type === 'CHOOSE_SEATS') {
            for (var i = 0; i < this.choose_seats_count; i++) {
              basicPrice += this.choose_seats[i].price
            }
          } else if (this.order_type === 'NOT_CHOOSE_SEATS') {
            basicPrice = this.order_price
          }
          totalPrice += basicPrice
          result += totalPrice

          // 会员折扣
          const memberDiscount = this.getMemberLevelDiscount(this.memberLevel)
          totalPrice *= parseInt(memberDiscount) / 100.0
          result += ' * ' + memberDiscount

          // 优惠券
          if (this.order_did_use_coupon) {
            const usedCoupon = this.order_used_coupon
            const couponDiscount = usedCoupon.offPrice
            totalPrice -= couponDiscount
            if (totalPrice < 0) totalPrice = 0
            result += ' - ' + couponDiscount
          }

          result += ' = '
          this.finalTotalPriceProcess = result
          this.finalTotalPrice = totalPrice
        }
      },

      getMemberLevelDiscount(level) {
        const creditTableData = [
          '95%', '90%', '85%', '80%', '75%', '70%', '65%', '60%'
        ]
        return creditTableData[level - 1]
      },

      // 现场购票时输入会员编号
      buyOnSpotInputMemberId() {
        this.$prompt('请输入会员编号', '会员购票', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: this.buyOnSpotMemberId === '点击输入会员编号' ? '' : this.buyOnSpotMemberId,
          inputValidator: this.validateUserName,
          inputErrorMessage: '会员编号格式不正确'
        }).then(({ value }) => {
          this.buyOnSpotMemberId = value
        }).catch(() => {
          // 取消操作
        })
      },

      validateUserName(str) {
        if (str === null || str === '') return '请输入会员编号'
        else return isValidUsername
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

  .coupon_table {
    width: 100%;
  }
</style>
