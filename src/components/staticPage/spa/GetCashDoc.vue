<template>
  <div class="cont" id="getCashDoc">
    <div class="title">提现说明：</div><br>
    <div class="title2">1.平台代扣税</div>
    品推宝代扣代缴税功能稍后开放，如有问题请咨询客服小蜜或致电010-85079618。<br><br>
    <div class="title2">2.邮寄发票</div>
    可用余额申请提现时选择“邮寄发票”，需要您给品推宝公司开具收款发票，待品推宝公司收到真实有效发票后方可进入财务付款流程。
    <br><br>

    <div class="title2 ">3.提现多久能够审核完成</div>
    <!--<div class="cont3"></div>-->
    选择平台代扣税方式的话，系统将在3个工作日内完成审核，审核完成将会有消息提醒，也可通过“提现记录”查看审核状态。
    选择邮寄发票方式，系统将在收到您邮寄的发票后3个工作日内完成审核，审核完成将会有消息提醒，也可通过“提现记录”查看审核状态。
    <br><br>

    <div class="title2">4.提现申请审核失败是什么原因</div>
    可能由于账户风险问题或邮寄给平台的发票信息有误，届时会有平台相关工作人员和您联系。<br><br>

    <div class="title2">5.想更换提现的银行卡</div>
    因为保证资金的安全性，平台暂无法提供相关更改功能，如遇特殊情况，请致电平台客服进行相关资料提交备案后由平台负责更换。
  </div>
</template>

<script>
  import '../../../public/js/init.js'
  export default {
    name: 'getCashDoc'
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
    margin: 0;
    padding: .15rem;
    color: #818181;
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
    left:.06rem;
    top:.1rem;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: #818181;
  }
</style>
