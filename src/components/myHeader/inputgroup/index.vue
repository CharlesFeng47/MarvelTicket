<template>
  <div class="search-container">
    <el-form :inline="true">
      <el-form-item class="input-block">
        <div style="position: relative">
          <el-input @input="search" v-bind="key" placeholder="搜索演出信息"></el-input>
        </div>
        <div id="search-panel" v-show="show_popover">
          <ul v-show="!searchIsLoading">
            <template v-if="searchResults.length === 0">
              <el-row>
                <el-col :span="10" style="text-align: right">
                  <img  src="../../../assets/sad.png" style="margin-top: 20px;margin-bottom: 10px" height="50" width="50"/>
                </el-col>
                <el-col :span="13" :offset="1" style="text-align: left">
                  <div style="display: inline-block;margin-top: 25px">  无搜索结果</div>
                </el-col>
              </el-row>
            </template>
            <li v-else v-for="result in searchResults">
              <a :href="result.programLink">
                <el-row>
                  <el-col :span="17">
                    <span class="name">{{ result.programName }}</span>
                  </el-col>
                  <el-col :offset="1" :span="6" style="text-align: right">
                    <span class="time">{{ result.startTime }}</span>
                  </el-col>
                </el-row>
              </a>
            </li>
          </ul>
          <div class="onLoading" v-show="searchIsLoading">
            <i class="el-icon-loading"></i>
          </div>
        </div>
      </el-form-item>
      <el-form-item class="button-block">
        <el-button type="danger" @click="onSubmit"><i class="el-icon-search"></i>&nbsp;查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { previewSearch } from '../../../api/program'
  import { Message } from 'element-ui'
  export default {
    name: 'input-group',
    data() {
      return {
        searchIsLoading: true,

        // 搜索的关键词
        key: '',
        // 搜索结果
        searchResults: []
      }
    },

    computed: {
      ...mapGetters([
        'show_popover'
      ])
    },
    methods: {
      onSubmit() {
        if (this.key !== '') {
          this.$router.push({
            path: '/search',
            query: {
              key: this.key,
              isHome: false,
              isSearch: true
            }
          })
        } else {
          Message({
            message: '请输入节目信息！',
            type: 'error',
            duration: 1000,
            center: true,
            showClose: true
          })
        }
      },
      // show_popover: {
      //   handler: function (newVal, oldVal) {
      //     alert(this.show_popover)
      //   }
      // },
      search(str) {
        this.key = str.trim()
        // alert(str.trim())
        this.searchResults = []
        if (str.trim() !== '') {
          // console.log(str)
          // this.$emit('showPanel')
          this.searchIsLoading = true
          new Promise((resolve, reject) => {
            previewSearch(str).then(recommends => {
              // console.log(recommends)
              for (var i = 0; i < recommends.length; i++) {
                var result = {}
                result.programLink = '/detail/' + recommends[i].id
                result.startTime = recommends[i].programID.startTime.split(' ')[0]
                result.programName = recommends[i].programName
                // console.log(result)
                this.searchResults.push(result)
              }
              // console.log(this.searchResults)
              resolve()
            }).catch(error => {
              reject(error)
            })
          }).then(() => {
            this.searchIsLoading = false
            this.$store.dispatch('ShowPopover').then()
          }).catch(() => {
            this.searchIsLoading = false
          })
        } else {
          this.$store.dispatch('HidePopover').then()
        }
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .search-container {
    background-color: #F2F2F2;
    border-radius: 20px;
    height: 40px;
    .input-block {
      width: 78%;
      margin: 0px;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: #757575;
      padding-left: 10px;
      margin-left: 15px;
      width: 100%;
      padding-right: 0px;
    }
    .el-form-item__content {
      width: 100%;
    }
    .el-input {
      width: 100%;
    }
    .button-block {
      width: 20%;
      margin: 0px;
      button {
        width: 100%;
        margin-top: 4px;
        margin-bottom: 3px;
        border-radius: 16px;
        height: 32px;
        padding-top: 9px;
      }
    }
    #search-panel {
      position: absolute;
      border: solid #EEEEEE 1px;
      width: 120%;
      margin-left: 4%;
      background-color: white;
      z-index: 1000;
      .onLoading {
        width: 100%;
        text-align: center;
        height: 100px;
        font-size: 40px;
        line-height: 100px;
        i {
          color: #F78989
        }
      }
      ul {
        padding: 0px;
        margin: 5px 0px 5px;
        li {
          list-style-type: none !important;
          line-height: 26px;
          a {
            padding: 2px;
            font-size: 12px;
            .name {
              height: 26px;
              /*width: 60%;*/
              overflow: hidden;
              max-lines: 1;
              overflow: hidden;
              -webkit-line-clamp: 1;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
            }
          }
          :hover {
            background-color: #F3F5F8;
          }
        }
      }
      li > a {
        padding: 14px;
        display: block;
        color: #212329;
      }
    }
  }
</style>

