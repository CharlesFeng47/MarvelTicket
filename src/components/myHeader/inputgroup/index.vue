<template>
  <div class="search-container">
    <el-form :inline="true">
      <el-form-item class="input-block">
        <div style="position: relative">
          <el-input @input="search" @click.stop="" placeholder="搜索演出信息"></el-input>
        </div>
        <div id="search-panel" @click.stop="" v-show="show_popover">
          <ul v-show = "!isLoading">
            <div v-if="searchResults.length == 0" style="margin: 30px auto 30px;text-align: center">
              您的输入没有搜索结果
            </div>
            <li v-else v-for="result in searchResults">
              <a :href = "result.programID">
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
          <div class="onLoading" v-show = "isLoading">
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
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    name: 'input-group',
    components: {ElRow},
    data() {
      return{
        isLoading : true,
        searchResults : [],
        key : ''
      }
    },

    computed: {
      ...mapGetters([
        'show_popover',
        'getIsShow'
      ])
    },
    methods: {
      onSubmit() {
        if(this.key !== '') {
          this.$router.push({
            path: '/search',
            query: {
              key: this.key
            }
          })
        }else{
          this.$message.error("请输入演出信息")
        }
      },
      // getIsShow: {
      //   handler: function (newVal, oldVal) {
      //     alert(this.show_popover)
      //   }
      // },
      search(str){
        this.key = str
        this.searchResults=[]
        if(str!="") {
          // console.log(str)
          // this.$emit('showPanel')
          this.$store.dispatch('ShowPopover', {
          }).then(() => {
          }).catch(() => {
          })
          this.isLoading = true;
          new Promise((resolve, reject) => {
            previewSearch(str).then(response => {
              if (response.state === 'OK') {
                var recommends = JSON.parse(response.object)
                // console.log(recommends)
                for(var i =0 ;i < recommends.length;i++){
                  var result = {}

                  result.programID = '/detail/'+ recommends[i].id
                  result.startTime = recommends[i].programID.startTime.split(" ")[0]
                  result.programName = recommends[i].programName
                  // console.log(result)
                  this.searchResults.push(result)
                }
                // console.log(this.searchResults)
              }
              resolve()
            }).catch(error => {
              reject(error)
            })
          }).then(() => {
            this.isLoading = false
          }).catch(() => {
            this.isLoading = false
          })
        }else{
          this.$store.dispatch('HidePopover', {
          }).then(() => {
          }).catch(() => {
          })
        }
      },
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
          a{
            padding: 2px;
            font-size: 12px;
            .name{
              height: 26px;
              /*width: 60%;*/
              overflow: hidden;
              max-lines: 1;
              overflow:hidden;
              -webkit-line-clamp: 1;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
            }
          }
          :hover{
            background-color: #F3F5F8;
          }
        }
      }
      li>a {
        padding: 14px;
        display: block;
        color: #212329;
      }
    }
  }
</style>

