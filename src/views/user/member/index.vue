<template>
  <div>
    <h1>{{ convertRoles() }} {{ name }}，你好！</h1>

    <!--等级信息-->
    <el-row class="basic_info">
      <el-col :span="4">
        <el-col :span="12">
          <h3>目前等级</h3>
        </el-col>
        <el-col :span="5">
          <el-tag type="primary" class="basic_content">3</el-tag>
        </el-col>
      </el-col>
      <el-col :span="7">
        <el-col :span="13">
          <h3>距下一等级还差积分</h3>
        </el-col>
        <el-col :span="5">
          <el-tag type="danger" class="basic_content">2000</el-tag>
        </el-col>
      </el-col>
      <el-col :span="7">
        <el-col :span="7">
          <h3>完成比例</h3>
        </el-col>
        <el-col :offset="1" :span="10">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="72" style="margin-top: 18px">
          </el-progress>
        </el-col>
      </el-col>
      <el-col :span="2">
        <el-button type="text" round size="medium" style="margin-top: 7px" @click="checkCreditTable">查看积分等级表</el-button>
      </el-col>

      <el-dialog title="会员等级表" :visible.sync="creditTableVisible" width="500px">
        <el-table :data="creditTableData">
          <el-table-column align="center" property="level" label="等级" width="150px"></el-table-column>
          <el-table-column align="center" property="credit" label="所需积分" width="150px"></el-table-column>
          <el-table-column align="center" property="offPercent" label="折扣比例" width="150px"></el-table-column>
        </el-table>
      </el-dialog>
    </el-row>

    <!--积分信息-->
    <el-row class="basic_info">
      <el-col :span="5">
        <el-col :span="12">
          <h3>目前总积分</h3>
        </el-col>
        <el-col :span="5">
          <el-tag type="primary" class="basic_content">1000</el-tag>
        </el-col>
      </el-col>
      <el-col :span="6">
        <el-col :span="12">
          <h3>目前剩余积分</h3>
        </el-col>
        <el-col :span="5">
          <el-tag type="primary" class="basic_content">200</el-tag>
        </el-col>
      </el-col>
    </el-row>

    <!--优惠券信息-->
    <el-row>
      <el-col :span="12">
        <el-row class="basic_info">
          <h3>我的优惠券</h3>
        </el-row>
        <el-row class="basic_info" type="flex" justify="space-around">
          <el-col :offset="2">
            <el-table :data="myCouponData" style="width: 500px" stripe>
              <el-table-column
                v-for="{ prop, label } in myCouponConfigs"
                align="center"
                :key="prop"
                :prop="prop"
                :label="label">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row class="basic_info">
          <h3>系统优惠券</h3>
        </el-row>
        <el-row class="basic_info" type="flex" justify="space-around">
          <el-col :offset="2">
            <el-table :data="systemCouponData" style="width: 500px" stripe>
              <el-table-column
                v-for="{ prop, label } in systemCouponConfigs"
                align="center"
                :key="prop"
                :prop="prop"
                :label="label">
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="convertCoupon(scope.$index, scope.row)">兑换</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { convertRoleToChinese } from '../../../utils/role_helper'

  export default {
    name: 'MemberInfo',
    computed: {
      ...mapGetters([
        'roles',
        'name'
      ])
    },
    data() {
      this.myCouponConfigs = [
        { prop: 'description', label: '描述' },
        { prop: 'offPrice', label: '减免价格' },
        { prop: 'neededCredit', label: '所需兑换积分' }

      ]

      this.systemCouponConfigs = [
        { prop: 'description', label: '描述' },
        { prop: 'offPrice', label: '减免价格' },
        { prop: 'neededCredit', label: '所需兑换积分' }

      ]

      return {
        // 会员等级表
        creditTableData: [
          { level: '1', credit: '100', offPercent: '95%' },
          { level: '2', credit: '500', offPercent: '90%' },
          { level: '3', credit: '1000', offPercent: '85%' },
          { level: '4', credit: '2000', offPercent: '80%' },
          { level: '5', credit: '4000', offPercent: '75%' },
          { level: '6', credit: '8000', offPercent: '70%' },
          { level: '7', credit: '15000', offPercent: '65%' },
          { level: '8', credit: '40000', offPercent: '60%' }
        ],
        creditTableVisible: false,

        // 优惠券数据
        myCouponData: [
          { description: 'aaa', offPrice: 100, neededCredit: 1000 },
          { description: 'aaa', offPrice: 100, neededCredit: 1000 },
          { description: 'aaa', offPrice: 100, neededCredit: 1000 },
          { description: 'aaa', offPrice: 100, neededCredit: 1000 },
          { description: 'aaa', offPrice: 100, neededCredit: 1000 }
        ],
        systemCouponData: [
          { description: 'aaa', offPrice: 100, neededCredit: 1000 }
        ]
      }
    },
    methods: {
      // 【提供给父组件中button调用】修改用户数据，跳转页面
      goToModify() {
        this.$router.push('/user_info/modify_member')
      },
      convertRoles() {
        return convertRoleToChinese(this.roles[0])
      },
      checkCreditTable() {
        this.creditTableVisible = true
      },
      convertCoupon(index, row) {
        console.log(row)
      }
    }
  }
</script>

<style scoped>
  .basic_info {
    margin: 5px;
  }

  .basic_content {
    margin-top: 12px;
  }
</style>
