<template>
  <div class="success">
    <div class="ico"></div>
    <div class="tips">需求审核中</div>
    <a @click="goHome" class="ok">回首页</a>
    <a @click="goPackageList" class="no">去逛逛套餐市场</a>
  </div>
</template>

<script>
  import '../../../../public/js/init.js'
  import '../../../../public/js/webAppApi.js'
  export default {
    name: 'banner05Success',
    methods: {
      goHome(){
        webAppApi.close()
      },
      goPackageList(){
        webAppApi.package_list()
      }
    },
    beforeRouteEnter (to, from, next) {
      document.title = '感谢';
      next();
    }
  }
</script>
<style scoped>
  body {
    background: none;
  }
</style>
<style>
  .success .ico {
    width: 1.08rem;
    height: 1.08rem;
    background: url("../../../../public/img/banner05-04.png");
    background-size: contain;
    margin: .4rem auto;
  }

  .success .ok, .success .no {
    display: block;
    width: 1.5rem;
    height: .5rem;
    color: #FFFFFF;
    font-size: .16rem;
    line-height: .5rem;
    text-align: center;
    text-decoration: none;
    position: absolute;
    background: url("../../../../public/img/banner05-05.png");
    background-size: contain;
    top: 2rem;
  }

  .success .ok {
    left: .3rem;
  }

  .success .no {
    left: 1.95rem;
  }

  .success .tips {
    font-size: .14rem;
    color: #252525;
    position: absolute;
    top: 1.48rem;
    left: 1.5rem;
  }
</style>
