<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row>
          <el-col :span="24">
            <p class="pay-time">订单超时</p>
          </el-col>
        </el-row>
        <el-row justify="space-between" type="flex" style="margin-top: 20px">
          <el-col :span="12">
            <div class="new-order">
              <div class="pay-top">订单详情</div>
              <div class="order-detail">
                <el-row>
                  <el-col :span="span">
                    <p>订单编号：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>{{ order.order_id }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>下单时间：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>{{ order.order_time }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>演出名称：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>{{ order.order_program.name }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>演出时间：</p>
                  </el-col>
                  <el-col  :span="14">
                    <p>{{ order.order_program.time }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>演出地点：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>{{ order.order_program.venue }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>订单清单：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>{{ order.order_num}}张 | 共{{ order.order_value }}元</p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="new-order">
              <div class="pay-top">支付方式</div>
              <el-row class="radio">
                <el-radio v-model="pay_mode" label="1" border><img src="../../../dist/static/img/1.png" height="30"
                                                                   width="120/></el-radio>
              </el-row>
              <el-row class="radio">
                <el-radio v-model="pay_mode" label="2" border><img src="../../../dist/static/img/2.png" height="30"
                                                                   width="120"/></el-radio>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-col>

    </el-row>
    <!--<el-row>-->
      <!--<el-col :offset="3" :span="18">-->
        <!--<el-row :gutter="60" style="margin-top: 40px">-->
          <!--<el-col :span="4">-->
            <!--<LeftNav/>-->
          <!--</el-col>-->
          <!--<el-col :span="20">-->
            <!--&lt;!&ndash;<transition name="fade">&ndash;&gt;-->
              <!--&lt;!&ndash;<keep-alive>&ndash;&gt;-->
                <!--&lt;!&ndash;<router-view></router-view>&ndash;&gt;-->
              <!--&lt;!&ndash;</keep-alive>&ndash;&gt;-->
            <!--&lt;!&ndash;</transition>&ndash;&gt;-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>

  import ElRow from "element-ui/packages/row/src/row";

  export default {
    name: 'pay',
    components: {
      ElRow

    },
    data() {
      return {
        pay_mode: '1',
        span: 5,
        order: {
          order_id: '12345678',
          order_time: '',
          order_value: 124,
          order_num: 2,
          order_program: {
            name: '小天鹅音乐节',
            time: '2018-07-15 15:00:00',
            venue: '南京博物館'
          }
        }
      }
    },
    methods: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .pay-time {
    height: 57px;
    line-height: 57px;
    padding: 0 27px;
    font-size: 17px;
    color: #2D3E4F;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
  }
  .order-detail{
    padding: 0 27px;
    font-size: 15px;
    color: #2D3E4F;
    /*border: 1px solid #e5e5e5;*/
    /*border: 1px solid #e5e5e5;*/
    /*border-radius: 3px;*/
  }
  .new-order{
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    height: 350px;
    .radio{
      margin:60px 50px;
    }
  }
  .pay-top{
    height: 48px;
    line-height: 48px;
    background-color: #fafafa;
    font-size: 19px;
    color: #FF5219;
    padding-left: 22px;
    border-bottom: 1px solid #e5e5e5;
    border-left: 3px solid #FF5219;
    border-radius: 3px;
  }
</style>
