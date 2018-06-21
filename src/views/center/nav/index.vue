<template>
  <div class="center">
    <div class="title">个人中心</div>
    <div>
      <ul>
        <template v-if="this.$route.meta.isOrder">
          <li @click="manageOrder"  class="is-active">
              订单管理
          </li>
          <li @click="manageLike" >
            我的收藏
          </li>
        </template>
        <template v-else>
          <li @click="manageOrder" >
            订单管理
          </li>
          <li @click="manageLike" class="is-active">
            我的收藏
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'left-nav',
    components: {
    },
    data() {
      return {

      }
    },
    methods: {
      manageOrder(){
        this.$router.push('/center/manage/order')

      },
      manageLike(){
        this.$router.push('/center/manage/like')
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .center {
    .title{
      text-align: center;
      font-size: 25px;
      color: #97a8be;
    }
    text-align: center;
    ul{
      text-align: center;
      border: #EFEFEF solid 1px;
      padding: 30px 0 10px 0;
      margin: 30px 0 0;
      .is-active{
        border-left: 3px solid chocolate;
      }
      li {
        padding-top: 2px;
        padding-bottom: 1px;
        display: block;
        margin-bottom: 20px;
        cursor: pointer;
        border-left: 3px solid white;
      }
      li:hover{
        border-left: 3px solid chocolate;
      }
    }
  }
</style>
