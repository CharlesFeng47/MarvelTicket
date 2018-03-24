<template>
  <div style="width: 100%">
    <el-form :model="spotBasic" :rules="rules" ref="spotBasic" label-width="100px" class="spotBasic">
      <el-form-item label="名称" prop="name" style="margin-top: 30px;color: white">
        <el-input v-model="spotBasic.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input name="password" :type="pwdType" v-model="spotBasic.password" placeholder="">
        </el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
      </el-form-item>
      <el-form-item label="密码确认" prop="password2">
        <el-input name="password2" :type="pwdType" v-model="spotBasic.password2" placeholder="">
        </el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
      </el-form-item>
      <el-form-item label="地址" prop="site">
        <el-input v-model="spotBasic.site" placeholder="">
        </el-input>
      </el-form-item>
      <el-form-item label="支付宝账号" prop="alipayId">
        <el-tooltip effect="light" content="注意：此支付宝账号用于接受会员付款参加计划的分成款项，请反复确认！" placement="bottom-start">
          <el-input v-model="spotBasic.alipayId" placeholder="">
          </el-input>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'step1',
    computed: {
      ...mapGetters([
        'spot_basic',
        'spot_basic_modified'
      ])
    },
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6) {
          callback(new Error('密码不能少于 6 位'))
        } else {
          callback()
        }
      }
      const validatePassword2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6) {
          callback(new Error('密码不能少于 6 位'))
        } else if (value !== this.spotBasic.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }
      const validateSite = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入场馆地址'))
        } else {
          callback()
        }
      }
      const validateAlipayId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入支付宝账号'))
        } else {
          callback()
        }
      }
      return {
        spotBasic: {
          name: '',
          password: '',
          password2: '',
          site: '',
          alipayId: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 5, message: '名字需不少于 5 个字符', trigger: 'blur' }
          ],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }],
          password2: [{ required: true, trigger: 'blur', validator: validatePassword2 }],
          site: [{ required: true, trigger: 'blur', validator: validateSite }],
          alipayId: [{ required: true, trigger: 'blur', validator: validateAlipayId }]

        },
        pwdType: 'password'
      }
    },
    watch: {
      spotBasic: {
        handler(val, oldVal) {
          this.$store.dispatch('ChangeSpotBasicInfo', this.spotBasic).then(() => {
          }).catch(() => {
          })
        },
        deep: true
      }
    },
    mounted: function() {
      // 场馆信息修改时，获取原有值填充到store，故直接fulfillStoredData()
      if (!this.spot_basic_modified) {
        console.log('step1 第一次，获取数据')
        this.resetData()
      } else {
        console.log('step1 已修改过数据，从store中加载数据')
        this.fulfillStoredData()
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      // 验证表单
      validateData() {
        this.$refs['spotBasic'].validate((valid) => {
          if (valid) {
            this.$emit('next')
          } else {
            console.log('error submit!!')
          }
        })
      },
      // 重置表单
      resetData() {
        this.$refs['spotBasic'].resetFields()
      },
      // 填充store里面的值
      fulfillStoredData() {
        this.spotBasic.name = this.spot_basic.name
        this.spotBasic.password = this.spot_basic.password
        this.spotBasic.password2 = this.spot_basic.password2
        this.spotBasic.site = this.spot_basic.site
        this.spotBasic.alipayId = this.spot_basic.alipayId
      }
    }
  }
</script>

<style scoped>
  .step1 .el-form-item.is-required .el-form-item__label:after {
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }

  .step1 .el-form-item.is-required .el-form-item__label:before {
    display: none;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select:none;
  }
</style>
