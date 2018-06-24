<template>
  <div class="pagination">
    <ul v-if="!isNull">

      <template v-if="current_page==1">
        <li class="el-icon-back icon inactive-icon"></li>
      </template>
      <template v-else>
        <a @click="change(last)">
          <li class="el-icon-back icon active-icon"></li>
        </a>
      </template>
      <template v-for="page in pages">
        <li v-if="page==='…'" style="cursor: default">{{ page }}</li>
        <template v-else>
          <a v-if="current_page === page">
            <li class="active">{{ page }}</li>
          </a>
          <a v-else @click="change(page)">
            <li>{{ page }}</li>
          </a>
        </template>
      </template>
      <template v-if="current_page === max_page">
        <li class="el-icon-back icon inactive-icon" style="transform: rotate(180deg)"></li>
      </template>
      <template v-else>
        <a @click="change(next)">
          <li class="el-icon-back icon active-icon" style="transform: rotate(180deg)"></li>
        </a>
      </template>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: [
      'max_page',
      'current_page'
    ],
    data() {
      return {
        pages: [1],
        isNull: false,
        next: 0,
        last: 0
      }
    },
    watch: {
      max_page: {
        handler: function (newVal, oldVal) {
          this.initPages()
        }
      },
      current_page: {
        handler: function (newVal, oldVal) {
          this.initPages()
        }
      }
    },

    methods: {
      initPages: function () {
        this.pages = []
        var max = this.max_page
        var current = this.current_page
        this.next = current + 1;
        this.last = current - 1;
        if (max == 0) {
          this.isNull = true
        } else {
          this.isNull = false
          if (max <= 9) {
            for (var i = 1; i <= max; i++) {
              this.pages.push(i)
            }
          } else {
            this.pages.push(1)
            if (current > 5) {
              this.pages.push("…")
              if (max - current <= 4) {
                for (var i = max - 6; i <= max; i++) {
                  this.pages.push(i);
                }
              } else {
                for (var i = current - 2; i <= current + 2; i++) {
                  this.pages.push(i);
                }
                this.pages.push("…")
                this.pages.push(max)
              }
            } else {
              for (var i = 2; i <= 7; i++) {
                this.pages.push(i);
              }
              this.pages.push("…")
              this.pages.push(max)

            }
          }
        }
      },
      change: function (page) {
        $('html,body').animate({ scrollTop: 0 }, 300)
        this.$emit('changePage', page)
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .pagination {
    text-align: center;
    ul {
      margin-left: 0px;
      padding-left: 0px;
      li {
        /*float: left;*/
        margin: 0px 2px 0px 2px;
        list-style: none;
        display: inline-block;
        width: 51px;
        height: 30px;
        line-height: 30px;
        border-radius: 100px;
        background-color: #f2f2f2;
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        color: #3e4661;
        line-height: 30px;
        a {
          text-decoration: none;
          color: #000;
          cursor: pointer;
        }
      }
      .icon {
        font-weight: 700;
        font-size: 14px;
      }
      .inactive-icon {
        color: #C9C9C9
      }
      .active {
        background-color: #fd6857;
        color: white;
      }
    }
  }
</style>
