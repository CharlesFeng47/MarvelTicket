<template>
  <div class="center">
    <div class="title">个人中心</div>
    <div>
      <ul>
        <li @click="manageOrder"  :class="{ active:$route.meta.manage==1}">
          订单管理
        </li>
        <li @click="manageLike" :class="{ active:$route.meta.manage==2}" >
          我的收藏
        </li>
        <li @click="manageMine" :class="{ active:$route.meta.manage==3}" >
          我的信息
        </li>


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
      },
      manageMine(){
        this.$router.push('/center/manage/message')
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
      .active{
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
