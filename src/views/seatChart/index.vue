<template>
  <div>
    <el-row>
      <!--左侧为座位表-->
      <el-col id="seat-region" :span="18" style="height: 600px;overflow-x: auto;overflow-y: auto">
        <div id="seat-map">
          <div class="front-indicator">Front</div>
        </div>
      </el-col>

      <!--右侧为增加删除标记座位类型-->
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
  import { mapGetters } from 'vuex'

  // 场馆座位图生成
  export default {
    name: 'SeatChart',
    props: ['seatMapControlForm'],
    computed: {
      ...mapGetters([
        'spot_seats_map',
        'cur_seat_type_count',
        'seat_names',
        'spot_seats_map_modified'
      ])
    },
    data() {
      return {
        seatRepreChar: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
        // 当前有多少种座位类型
        curSeatTypeCount: 9,

        chooseSeatForActiveColor: '#13ce66',
        chooseSeatForInactiveColor: '#ff4949',
        // 点击座位为哪种类型
        chooseSeatForWhich: {},

        // 右侧的座位名称输入框集合
        seatNames: {},

        // 座位图
        seatMap: []
      }
    },
    mounted: function() {
      var _this = this
      setTimeout(function() {
        if (!_this.spot_seats_map_modified) {
          console.log('seatChart 第一次，加载数据')
          // TODO 场馆信息修改时，获取原有值填充
          _this.resetData()
        } else {
          console.log('seatChart 已修改过数据，从store中加载数据')
          _this.fulfillStoredData()
        }
      }, 500)
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
      // 修改store
      updateStoredSpotData() {
        this.$store.dispatch('ChangeSpotSeatsMap', {
          spot_seats_map: this.seatMap,
          cur_seat_type_count: this.curSeatTypeCount,
          seat_names: this.seatNames
        }).then(() => {
        }).catch(() => {
        })
      },
      // 重置价格
      resetData() {
        this.curSeatTypeCount = 9
        this.chooseSeatForWhich = {
          chooseSeatForA: true,
          chooseSeatForB: false,
          chooseSeatForC: false,
          chooseSeatForD: false,
          chooseSeatForE: false,
          chooseSeatForF: false,
          chooseSeatForG: false,
          chooseSeatForH: false,
          chooseSeatForI: false
        }
        this.seatNames = {
          aName: 'A 类座位',
          bName: 'B 类座位',
          cName: 'C 类座位',
          dName: 'D 类座位',
          eName: 'E 类座位',
          fName: 'F 类座位',
          gName: 'G 类座位',
          hName: 'H 类座位',
          iName: 'I 类座位'
        }
        this.seatMap = [
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
          'cccccccccccccccccccccccccccccccccccccccccccccccccc',
          'dddddddddddddddddddddddddddddddddddddddddddddddddd',
          'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          'ffffffffffffffffffffffffffffffffffffffffffffffffff',
          'gggggggggggggggggggggggggggggggggggggggggggggggggg',
          'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'
        ]
        this.seatChartInit()
      },
      // 填充store里面的值
      fulfillStoredData() {
        this.curSeatTypeCount = this.cur_seat_type_count
        this.chooseSeatForWhich = {
          chooseSeatForA: true,
          chooseSeatForB: false,
          chooseSeatForC: false,
          chooseSeatForD: false,
          chooseSeatForE: false,
          chooseSeatForF: false,
          chooseSeatForG: false,
          chooseSeatForH: false,
          chooseSeatForI: false
        }
        this.seatNames = this.supplementAllSeatNames(this.seat_names, this.cur_seat_type_count)
        this.seatMap = this.spot_seats_map
        this.seatChartInit()
        this.$emit('reset', this.seatMap.length, this.seatMap[0].length)
      },
      // 将展示时只显示的我含有的seatNames补足至默认九位
      supplementAllSeatNames: function(curSeatNamesDisplayOnly, curSeatTypeCount) {
        var result = curSeatNamesDisplayOnly
        for (var i = curSeatTypeCount; i < 9; i++) {
          switch (i) {
            case 0:
              result.aName = 'A 类座位'
              break
            case 1:
              result.bName = 'B 类座位'
              break
            case 2:
              result.cName = 'C 类座位'
              break
            case 3:
              result.dName = 'D 类座位'
              break
            case 4:
              result.eName = 'E 类座位'
              break
            case 5:
              result.fName = 'F 类座位'
              break
            case 6:
              result.gName = 'G 类座位'
              break
            case 7:
              result.hName = 'H 类座位'
              break
            case 8:
              result.iName = 'I 类座位'
              break
          }
        }
        return result
      },
      closeAllChooseSeatButOne: function(chooseSeatForWhichItem) {
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

        const nowChooseSeatForWhichItem = this.getNowChooseSeatForWhichItem()
        if (nowChooseSeatForWhichItem && this.curSeatTypeCount <= this.getChooseSeatTypeForWhichItemIndex(nowChooseSeatForWhichItem)) {
          // 选择的那一个座位类型被删除，通过默认开启第一个，关闭被删除的那一个
          this.closeAllChooseSeatButOne('chooseSeatForA')
        }

        // 如果有被删除类型的座位，将此类型座位类型设为a类
        var deleteChar = this.seatRepreChar[this.curSeatTypeCount]
        console.log('deleteChar: ' + deleteChar)
        for (var i = 0; i < this.seatMap.length; i++) {
          for (var j = 0; j < this.seatMap[i].length; j++) {
            if (this.seatMap[i].charAt(j) === deleteChar) {
              this.seatMap[i] = this.replaceSpecificIndexChar(this.seatMap[i], j, 'a')
            }
          }
        }
        console.log(this.seatMap)
        this.seatChartInit()
      },
      // 用于寻找找到当前选择的座位类型，返回如 'chooseSeatForA'
      getNowChooseSeatForWhichItem() {
        var nowChooseSeatForWhichItem
        for (var item in this.chooseSeatForWhich) {
          if (this.chooseSeatForWhich[item] === true) {
            nowChooseSeatForWhichItem = item
          }
        }
        return nowChooseSeatForWhichItem
      },
      // 返回 chooseSeatForWhichItem 对应的从 0 开始的序号
      getChooseSeatTypeForWhichItemIndex: function(chooseSeatForWhichItem) {
        const lastChar = chooseSeatForWhichItem.charAt(chooseSeatForWhichItem.length - 1)
        return lastChar.charCodeAt() - 65
      },
      // 返回 chooseSeatForWhichItem 对应的表示字符
      getNowChooseSeatForWhichItemChar: function(chooseSeatForWhichItem) {
        return chooseSeatForWhichItem.charAt(chooseSeatForWhichItem.length - 1).toLowerCase()
      },
      // 替换指定位置为指定元素
      replaceSpecificIndexChar: function(str, index, newChar) {
        const curRowCharArray = str.split('')
        curRowCharArray.splice(index, 1, newChar)
        return curRowCharArray.join('')
      },
      // 父组件可从此方法调用传递的参数 seatMapControlForm 从而进行生成座位图
      initFromSeatMapControlForm() {
        // 修改map中的值
        var seatMapNew = []
        for (var i = 0; i < this.seatMapControlForm.seatRow; i++) {
          var curStr = ''
          for (var j = 0; j < this.seatMapControlForm.seatCol; j++) {
            curStr += 'a'
          }
          seatMapNew[i] = curStr
        }
        this.seatMap = seatMapNew
        // 从map进行生成
        this.seatChartInit()
      },
      seatChartInit() {
        var _this = this
        // 需要先将之前的内容给清空，不然不会重新生成
        $('#seat-region').html('<div id="seat-map">\n' +
          '          <div class="front-indicator">Front</div>\n' +
          '        </div>')
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
              const curId = this.settings.id
              const curIdParts = curId.split('_')
              const curRowIndexFromZero = parseInt(curIdParts[0]) - 1
              const curColIndexFromZero = parseInt(curIdParts[1]) - 1
              // 将此行此列此座位的代表字符设为当前所选的字符，然后重新初始化
              const nowChooseSeatForWhichItem = _this.getNowChooseSeatForWhichItem()
              var choosenChar
              if (nowChooseSeatForWhichItem) {
                // 用户有选择座位类型
                choosenChar = _this.getNowChooseSeatForWhichItemChar(nowChooseSeatForWhichItem)
              } else {
                // 用户为选择座位类型，点选座位即取消此座位
                choosenChar = '_'
              }
              _this.seatMap[curRowIndexFromZero] = _this.replaceSpecificIndexChar(_this.seatMap[curRowIndexFromZero], curColIndexFromZero, choosenChar)
              _this.seatChartInit()
            } else {
              return this.style()
            }
          }
        })
        this.addLineNumListener()
        this.addSpaceListener()
      },
      // 【整行操作】点击行号将此行全部设为一个类型
      addLineNumListener() {
        var _this = this
        $('.seatCharts-cell').filter('.seatCharts-space').click(function() {
          const innerHTML = this.innerHTML
          if (innerHTML !== '') {
            // 点击的是左侧行号
            var curRowIndexFromZero = this.innerHTML - 1

            var noSpace = true
            var allSpace = true
            for (var i = 0; i < _this.seatMap[curRowIndexFromZero].length; i++) {
              if (_this.seatMap[curRowIndexFromZero].charAt(i) === '_') {
                noSpace = false
              } else {
                allSpace = false
              }
            }

            var choosenChar
            if (noSpace && !allSpace) {
              // 无空格，全删
              choosenChar = '_'
            } else {
              // 有空格／部分空格，全补上
              const nowChooseSeatForWhichItem = _this.getNowChooseSeatForWhichItem()
              if (nowChooseSeatForWhichItem) {
                // 用户有选择座位类型
                choosenChar = _this.getNowChooseSeatForWhichItemChar(nowChooseSeatForWhichItem)
              } else {
                // 用户未选择座位类型，默认为a类
                choosenChar = 'a'
              }
            }

            let newRow = ''
            for (var j = 0; j < _this.seatMap[curRowIndexFromZero].length; j++) {
              newRow += choosenChar
            }
            _this.seatMap[curRowIndexFromZero] = newRow
            _this.seatChartInit()
          }
        })
      },
      // 【空白格操作】（补充seat-chart插件的click功能）点击空白地方将此位置加回去，并设为当前类型
      addSpaceListener() {
        var _this = this
        $('.seatCharts-cell').filter('.seatCharts-space').click(function() {
          const innerHTML = this.innerHTML
          if (innerHTML === '') {
            // 点击的是空白座位
            const idParts = this.id.split('_')
            const curRowIndexFromZero = parseInt(idParts[0]) - 1
            const curColIndexFromZero = parseInt(idParts[1]) - 1

            const nowChooseSeatForWhichItem = _this.getNowChooseSeatForWhichItem()
            var choosenChar
            if (nowChooseSeatForWhichItem) {
              // 用户有选择座位类型
              choosenChar = _this.getNowChooseSeatForWhichItemChar(nowChooseSeatForWhichItem)
            } else {
              // 用户未选择座位类型，默认为a类
              choosenChar = 'a'
            }

            _this.seatMap[curRowIndexFromZero] = _this.replaceSpecificIndexChar(_this.seatMap[curRowIndexFromZero], curColIndexFromZero, choosenChar)
            _this.seatChartInit()
          }
        })
      }
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
