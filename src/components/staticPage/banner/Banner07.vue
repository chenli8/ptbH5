<template>
  <div class="banner07" id="banner07">
    <div class="banner"></div>
    <div>
      注册：手机号注册 — 设置密码 — 完成！<br/>
      登录：手机号免密登录/密码登录/第三方登录（微信、微博、QQ）
    </div>
    <div class="tap">
      登陆后点击“我的”可切换卖家和买家功能！
    </div>
    <div class="agreementTitles">买家这么玩</div>
    <div class="items">
      1 下单（2种方式）
    </div>
    <div  class="items">
      （1）挑选服务<br/>
      — 搜索框精准搜索<br/>
      — 服务大厅分类筛选<br/>
      — 查资源库<br/>
      服务下单流程：<br/>
      挑选服务 -> 私聊详询 -> 下单购买 -> 预付/执行 -> 验收付款 -> 交易结束
    </div>
    <div  class="items">
      （2）发布需求<br/>
      点击右上角“发布需求”，支持指定供应商应答！<br/>
      需求签单流程：<br/>
      发布需求 -> 审核通过 -> 服务商应答 -> 甄选应答者 -> 签单执行（可多选） -> 验收付款 -> 交易结束
    </div>
    <div class="items">
      2 个人中心<br/>
      买家中心 — 管理需求，查看订单，界面清晰，操作便捷
    </div>
    <div class="agreementTitles">卖家这么玩</div>
    <div class="items">
      1 店铺入驻<br/>
      — 店铺入驻：在“我的”模块下，点击“我的店铺”，填报店铺信息<br/>
      — 实名认证：使用身份证件进行实名认证<br/>
      — 企业认证：使用经营许可证进行企业认证<br/>
      店铺信息、实名认证、企业认证平台将在1-3个工作日内审核完成，通过后即开店成功
    </div>
    <div class="items">
      2 两种方式接单<br/>
      （1）发布服务<br/>
      —发布服务：进入“卖家中心”，在“服务管理”下进行“创建服务” <br/>
      服务接单流程 :<br/>
      发布服务 -> 沟通接单 -> 服务执行 -> 结果提交 -> 确认收款 -> 交易结束
    </div>
    <div class="items">
      （2）应答需求<br/>
      —需求大厅：从首页进入“需求大厅”，选择需求，点击“我要应答”<br/>
      需求接单流程 :<br/>
      应答需求 -> 报价沟通 -> 等待筛选 -> 签单执行 -> 验收付款 -> 交易结束
    </div>
    <div class="items">
      3 结款提现<br/>
      —发票内容由交易双方进行协商，平台只是代付方，不参与发票环节。<br/>
      <span class="warn">*如有异议，可参考《品推宝三方协议模板》，此协议可作为三方合同签署。</span><br/>
      —平台默认“对公打款”，不处理对私打款。
    </div>
  </div>
</template>

<script>
  export default {
    name: 'banner07',
    mounted(){
      document.title = '玩转品推宝攻略'
    }
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
    width: 100%;
    overflow-x: hidden;
    padding: .1rem;
    color: #818181;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
  }
  .banner07{
    width: 100%;
    height: 100%;
    font-size: 0.14rem;
    line-height: 0.26rem;
    color:#252525;
  }
  .banner07 .agreementTitles{
    font-size: 0.2rem;
    font-weight: bold;
  }
  .banner07 .banner{
    width:100%;
    height:1.45rem;
    border:solid 1px #ccc;
    margin-bottom: 0.15rem;
  }
  .banner07 .tap{
    margin:0.25rem 0;
    color:red;
  }
  .banner07 .items{
    margin-bottom: 0.2rem;
  }
  .banner07 .warn{
    color:red;
  }
  .banner07 .banner{
    width:100%;
    height: .78rem;
    background-image: url("../../../public/img/raiders-banner.png");
    background-size: 100%;
    background-repeat: no-repeat;
  }
</style>
