<template>
  <div class="container">
    <ul>
      <li :class="{ active: typeActives.typeActive0 }"><a @click="link('/home')">首页<div class="border-bottom"></div></a></li>
      <li :class="{ active: typeActives.typeActive1 }"><a @click="link('/schedule', '1')">演唱会<div class="border-bottom"></div></a></li>
      <li :class="{ active: typeActives.typeActive2 }"><a @click="link('/schedule', '2')">音乐会<div class="border-bottom"></div></a></li>
      <li :class="{ active: typeActives.typeActive3 }"><a @click="link('/schedule', '3')">舞蹈芭蕾<div class="border-bottom"></div></a></li>
      <li :class="{ active: typeActives.typeActive4 }"><a @click="link('/schedule', '4')">话剧歌剧<div class="border-bottom"></div></a></li>
      <li :class="{ active: typeActives.typeActive5 }"><a @click="link('/schedule', '5')">曲艺杂谈<div class="border-bottom"></div></a></li>
      <li :class="{ active: typeActives.typeActive6 }"><a @click="link('/schedule', '6')">体育赛事<div class="border-bottom"></div></a></li>
      <li :class="{ active: typeActives.typeActive7 }"><a @click="link('/schedule', '7')">儿童亲子<div class="border-bottom"></div></a></li>
      <li :class="{ active: typeActives.typeActive8 }"><a @click="link('/schedule', '8')">展览休闲<div class="border-bottom"></div></a></li>
      <li style="display: inline-block;padding-left:100%;"></li>
    </ul>
  </div>

</template>

<script>
  export default {
    components: {},
    name: 'navigate',
    data() {
      return {
        typeActives: {
          typeActive0: true,
          typeActive1: false,
          typeActive2: false,
          typeActive3: false,
          typeActive4: false,
          typeActive5: false,
          typeActive6: false,
          typeActive7: false,
          typeActive8: false
        }
      }
    },
    computed: {
      type: function () {
        return this.$route.query.type
      }
    },
    mounted: function () {
      this.toActiveType(this.type)
    },
    watch: {
      // 根据路由参数选定当前激活的type
      type: {
        handler: function (newVal, oldVal) {
          this.toActiveType(newVal)
        }
      }
    },
    methods: {
      link: function (route, type) {
        this.$router.push(
          {
            path: route,
            query: {
              type: type,
              isHome: false,
              isSearch: false
            }
          })
      },

      // 根据type激活二级导航
      toActiveType(type) {
        let _this = this
        if (type === undefined) {
          Object.keys(this.typeActives).forEach(function(key){
            _this.typeActives[key] = false
          })
          this.typeActives.typeActive0 = true
        } else {
          Object.keys(this.typeActives).forEach(function(key){
            if (key.charAt(key.length - 1) === type) {
              _this.typeActives[key] = true
            } else {
              _this.typeActives[key] = false
            }
          })
        }
        // console.log('-------------')
        // Object.keys(this.typeActives).forEach(function(key){
        //   console.log(_this.typeActives[key])
        // });
        // console.log('-------------')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    margin: 0px auto;
    padding-top: 40px;
    padding-bottom: 20px;
    width: 100%;
  }

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
    height: 4px;
    width: 100%;
    background-color: #f2593f;
    border-radius: 2px;
  }

</style>
