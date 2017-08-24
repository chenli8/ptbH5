<template>
  <div>
    <h1>a、功能调用</h1>

    <div>
      <button onclick="webAppApi.media_detail(1,'MzA3MTA1ODQ3Ng==')">媒体详情</button>
      <button
        onclick="webAppApi.article_detail(1,'http://mp.weixin.qq.com/s?__biz=MjM5NjA1NDUyMA==&mid=2656669793&idx=1&sn=e5a55d0576e2540d5ab5b4f56cdd08df#rd&type=1')">
        文章详情
      </button>
      <button onclick="webAppApi.product_detail('38091')">商品详情</button>
      <button onclick="webAppApi.user_detail('631')">用户主页</button>

    </div>

    <h1>3.6.0新增</h1>

    <div>
      <button onclick="webAppApi.new_package()">新建套餐</button>
      <button onclick="webAppApi.package_detail('25')">套餐购买页</button>
      <button onclick="webAppApi.webview('https://www.baidu.com/','百度')">网页</button>
      <button onclick="webAppApi.login()">登录</button>
      <button onclick="webAppApi.package_list()">去套餐列表</button>
      <button onclick="webAppApi.close()">关闭当前</button>
      <button onclick="webAppApi.im_admin()">联系客服</button>

    </div>

    <h1> b、信息获取</h1>

    <div>
      <button @click="getType('token')">获取TOKEN</button>
      <button @click="getType('host')">获取HOST</button>
    </div>
    <div id="appReturnValue"></div>



    <h1> layer</h1>
    <div>
      <button @click="msg">msg</button>
    </div>
    <msg></msg>

  </div>
</template>

<script>

  import '../../../public/js/init.js'
  import webAppApi from '../../../public/js/webAppApi.js'
  import { msg } from '../../common/layer/Index.vue'

  window.webAppApi = webAppApi

  export default {
    name: 'webAppApi',
    components: {msg,alert},
    methods: {
      getType (type){
        var p = new Promise(function (resolve) {
            resolve( type=='token' ?  webAppApi.token() : webAppApi.host())
        })
        p.then(function (data) {
          document.getElementById('appReturnValue').innerText = data;
        })
      },
      token(){
        var p = new Promise(function (resolve) {
          resolve(webAppApi.token())
        })
        p.then(function (data) {
          document.getElementById('appReturnValue').innerText = data;                                                  f
        })
      },
      host(){
        var p = new Promise(function (resolve) {
          resolve(webAppApi.host())
        })
        p.then(function (data) {
          document.getElementById('appReturnValue').innerText = data;
        })
      },
      msg(){
        this.$store.dispatch('msg',{msg:'hello vue'})
      }
    }
  }
</script>

<style>
  button {
    display: block;
    float: left;
    width: auto;
    height: .3rem;
    font-size: .16rem;
    margin-left: .2rem;
    margin-top: .1rem;
    background: #f7f8fa;
    border: 1px solid #d4d4d4;
    border-radius: 3px;

  }

  h1 {
    width: 100%;
    float: left;
    font-size: .16rem;
  }

  #appReturnValue {
    width: 100%;
    float: left;
    font-size: .12rem;
  }
</style>
