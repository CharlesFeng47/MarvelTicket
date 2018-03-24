<template>
  <div style="max-height: 620px;overflow: auto">
    <el-form :inline="true" :model="seatMapControlForm" :rules="seatMapControlFormRules" ref="seatMapControlForm" style="text-align: center;margin-top: 25px">
      <el-form-item label="最大行数" prop="seatRow">
        <el-input v-model="seatMapControlForm.seatRow" placeholder="请输入最大行数">
        </el-input>
      </el-form-item>
      <el-form-item label="最大列数" prop="seatCol">
        <el-input v-model="seatMapControlForm.seatCol" placeholder="请输入最大行数">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="initFromSeatMapControlForm">生成座位</el-button>
      </el-form-item>
    </el-form>

    <SeatChart :seat-map-control-form="seatMapControlForm" ref="SeatChart" v-on:reset="setSeatMapControlForm">
    </SeatChart>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SeatChart from '../../../seatChart/index'
  import { isValidatePositiveIntegers } from '../../../../utils/validate'

  export default {
    name: 'step2',
    components: {
      SeatChart
    },
    computed: {
      ...mapGetters([
        'spot_seats_map_modified'
      ])
    },
    data() {
      const validatePositiveInteger = (rule, value, callback) => {
        if (!isValidatePositiveIntegers(value)) {
          callback(new Error('请输入合法正整数'))
        } else {
          callback()
        }
      }
      return {
        seatMapControlForm: {
          seatRow: 9,
          seatCol: 50
        },
        seatMapControlFormRules: {
          seatRow: [{ required: true, trigger: 'blur', validator: validatePositiveInteger }],
          seatCol: [{ required: true, trigger: 'blur', validator: validatePositiveInteger }]
        }
      }
    },
    mounted: function() {
    },
    watch: {
      'chooseSeatForWhich.chooseSeatForA': function(val, oldVal) {
        if (val === true) {
          this.closeAllChooseSeatButOne('chooseSeatForA')
        }
      },
      'chooseSeatForWhich.chooseSeatForB': function(val, oldVal) {
        if (val === true) {
          this.closeAllChooseSeatButOne('chooseSeatForB')
        }
      },
      'chooseSeatForWhich.chooseSeatForC': function(val, oldVal) {
        if (val === true) {
          this.closeAllChooseSeatButOne('chooseSeatForC')
        }
      },
      'chooseSeatForWhich.chooseSeatForD': function(val, oldVal) {
        if (val === true) {
          this.closeAllChooseSeatButOne('chooseSeatForD')
        }
      },
      'chooseSeatForWhich.chooseSeatForE': function(val, oldVal) {
        if (val === true) {
          this.closeAllChooseSeatButOne('chooseSeatForE')
        }
      },
      'chooseSeatForWhich.chooseSeatForF': function(val, oldVal) {
        if (val === true) {
          this.closeAllChooseSeatButOne('chooseSeatForF')
        }
      },
      'chooseSeatForWhich.chooseSeatForG': function(val, oldVal) {
        if (val === true) {
          this.closeAllChooseSeatButOne('chooseSeatForG')
        }
      },
      'chooseSeatForWhich.chooseSeatForH': function(val, oldVal) {
        if (val === true) {
          this.closeAllChooseSeatButOne('chooseSeatForH')
        }
      },
      'chooseSeatForWhich.chooseSeatForI': function(val, oldVal) {
        if (val === true) {
          this.closeAllChooseSeatButOne('chooseSeatForI')
        }
      }
    },
    methods: {
      // 检验数据可靠性并修改store
      validateData() {
        this.$refs['seatMapControlForm'].validate((valid) => {
          if (valid) {
            this.$refs.SeatChart.updateStoredSpotData()
            this.$emit('next')
          } else {
            console.log('error submit!!')
          }
        })
      },
      // 由子组件调用自己，重新设置自己的 seatMapControlForm 的值
      setSeatMapControlForm: function(curRow, curCol) {
        this.seatMapControlForm.seatRow = curRow
        this.seatMapControlForm.seatCol = curCol
      },
      initFromSeatMapControlForm() {
        // 数据合法再修改座位表
        this.$refs['seatMapControlForm'].validate((valid) => {
          if (valid) {
            this.$refs.SeatChart.initFromSeatMapControlForm()
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
