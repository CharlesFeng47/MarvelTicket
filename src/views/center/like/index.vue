<template>
  <div class="like-panel">
    <el-row :gutter="30">
      <el-col :span="6" v-for="(like,index) in likes" :key="index">
        <Item :schedule-brief="like"></Item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Item from '../../home/recommendation/line/item/Item'
  export default {
    name: 'like',
    components: {
      Item
    },
    data() {
      return {
        likes: [
          {
            posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
            name: '"绝色"莫文蔚巡回演唱会2018-上海站1',
            basePrice: 400,
            city: '上海',
            spot: '虹口足球场',
            time: '2018-06-03 19:00'
          },
          {
            posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
            name: '"绝色"莫文蔚巡回演唱会2018-上海站1',
            basePrice: 400,
            city: '上海',
            spot: '虹口足球场',
            time: '2018-06-03 19:00'
          },
          {
            posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
            name: '"绝色"莫文蔚巡回演唱会2018-上海站1',
            basePrice: 400,
            city: '上海',
            spot: '虹口足球场',
            time: '2018-06-03 19:00'
          },
          {
            posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
            name: '"绝色"莫文蔚巡回演唱会2018-上海站2',
            basePrice: 400,
            city: '上海',
            spot: '虹口足球场',
            time: '2018-06-03 19:00'
          },
          {
            posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
            name: '"绝色"莫文蔚巡回演唱会2018-上海站3',
            basePrice: 400,
            city: '上海',
            spot: '虹口足球场',
            time: '2018-06-03 19:00'
          },
          {
            posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
            name: '"绝色"莫文蔚巡回演唱会2018-上海站3',
            basePrice: 400,
            city: '上海',
            spot: '虹口足球场',
            time: '2018-06-03 19:00'
          },
          {
            posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
            name: '"绝色"莫文蔚巡回演唱会2018-上海站5',
            basePrice: 400,
            city: '上海',
            spot: '虹口足球场',
            time: '2018-06-03 19:00'
          }
        ]
      }
    },
    props: [
      'items'
    ],
    methods: {

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .like-panel {
    /*text-align: center;*/
    /*border: #EFEFEF solid 1px;*/
    padding: 30px 0 30px 0;
    margin: 30px 0 0;
  }
</style>
