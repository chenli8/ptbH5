<template>
  <div class="cont" id="agreement">
    <router-view></router-view>
  </div>
</template>

<script>
  import '../../../../public/js/init.js'
  export default {
    name: 'agreement'
  }
</script>

<style>
  html{
    font-size: 100px;
    height:100%;
    -webkit-text-size-adjust:none;
  }
  body{
    -webkit-font-smoothing: antialiased;
    width: 3.40rem;
    overflow-x: hidden;
    padding: .15rem;
    color: #818181;
    margin: 0;
  }
  .cont{
    width: 3.40rem;
    height: 100%;
    font-size: 0.16rem;
    line-height: 0.26rem;
  }
  .cont .agreementTitle{
    font-size: 0.23rem;
    text-align:center;
  }
  .line{
    height: 0.01rem;
    background-color: #e8e8e8;
  }
  .clear{
    clear: both;
    height:auto;
  }
  .commonML{
    margin-left: 1.2rem;
  }
  .commonML2{
    margin-left:1.5rem;
  }
  .commonML3{
    margin-left: 1rem;
    overflow: hidden;
  }
  .title{
    font-size: 0.18rem;
    font-weight: bold;
    color: #0D0D0D;
  }
  .fl{
    float: left;
  }
  .title2{
    color: #171717;
  }
  .cont3{
    padding-left: .15rem;
    position: relative;
  }
  .dian{
    position: absolute;
    left:0rem
  }
</style>
