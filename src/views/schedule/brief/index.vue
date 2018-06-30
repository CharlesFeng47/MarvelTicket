<template>
  <div class="brief_container" :class="$route.meta.isLike ? 'gap-small' : 'gap-large'"  @click="checkDetail">
    <div class="poster" :class="$route.meta.isLike ? 'poster-small' : 'poster-large'">
      <img :src="programBrief.posterSrc">
      <div class="count">
        <el-row v-if="!$route.meta.isLike">
          <i class="el-icon-view"></i> {{ programBrief.viewNum }}人浏览
        </el-row>
        <el-row>
          <div @click.stop="changeStar" class="like-panel">
            <!--class like 用于添加动画-->
            <span v-show="star" class="like">
              <svg-icon icon-class="heart" style="color: #FF5161;"/>
            </span>
            <span v-show="!star" class="not-like">
              <svg-icon icon-class="heart2"/>
            </span>

            <span id="favourNum">{{ programBrief.favoriteNum}}</span>人想看
          </div>
        </el-row>
      </div>
    </div>
    <div class="detail">
      <div class="show-title">
        {{ programBrief.title }}
      </div>

      <div class="message">{{ programBrief.description }}</div>

      <!--<el-tag type="info" v-if="programBrief.saleType===1">未开售</el-tag>-->
      <!--<el-tag type="warning" v-if="programBrief.saleType===2">预售</el-tag>-->
      <el-tag type="success" v-if="programBrief.saleType==='售票中'">售票中</el-tag>
      <el-tag type="danger" v-if="programBrief.saleType==='补票中'">补票中</el-tag>

      <div class="show-info1">
        <i class="el-icon-time"/><span style="font-size: 12px">{{ programBrief.time }}</span>
      </div>
      <div class="show-info2">
        <i class="el-icon-location-outline"/><span style="font-size: 12px">{{ programBrief.spot }}</span>
      </div>

      <div style="float: right;margin-top: -20px;font-size: 18px">
        <span style="color: #F2593F">￥ {{ programBrief.basePrice }}</span>&nbsp;起
      </div>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { hasStarredCurProgram } from '../../../api/program'
  import { star, cancelStar } from '../../../api/user'
  import { mapGetters } from 'vuex'

  export default {
    name: 'BriefItem',
    props: [
      'programBrief'
    ],
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    data() {
      return {
        star: false
      }
    },
    mounted: function() {
      // 初始化当前用用户是否喜欢过当前节目
      this.initMyStarOfCurProgram()
    },
    watch: {
      // 显示不同的概况时，需要重新加载是否喜欢该节目
      programBrief: {
        handler: function(newVal, oldVal) {
          this.initMyStarOfCurProgram()
        }
      }
    },
    methods: {
      // 通知父组件更新收藏信息
      changeStar() {
        if (this.token !== undefined && this.token !== '') {
          if (this.star) {
            new Promise((resolve, reject) => {
              cancelStar(this.programBrief.id, this.token).then(curMyFavoriteNum => {
                this.star = false
                resolve()
              }).catch(error => {
              })
            }).then(() => {
              this.$emit('changeFavoriteNum', this.programBrief.id, this.star)
            })
          } else {
            new Promise((resolve, reject) => {
              star(this.programBrief.id, this.token).then(curMyFavoriteNum => {
                this.star = true
                resolve()
              }).catch(error => {
              })
            }).then(() => {
              this.$emit('changeFavoriteNum', this.programBrief.id, this.star)
            })
          }
        } else {
          Message({
            message: '登录后才可以进行收藏哦～',
            type: 'error',
            duration: 5 * 1000,
            center: true,
            showClose: true
          })
        }
      },
      // 查看详情
      checkDetail: function() {
        console.log(this.programBrief)
        this.$router.push('/detail/' + this.programBrief.id)
      },
      // 获取此节目是否当前用户所喜欢
      initMyStarOfCurProgram() {
        // 查看当前已登录用户是否已经收藏过该节目
        if (this.token !== undefined && this.token !== '') {
          console.log('获取是否喜欢节目：' + this.programBrief.id)
          new Promise((resolve, reject) => {
            hasStarredCurProgram(this.programBrief.id, this.token).then(hasStarred => {
              this.star = hasStarred
              console.log('结束：' + this.programBrief.id)
              resolve()
            }).catch(error => {
            })
          }).then(() => {
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $border-color: #f7f7f7;
  .gap-small{
    margin-bottom: 20px;
    margin-top: 30px;
  }
  .gap-large{
    margin-bottom: 40px;
    margin-top: 40px;
  }
  .brief_container {
    :hover {
      cursor: pointer;
    }
    /*width: 500px;*/
    display: table;
    border-radius: 14px;
    background-color: #fff;
    box-shadow: 0 1px 20px 0 #eee;
    border: 1px solid #eee;
    margin-left: 25px;
    .poster-small {
      img {
        height: 195px;
      }
    }
    .poster-large {
      img {
        height: 220px;
      }
    }
    .poster {
      float: left;
      width: 32%;
      margin-top: -25px;
      margin-left: -25px;
      img {
        width: 100%;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 4px 16px 0 #ccc;
      }
      .count {
        line-height: 24px;
        color: #777;
        font-size: 12px;
        position: relative;
        text-align: left;
        margin-left: 40px;
      }
      .like-panel:hover{
        color: #FF5161;
      }
      .like-panel{
        max-height: 24px;
        height: 24px;
        overflow: hidden;
      }
      @-webkit-keyframes turnLike {
        0% {
          font-size: 12px
        }
        25% {
          font-size: 15px;
        }
        50% {
          font-size: 16px;
        }
        100% {
          font-size: 12px;
        }
      }
      .like {
        -webkit-animation: turnLike 1s
      }

      @-webkit-keyframes turnDislike {
        0% {
          font-size: 12px
        }
        25% {
          font-size: 9px;
        }
        50% {
          font-size: 10px;
        }
        100% {
          font-size: 12px;
        }
      }

      .not-like {
        -webkit-animation: turnDislike 1s
      }
    }
    .detail {
      width: 68%;
      padding: 20px 12px 20px 30px;
      float: left;
      .el-row {
        margin-bottom: 10px;
      }
      .el-tag {
        border-radius: 15px;
      }
      .message {
        font-size: 12px;
        color: #aaa;
        padding: 5px 0;
        line-height: 16px;
        font-weight: 500;
        /*height: 48px;*/
        overflow: hidden;
        max-lines: 2;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;

        vertical-align: middle;
        height: 38px;
        margin-bottom: 10px;

      }
      .show-title {
        font-size: 16px;
        font-weight: 500;
        color: #331612;
        line-height: 30px;
        height: 60px;
        overflow: hidden;
        max-lines: 2;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .show-info1 {
        margin-left: 0px;
        margin-top: 20px;
        color: #F78989;
      }
      .show-info2 {
        margin-left: 0px;
        margin-top: 10px;
        color: #F78989;
      }
    }
  }
</style>
