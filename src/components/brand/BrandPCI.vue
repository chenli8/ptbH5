<template>
  <div class="brandPCI">
    <div class="t">1、什么是 PCI 指数？</div>
    <div class="d">PCI（Pintuibao Wechat Index）全称是品推宝微信指数。根据微信阅读数、点赞数等因素进行大数据分析定制的微信影响力指数。分数越高表示账号影响力越大。</div>
    <div class="t">2、什么是 PBI 指数？</div>
    <div class="d">PBI（Pintuibao Weibo Index）全称是品推宝微博指数。根据微博的粉丝数、转发数、评论数、点赞数等因素进行大数据分析定制的微博影响力指数。分数越高表示账号影响力越大。</div>
    <div class="t">3、什么是提及数？</div>
    <div class="d">提及数是媒体提及品牌的文章数量，无论文章中提及品牌多少次都记为一次提及。</div>
    <div class="t">4、数据计算周期：</div>
    <div class="s">近7天：7天前00:00-今天此时</div>
    <div class="d">（例如：若今天为2017年5月15日，则7天的数据为2017年5月9日 00:00 - 2017年5月15日 此时）</div>
    <div class="s">近30天：30天前00:00-今天此时</div>
    <div class="d">（例如：若今天为2017年5月30日，则30天的数据为2017年5月1日 00:00 - 2017年5月30日 此时）</div>
  </div>
</template>

<script>
  import '../../public/js/init.js'
  export default {
    name: 'brandPCI'
  }
</script>

<style scoped>
  .brandPCI{
    font-size: .14rem;
    padding: .16rem;
    line-height: .21rem;
  }
  .t{
    font-size: .16rem;
    font-weight: bold;
    margin:0 0 .1rem 0;
  }
  .s{
    font-size: .14rem;
    font-weight: bold;
  }
  .d{
    margin:0 0 .2rem 0;
  }
</style>
