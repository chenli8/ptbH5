<template>
  <div>
    <img src="../../../public/img/banner04.png" alt="品推宝">
    <a href="javascript:;" @click="media_detail(1,'MzA3MTA1ODQ3Ng==')" class="aMedia a1"></a>
    <a href="javascript:;" @click="media_detail(1,'MzA3NjUwNjU5MQ==')" class="aMedia a2"></a>
    <a href="javascript:;" @click="media_detail(1,'MzAxMTA0ODE3Mw==')" class="aMedia a3"></a>
    <a href="javascript:;" @click="media_detail(1,'MjM5MTIzNTUxMw==')" class="aMedia a4"></a>
    <a href="javascript:;" @click="media_detail(1,'MjM5MTA2Mjk0NA==')" class="aMedia a5"></a>
    <a href="javascript:;" @click="media_detail(1,'MzA5MjA2MzgwOQ==')" class="aMedia a6"></a>

    <a href="javascript:;" @click="media_detail(2,'1670032377')" class="aMedia a7"></a>
    <a href="javascript:;" @click="media_detail(2,'1253318443')" class="aMedia a8"></a>
    <a href="javascript:;" @click="media_detail(2,'1559383255')" class="aMedia a9"></a>
    <a href="javascript:;" @click="media_detail(1,'MzA3MzY4OTcwMw==')" class="aMedia a10"></a>
    <a href="javascript:;" @click="media_detail(1,'MzAwNzQwMjMzOA==')" class="aMedia a11"></a>
    <a href="javascript:;" @click="media_detail(1,'MzAwNzM0NDgzMg==')" class="aMedia a12"></a>

    <a href="javascript:;" @click="media_detail(1,'MzA4NDEzNTMyMA==')" class="aMedia a13"></a>
    <a href="javascript:;" @click="media_detail(1,'MzA4MDcwMDAzNA==')" class="aMedia a14"></a>
    <a href="javascript:;" @click="media_detail(1,'MjM5MzA1MDgzMA==')" class="aMedia a15"></a>
    <a href="javascript:;" @click="media_detail(1,'MzAwMDAyMzY3OA==')" class="aMedia a16"></a>

    <a href="javascript:;" @click="media_detail(4,'4260435')" class="aMedia a17"></a>
    <a href="javascript:;" @click="media_detail(4,'49625384')" class="aMedia a18"></a>
    <a href="javascript:;" @click="media_detail(4,'428318800')" class="aMedia a19"></a>
    <a href="javascript:;" @click="media_detail(2,'1275017594')" class="aMedia a20"></a>
    <a href="javascript:;" @click="media_detail(2,'2150511032')" class="aMedia a21"></a>
    <a href="javascript:;" @click="media_detail(2,'1644395354')" class="aMedia a22"></a>
  </div>
</template>

<script>
  import webAppApi from '../../../public/js/webAppApi.js'
  export default {
    name: 'banner04',
    methods: {
      media_detail(type, pMid) {
        webAppApi.media_detail(type, pMid)
      }
    }
  }
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
    position: relative
  }

  img {
    width: 100%;
    border: none;
    float: left;
  }

  .aMedia {
    display: block;
    width: 100%;
    height: .6rem;
    position: absolute;
  }

  .a1 {
    top: 7.7rem
  }

  .a2 {
    top: 8.3rem
  }

  .a3 {
    top: 8.9rem
  }

  .a4 {
    top: 9.5rem
  }

  .a5 {
    top: 10.1rem
  }

  .a6 {
    top: 10.7rem
  }

  .a7 {
    top: 17.06rem
  }

  .a8 {
    top: 17.66rem
  }

  .a9 {
    top: 18.26rem
  }

  .a10 {
    top: 18.86rem
  }

  .a11 {
    top: 19.46rem
  }

  .a12 {
    top: 20.06rem
  }

  .a13 {
    top: 26.63rem
  }

  .a14 {
    top: 27.23rem
  }

  .a15 {
    top: 27.83rem
  }

  .a16 {
    top: 28.43rem
  }

  .a17 {
    top: 37.13rem
  }

  .a18 {
    top: 37.73rem
  }

  .a19 {
    top: 38.33rem
  }

  .a20 {
    top: 38.93rem
  }

  .a21 {
    top: 39.53rem
  }

  .a22 {
    top: 40.13rem
  }
</style>
