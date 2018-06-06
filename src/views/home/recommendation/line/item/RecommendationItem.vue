<template>
  <div>
    <div class="poster_container">
      <span class="poster">
        <a href="/schedule/233">
          <img class="poster" style="display: block;" alt="项目海报"
               :src="scheduleBrief.posterSrc"/>
        </a>
        <ul class="more_info">
          <li>
            <i>{{ scheduleBrief.spot }}}</i>
          </li>
          <li>
            <i>{{ scheduleBrief.time }}</i>
          </li>
        </ul>
      </span>
      <a href="/schedule/233" class="item_title">{{ scheduleBrief.name }}</a>
      <div>
        <span>￥</span>
        <span>{{ scheduleBrief.basePrice }}</span>
        <span>起</span>
        <span style="float: right">{{ scheduleBrief.city }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  // 首页推荐的一项
  export default {
    name: 'RecommendationItem',
    props: [
      'scheduleBrief'
    ]
  }
</script>

<style scoped>
  .poster_container {
    width: 196px;
    height: 336px;
    padding: 12px 12px;
    background-color: white;
    margin-right: 25px;
    border-radius: 3px;
    box-shadow: 0 0 8px #d0d3d5;
    -webkit-box-shadow: 0 0 8px #d0d3d5;
    -moz-box-shadow: 0 0 8px #d0d3d5;
    float: inside;
    position: relative;
  }

  .poster {
    display: block;
    width: 100%;
    height: 252px;
    background-size: 100% 252px;
    margin-bottom: 10px;
    overflow: hidden;
    position: relative;
  }

  .item_title {
    font-size: 13px;
    color: #2d3a4b;
  }
</style>
