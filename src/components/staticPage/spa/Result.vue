<template>
  <div class="result">
    <header class='result_header'>
      <img src="../../../public/img/success.png" alt="" >
      <p class="result_tip result_tip_size">收藏成功</p>
      <p class="result_tip result_tip_size"></p>
    </header>
    <div class="result_dl">
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.shvnya.ptb" class='btn3'>下载品推宝APP</a>
      <p>体验完整功能</p>
    </div>
  </div>
</template>

<script>
  import init from '../../../public/js/init.js'
  import utils from '../../../public/js/utils'
  import  '../../../public/css/vendors.css'

export default {
  name: 'result',
  mounted(){
    if(utils.urlParam('group')){
      document.getElementsByClassName('result_tip')[0].innerHTML ='已关注';
      document.getElementsByClassName('result_tip')[1].innerHTML ='请在APP中【我的】—【关注】中查看';
    }
  }
}

</script>

<style>
</style>
