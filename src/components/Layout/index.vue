<template>
  <div class="base" @click="hideSearch">
    <MyHeader/>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <div class="quick-button">
      <el-tooltip class="item" effect="light" content="回到顶部" placement="left">
        <el-button @click="backToTop"><i class="el-icon-arrow-up"></i></el-button>
      </el-tooltip>
    </div>
    <MyFooter/>
  </div>
</template>

<script>
  import MyHeader from '../../components/myHeader/index'
  import HomeLayout from '../HomeLayout/index'
  import MyFooter from '../../components/MyFooter/index'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      MyHeader,
      HomeLayout,
      MyFooter
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'show_popover'
      ])
    },
    methods: {
      backToTop() {
        $('html,body').animate({ scrollTop: 0 }, 400)
      },
      hideSearch() {
        this.$store.dispatch('HidePopover', {}).then(() => {
        }).catch(() => {
        })
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss">
  .quick-button {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border: 1px solid #f2f2f2;
    text-align: center;
    /*padding-top: 10px;*/
    /*box-sizing: border-box;*/
    background-color: #fff;
    cursor: pointer;
    font-size: 30px;
    button {
      padding: 0px;
      width: 100%;
      height: 100%;
      font-size: 30px;
      font-weight: 400;
    }
  }

  .el-tooltip__popper.is-light {
    color: #F78978;
    border: 1px solid #F78989;

  }
  .el-tooltip__popper.is-light[x-placement^=right] .popper__arrow{
    border-right-color:#F78978
  }
  .el-dropdown-menu{
    .el-dropdown-menu{
      text-align: center;
    }
  }
  .el-popper[x-placement^=right] {
    margin-left: 8px;
    margin-top: -8px;
    padding: 5px 10px 5px;
    /*border: 1px solid #F78989;*/
  }
  .el-popper[x-placement^=right]  .popper__arrow{
    /*border-right-color:#F78978*/
  }
</style>
