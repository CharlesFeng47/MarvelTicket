<template>
  <div>
    <h1>支付订单 {{ this.$route.params.orderId }}</h1>

    <el-row>
      <el-col :offset="8" :span="7">
        <el-row>
          <el-form :model="paymentForm" :rules="paymentFormRules" ref="paymentForm" label-width="100px">
            <el-form-item label="账号名" prop="id" style="margin-top: 30px">
              <el-input v-model="paymentForm.id"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd" style="margin-top: 30px">
              <el-input v-model="paymentForm.pwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%;" :loading="paymentLoading" @click.native.prevent="handlePayment">
                确认支付
              </el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  import { payOrder } from '../../api/order'

  // 订单支付
  export default {
    name: 'Payment',
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    data() {
      const validatePaymentId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号名'))
        } else {
          callback()
        }
      }

      const validatePaymentPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        paymentFormRules: {
          id: [{ required: true, trigger: 'blur', validator: validatePaymentId }],
          pwd: [{ required: true, trigger: 'blur', validator: validatePaymentPwd }]
        },
        paymentForm: {
          id: '',
          pwd: ''
        },

        paymentLoading: false
      }
    },
    methods: {
      // 支付订单
      handlePayment() {
        this.$refs.paymentForm.validate(valid => {
          if (valid) {
            console.log('pay')
            this.loading = true

            new Promise((resolve, reject) => {
              payOrder(this.token, this.$route.params.orderId, this.paymentForm.id, this.paymentForm.pwd).then(response => {
                if (response.state === 'OK') {
                  Message({
                    message: '您已成功支付订单！',
                    type: 'success',
                    duration: 3 * 1000,
                    center: true,
                    showClose: true
                  })
                }
                resolve()
              }).catch(error => {
                reject(error)
              })
            }).then(() => {
              this.loading = false
            }).catch(() => {
            })
          } else {
            Message({
              message: '您的支付信息还需完善哦！！',
              type: 'error',
              duration: 3 * 1000,
              center: true,
              showClose: true
            })
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
