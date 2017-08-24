<template>
  <div class="banner06">
    <img src="../../../public/img/banner06.jpg" alt="品推宝">
    <a @click="service" class="customer-service"></a>
  </div>
</template>

<script>
  import webAppApi from '../../../public/js/webAppApi.js'
  export default {
    name: 'banner06',
    methods:{
      service(){
        var tokenPromise = new Promise(function (resolve) {
          resolve(webAppApi.token())
        })
        tokenPromise.then(function (token) {
          if(token){
            webAppApi.im_admin()
          }else{
            webAppApi.login()
          }
        })

      }
    },
    beforeRouteEnter (to, from, next) {
      document.title = '你找BUG 我送礼';
      next();
    }
  }
</script>

<style scoped>
  img {
    width: 100%;
    border: none;
    float: left;
  }
  .banner06{
    position:relative;
  }
  .customer-service{
    position: absolute;
    width: 2.24rem;
    height: 0.41rem;
    display: block;
    left: 0.75rem;
    top: 6.09rem;
  }
</style>
