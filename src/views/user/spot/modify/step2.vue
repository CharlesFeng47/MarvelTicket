<template>
  <div style="max-height: 620px;overflow: auto">
    <el-form :inline="true" :model="seatMapControlForm" style="text-align: center;margin-top: 25px">
      <el-form-item label="最大行数">
        <el-input v-model="seatMapControlForm.seatRow" placeholder="请输入最大行数">
        </el-input>
      </el-form-item>
      <el-form-item label="最大列数">
        <el-input v-model="seatMapControlForm.seatCol" placeholder="请输入最大行数">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="seatChartInit">生成座位</el-button>
      </el-form-item>
    </el-form>

    <el-row>
      <!--左侧为座位表-->
      <el-col :span="18" style="height: 600px;overflow-x: auto;overflow-y: auto">
        <div id="seat-map">
          <div class="front-indicator">Front</div>
        </div>
      </el-col>

      <!--右侧为图例-->
      <el-col :span="6">
        <el-row>
          <el-col :offset="9" style="margin-top: 20px;margin-bottom: 20px;font-size: 14px;color: #373C38;">
            座位类型
          </el-col>
        </el-row>

        <!--具体的座位名称对应-->
        <el-row>
          <el-row v-show="curSeatTypeCount>0">
            <el-col :offset="3" :span="3">
              <div class="seat-label a-class"></div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="seatNames.aName" placeholder="请输入此座位名称">
              </el-input>
            </el-col>
            <el-col :offset="1" :span="3">
              <el-switch v-model="chooseSeatForWhich.chooseSeatForA" class="seat-label-switch"
                         :active-color="chooseSeatForActiveColor" :inactive-color="chooseSeatForInactiveColor">
              </el-switch>
            </el-col>
          </el-row>
          <el-row v-show="curSeatTypeCount>1">
            <el-col :offset="3" :span="3">
              <div class="seat-label b-class"></div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="seatNames.bName" placeholder="请输入此座位名称">
              </el-input>
            </el-col>
            <el-col :offset="1" :span="3">
              <el-switch v-model="chooseSeatForWhich.chooseSeatForB" class="seat-label-switch"
                         :active-color="chooseSeatForActiveColor" :inactive-color="chooseSeatForInactiveColor">
              </el-switch>
            </el-col>
          </el-row>
          <el-row v-show="curSeatTypeCount>2">
            <el-col :offset="3" :span="3">
              <div class="seat-label c-class"></div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="seatNames.cName" placeholder="请输入此座位名称">
              </el-input>
            </el-col>
            <el-col :offset="1" :span="3">
              <el-switch v-model="chooseSeatForWhich.chooseSeatForC" class="seat-label-switch"
                         :active-color="chooseSeatForActiveColor" :inactive-color="chooseSeatForInactiveColor">
              </el-switch>
            </el-col>
          </el-row>
          <el-row v-show="curSeatTypeCount>3">
            <el-col :offset="3" :span="3">
              <div class="seat-label d-class"></div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="seatNames.dName" placeholder="请输入此座位名称">
              </el-input>
            </el-col>
            <el-col :offset="1" :span="3">
              <el-switch v-model="chooseSeatForWhich.chooseSeatForD" class="seat-label-switch"
                         :active-color="chooseSeatForActiveColor" :inactive-color="chooseSeatForInactiveColor">
              </el-switch>
            </el-col>
          </el-row>
          <el-row v-show="curSeatTypeCount>4">
            <el-col :offset="3" :span="3">
              <div class="seat-label e-class"></div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="seatNames.eName" placeholder="请输入此座位名称">
              </el-input>
            </el-col>
            <el-col :offset="1" :span="3">
              <el-switch v-model="chooseSeatForWhich.chooseSeatForE" class="seat-label-switch"
                         :active-color="chooseSeatForActiveColor" :inactive-color="chooseSeatForInactiveColor">
              </el-switch>
            </el-col>
          </el-row>
          <el-row v-show="curSeatTypeCount>5">
            <el-col :offset="3" :span="3">
              <div class="seat-label f-class"></div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="seatNames.fName" placeholder="请输入此座位名称">
              </el-input>
            </el-col>
            <el-col :offset="1" :span="3">
              <el-switch v-model="chooseSeatForWhich.chooseSeatForF" class="seat-label-switch"
                         :active-color="chooseSeatForActiveColor" :inactive-color="chooseSeatForInactiveColor">
              </el-switch>
            </el-col>
          </el-row>
          <el-row v-show="curSeatTypeCount>6">
            <el-col :offset="3" :span="3">
              <div class="seat-label g-class"></div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="seatNames.gName" placeholder="请输入此座位名称">
              </el-input>
            </el-col>
            <el-col :offset="1" :span="3">
              <el-switch v-model="chooseSeatForWhich.chooseSeatForG" class="seat-label-switch"
                         :active-color="chooseSeatForActiveColor" :inactive-color="chooseSeatForInactiveColor">
              </el-switch>
            </el-col>
          </el-row>
          <el-row v-show="curSeatTypeCount>7">
            <el-col :offset="3" :span="3">
              <div class="seat-label h-class"></div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="seatNames.hName" placeholder="请输入此座位名称">
              </el-input>
            </el-col>
            <el-col :offset="1" :span="3">
              <el-switch v-model="chooseSeatForWhich.chooseSeatForH" class="seat-label-switch"
                         :active-color="chooseSeatForActiveColor" :inactive-color="chooseSeatForInactiveColor">
              </el-switch>
            </el-col>
          </el-row>
          <el-row v-show="curSeatTypeCount>8">
            <el-col :offset="3" :span="3">
              <div class="seat-label i-class"></div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="seatNames.iName" placeholder="请输入此座位名称">
              </el-input>
            </el-col>
            <el-col :offset="1" :span="3">
              <el-switch v-model="chooseSeatForWhich.chooseSeatForI" class="seat-label-switch"
                         :active-color="chooseSeatForActiveColor" :inactive-color="chooseSeatForInactiveColor">
              </el-switch>
            </el-col>
          </el-row>
        </el-row>

        <!--增加／删除按钮-->
        <el-row style="margin-top: 20px">
          <el-col :offset="4" :span="6">
            <el-button @click="addSeatTypeMethod" :disabled="curSeatTypeCount>8" size="small" type="success" round>增加类型</el-button>
          </el-col>
          <el-col :offset="4" :span="6">
            <el-button @click="deleteSeatTypeMethod" :disabled="curSeatTypeCount<2" size="small" type="danger" round>删除类型</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'step2',
    data() {
      // const seatRepreChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
      return {
        // 当前有多少种座位类型
        curSeatTypeCount: 9,

        chooseSeatForActiveColor: '#13ce66',
        chooseSeatForInactiveColor: '#ff4949',

        // 点击座位为哪种类型
        chooseSeatForWhich: {
          chooseSeatForA: true,
          chooseSeatForB: false,
          chooseSeatForC: false,
          chooseSeatForD: false,
          chooseSeatForE: false,
          chooseSeatForF: false,
          chooseSeatForG: false,
          chooseSeatForH: false,
          chooseSeatForI: false
        },

        seatMapControlForm: {
          seatRow: 9,
          seatCol: 5
        },
        seatNames: {
          aName: 'A 类座位',
          bName: 'B 类座位',
          cName: 'C 类座位',
          dName: 'D 类座位',
          eName: 'E 类座位',
          fName: 'F 类座位',
          gName: 'G 类座位',
          hName: 'H 类座位',
          iName: 'I 类座位'
        },
        seatMap: [
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
          'cccccccccccccccccccccccccccccccccccccccccccccccccc',
          'dddddddddddddddddddddddddddddddddddddddddddddddddd',
          'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          'ffffffffffffffffffffffffffffffffffffffffffffffffff',
          'gggggggggggggggggggggggggggggggggggggggggggggggggg',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'
        ]
      }
    },
    created: function() {
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
      closeAllChooseSeatButOne: function(chooseSeatForWhichItem) {
        console.log('but: ' + chooseSeatForWhichItem)
        for (var item in this.chooseSeatForWhich) {
          if (item !== chooseSeatForWhichItem) {
            this.chooseSeatForWhich[item] = false
          } else {
            this.chooseSeatForWhich[item] = true
          }
        }
      },
      addSeatTypeMethod: function() {
        this.curSeatTypeCount++
      },
      deleteSeatTypeMethod: function() {
        this.curSeatTypeCount--

        // 先找到当前选择的座位类型
        var nowChooseSeatForWhichItem
        for (var item in this.chooseSeatForWhich) {
          if (this.chooseSeatForWhich[item] === true) {
            nowChooseSeatForWhichItem = item
          }
        }

        if (nowChooseSeatForWhichItem && this.curSeatTypeCount <= this.getChooseSeatTypeForWhichItemIndex(nowChooseSeatForWhichItem)) {
          // 选择的那一个座位类型被删除，通过默认开启第一个，关闭被删除的那一个
          // TODO 将此类型座位删除
          this.closeAllChooseSeatButOne('chooseSeatForA')
        }
      },
      getChooseSeatTypeForWhichItemIndex: function(chooseSeatForWhichItem) {
        const lastChar = chooseSeatForWhichItem.charAt(chooseSeatForWhichItem.length - 1)
        return lastChar.charCodeAt() - 65
      },
      seatChartInit() {
        var _this = this
        $(document).ready(function() {
          $('#seat-map').seatCharts({
            map: _this.seatMap,
            seats: {
              a: {
                classes: 'a-class'
              },
              b: {
                classes: 'b-class'
              },
              c: {
                classes: 'c-class'
              },
              d: {
                classes: 'd-class'
              },
              e: {
                classes: 'e-class'
              },
              f: {
                classes: 'f-class'
              },
              g: {
                classes: 'g-class'
              },
              h: {
                classes: 'h-class'
              },
              i: {
                classes: 'i-class'
              }
            },
            naming: {
              left: true,
              top: true
            },
            click: function() {
              if (this.status() === 'available') {
                return 'selected'
              } else if (this.status() === 'selected') {
                return 'available'
              } else if (this.status() === 'unavailable') {
                return 'unavailable'
              } else {
                return this.style()
              }
            }
          })
        })
      }
    },
    mounted: function() {
      this.seatChartInit()
    }
  }
</script>

<style scoped>

  .seat-label {
    height: 25px;
    width: 25px;
    margin: 10px;
  }

  .a-class {
    background-color: #B5495B;
  }
  .b-class {
    background-color: #FB966E;
  }
  .c-class {
    background-color: #FFB11B;
  }
  .d-class {
    background-color: #FBE251;
  }
  .e-class {
    background-color: #FAD689;
  }
  .f-class {
    background-color: #B5CAA0;
  }
  .g-class {
    background-color: #A5DEE4;
  }
  .h-class {
    background-color: #3A8FB7;
  }
  .i-class {
    background-color: #7B90D2;
  }
  .el-switch.seat-label-switch {
    margin-top: 10px;
  }

</style>
