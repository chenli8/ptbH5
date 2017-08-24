<template>
  <div class="cont" id="invoiceDoc">
    <div class="title">发票开具说明：</div><br>
    1.根据国家税法规定，开票内容仅支持“增值税发票”。品推宝目前仅支持开据“企业增值税发票”，暂不支持开据“个人增值税发票”，“个人增值税发票”服务功能稍后开放，如果有问题请咨询客服小蜜或致电010-85079618。<br><br>
    2.对公账户的增值税发票开具需要平台人员先进行申请方资质进行审核。<br><br>
    3.申请的发票平台会以邮寄（到付）的形式给您，请保证输入的收货地址无误。<br><br>
    4.申请的发票我们最晚会在10个工作日内寄出。<br><br>
    5.发票申请提交后无法修改，如信息有误请联系客服修改。<br><br>
  </div>
</template>

<script>
  import '../../../public/js/init.js'
  export default {
    name: 'invoiceDoc'
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
