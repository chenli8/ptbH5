<template>
  <div class="body">
    <div class="index">
      <div class="buyer" v-listScroll>
        <ul>
          <li v-for='item in Buyer' :key="1" @click="buyerPage(item.userId)">
            <div class="title">
              <span>买家</span> | <span>{{item.userName}}：</span>
            </div>
            <div class="cont">
              {{item.content}}
            </div>
          </li>
        </ul>
        <ul>
        </ul>
      </div>
      <div class="seller" v-listScroll2 @click="goPackageList">
        <ul>
          <li v-for='item in Seller' :key="2">
            <span>卖家</span> | <span>{{item}}</span> <span>有资源</span>
          </li>
        </ul>
        <ul>
        </ul>
      </div>
      <a class="demand" @click="myDemand"></a>
      <a class="resources" @click="myResources"></a>
    </div>
    <div class="bottom">
      创建套餐有疑问？ 请到首页联系客服
    </div>
    <Layer :layerMsg="layerMsg"></Layer>
  </div>

</template>

<script>
  import '../../../../public/js/init.js'
  import webAppApi from '../../../../public/js/webAppApi.js'
  import Layer from '../../../../components/common/Layer'
  import shopService from '../../../../service/shopService.js'
  import utils from '../../../../public/js/utils'
  export default {
    name: 'banner05',
    components: {Layer},
    data: function () {
      return {
        Buyer: [],
        Seller: [],
        layerMsg: ''
      }
    },
    directives: {
      listScroll: {
        update: function (el) {
          var speed = 50;
          var target = el;
          var child1 = target.getElementsByTagName('ul')[0];
          var child2 = target.getElementsByTagName('ul')[1];
          if (child1.childNodes.length > 3) {
            child2.innerHTML = child1.innerHTML;
            function Marquee() {
              if (child2.offsetTop - target.scrollTop <= 0)
                target.scrollTop -= child1.offsetHeight;
              else {
                target.scrollTop++;
              }
            }
            setInterval(Marquee, speed);
          }
        }
      },
      /*不知道为什么 调用同一个指令 buyer会绑定两次*/
      listScroll2: {
        componentUpdated: function (el) {
          var speed = 50;
          var target = el;
          var child1 = target.getElementsByTagName('ul')[0];
          var child2 = target.getElementsByTagName('ul')[1];
          if (child1.childNodes.length > 3) {
            child2.innerHTML = child1.innerHTML;
            function Marquee() {
              if (child2.offsetTop - target.scrollTop <= 0)
                target.scrollTop -= child1.offsetHeight;
              else {
                target.scrollTop++;
              }
            }
            setInterval(Marquee, speed);
          }
        }
      },
    },
    mounted(){
    },
    created(){
      this.postPackageFeedbackList();
      this.postPackageList();
    },
    methods: {
      goPackageList(){
        webAppApi.package_list()
      },
      buyerPage(id){
        webAppApi.user_detail(id)
      },
      postPackageList(){
        var data = {
          start: 0,
          end: 100,
          sortBy: 0,
          packageType: 0
        };
        shopService.packageList(data, (data) => {
          var list = data.list;
          var Seller = Array.from(list, item => item.sellerInfo.userName);
          Seller = Array.from(new Set(Seller));
          this.Seller = Seller;
        }, (data) => {
          this.layerMsg = data.message;
          setTimeout(() => {
            this.layerMsg = ''
          }, 2000);
        })
      },
      postPackageFeedbackList(){
        shopService.commonListPackageFeedback(null, (data) => {
          this.Buyer = data;
        }, (data) => {
          this.layerMsg = data.message;
          setTimeout(() => {
            this.layerMsg = ''
          }, 2000);
        })
      },
      myFun(type){
        var tokenPromise = new Promise(function (resolve) {
          resolve(webAppApi.token())
        })
        tokenPromise.then(function (token) {
          if (token) {
            if (type == 'myDemand') {
              if(utils.cookie.get('pintui-token') != token){
                /*
                * 读取旧的cookie token 与 新从native 取回的token 对比， 如果不一致
                * 把新的token 保存到 cookie
                * 跳转后 要刷新页面，并移除监听
                * */
                utils.cookie.set('pintui-token', token, 7);
                window.location.hash = '/banner05/push';
                addEventListener("hashchange", location.reload());
                removeEventListener("hashchange")
              }else{
                window.location.hash = '/banner05/push';
              }
            } else if (type == 'myResources') {
              webAppApi.new_package();
            }
          } else {
            webAppApi.login()
          }
        })
      },
      myDemand(){
        this.myFun('myDemand')
      },
      myResources(){
        this.myFun('myResources')
      }
    },
    beforeRouteEnter (to, from, next) {
      document.title = '套餐总动员';
      next();
    }
  }
</script>
<style>
  html, body, #banner {
    height: 100%;
  }
</style>
<style scoped>
  .body {
    margin: 0;
    padding: 0;
    height: 100%;
    position: relative;
    background: url("../../../../public/img/banner05-03.png") repeat;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  .index {
    width: 3.75rem;
    height: 5.97rem;
    background: url("../../../../public/img/banner05-01.png") repeat;
    background-size: contain;
  }

  .index .buyer {
    width: 2.72rem;
    height: 2rem;
    font-size: .12rem;
    position: absolute;
    top: 1.7rem;
    left: 0.52rem;
    overflow: hidden;
  }
  .index .buyer ul{
    height: auto;
    float: left;
  }
  .index .buyer ul li {
    margin-bottom: .1rem;
    padding-bottom: .05rem;
    border-bottom: 0.01rem solid rgba(56, 33, 226, 0.34);
    line-height: .17rem;
  }

  .index .buyer ul li .title {
    color: #553DFF;
  }

  .index .buyer ul li .title span:first-child {
    color: #553DFF;
  }

  .index .buyer ul li .title span:last-child {
    color: #238ECE;
  }

  .index .buyer ul li .cont {
    margin-top: .04rem;
    height: 0.36rem;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 2.72rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
  }

  .index .seller {
    width: 2.72rem;
    height: .8rem;
    font-size: .12rem;
    position: absolute;
    top: 3.94rem;
    left: 0.52rem;
    overflow: hidden;
  }

  .index .seller ul {
    height: auto;
    float: left;
  }

  .index .seller ul li {
    float: left;
    width: 100%;
    line-height: .17rem;
    padding-bottom: .045rem;
    border-bottom: 0.01rem solid rgba(56, 33, 226, 0.34);
    margin-bottom: .1rem;
    color: #553DFF;
  }

  .index .seller ul li span:first-child {
    color: #553DFF;
  }

  .index .seller ul li span:nth-child(2) {
    color: #238ECE;
  }

  .index .seller ul li span:last-child {
    float: right;
    color: #252525;
  }

  .demand {
    display: block;
    width: 1.5rem;
    height: .5rem;
    position: absolute;
    top: 5.06rem;
    left: .3rem;
  }

  .resources {
    display: block;
    width: 1.5rem;
    height: .5rem;
    position: absolute;
    top: 5.06rem;
    left: 1.95rem;
  }

  .bottom {
    font-size: .15rem;
    text-align: center;
    background-color: #FFFFFF;
    width: 100%;
    height: .25rem;
    line-height: .25rem;
    position: absolute;
    bottom: 0
  }
</style>
