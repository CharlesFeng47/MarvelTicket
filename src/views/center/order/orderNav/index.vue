<template>
  <div class="order-nav">
    <ul>
      <li :class="{ active: typeActives.typeActive0 }"><a @click="link('/center/manage/order', '0')">全部订单<div class="border-bottom"></div></a></li>
      <li :class="{ active: typeActives.typeActive1 }"><a @click="link('/center/manage/order', '1')">未支付<div class="border-bottom"></div></a></li>
      <li :class="{ active: typeActives.typeActive2 }"><a @click="link('/center/manage/order', '2')">已支付<div class="border-bottom"></div></a></li>
      <li :class="{ active: typeActives.typeActive3 }"><a @click="link('/center/manage/order', '3')">已取消<div class="border-bottom"></div></a></li>
      <li :class="{ active: typeActives.typeActive4 }"><a @click="link('/center/manage/order', '4')">已退款<div class="border-bottom"></div></a></li>
      <li style="display: inline-block;padding-left:100%;"></li>
    </ul>
  </div>

</template>

<script>
  export default {
    components: {},
    name: 'Order-nav',
    data() {
      return {
        typeActives: {
          typeActive0: true,
          typeActive1: false,
          typeActive2: false,
          typeActive3: false,
          typeActive4: false
        }
      }
    },
    computed: {
      type: function() {
        if (this.$route.query.type <= 4 && this.$route.query.type >= 0) {
          return this.$route.query.type
        } else {
          return '0'
        }
      }
    },
    mounted: function() {
      this.toActiveType(this.type)
    },
    watch: {
      // 根据路由参数选定当前激活的type
      type: {
        handler: function(newVal, oldVal) {
          this.toActiveType(newVal)
        }
      }
    },
    methods: {
      link: function(route, type) {
        this.$router.push(
          {
            path: route,
            query: {
              type: type
            }
          })
      },

      // 根据type激活二级导航
      toActiveType(type) {
        const _this = this
        if (type === undefined) {
          Object.keys(this.typeActives).forEach(function(key) {
            _this.typeActives[key] = false
          })
          this.typeActives.typeActive0 = true
        } else {
          Object.keys(this.typeActives).forEach(function(key) {
            if (key.charAt(key.length - 1) === type) {
              _this.typeActives[key] = true
            } else {
              _this.typeActives[key] = false
            }
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .order-nav {
    margin: 0px auto;
    /*padding-top: 40px;*/
    width: 90%;
    padding: 0 30px 26px 30px;
    border-bottom: 3px solid #EEEEEE;
    ul {
      list-style: none;
      text-align: justify;
      margin: 0;
      padding: 0;
      width: 100%;
      float: left;
      height: 62px;
      overflow: hidden;
    }
    /*li {*/

    /*list-style-type: none !important;*/
    /*}*/
    ul > li > a {
      text-decoration: none;
      font-size: 19px;
      position: relative;
      display: block;
      cursor: pointer;
    }
    ul > li {
      display: inline-block;
      color: #331612;
    }

    ul > li > a:hover {
      cursor: pointer;
      color: #f2593f;
      .border-bottom {
        display: block;
      }
    }
    .active {
      .border-bottom {
        display: block;
      }
      color: #f2593f;
      display: inline-block;
    }
    .border-bottom {
      display: none;
      position: relative;
      top: 4px;
      height: 3px;
      width: 100%;
      background-color: #f2593f;
      border-radius: 2px;
    }
  }
</style>
