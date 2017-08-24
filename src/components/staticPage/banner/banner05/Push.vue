<template>
  <div class="push">
    <div class="textarea">
      <div class="tips">有什么需求，统统说出来吧～</div>
      <textarea maxlength="50" placeholder="这么聪明的你，一定能在50字以内描述清楚套餐需求！ : )" v-model="content"></textarea>
      <a onclick="history.go(-1)" class="no">取消</a>
      <a @click="postPush" class="ok">提交</a>
    </div>
    <Layer :layerMsg="layerMsg"></Layer>
  </div>
</template>

<script>
  import '../../../../public/js/init.js'
  import '../../../../public/js/webAppApi.js'
  import urlManager from '../../../../public/js/urlManager.js'
  import shopService from '../../../../service/shopService.js'
  import Layer from '../../../../components/common/Layer'
  import utils from '../../../../public/js/utils'
  export default {
    name: 'banner05Push',
    components: {Layer},
    data () {
      return {
        content: '',
        layerMsg: '',
      }
    },
    beforeRouteEnter (to, from, next) {
      document.title = '套餐留言板';
      next();
    },
    methods: {
      postPush(){
        var content = this.content.trim()
        if (!content) {
          this.layerMsg = '套餐需求不能为空';
          setTimeout(() => {
            this.layerMsg = ''
          }, 2000);
          return
        }
        shopService.commonPackageFeedback({content: this.content},()=>{
          window.location.hash = '/banner05/Success'
        },(data)=>{
          this.layerMsg = data.message;
          setTimeout(() => {
            this.layerMsg = ''
          }, 2000);
        })
      }
    }

  }
</script>
<style scoped>
  body {
    margin: 0;
    padding: 0;
    position: relative;
    background: url("../../../../public/img/banner05-03.png") repeat;
    background-size: 100px 200px;
  }
</style>
<style>
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  .push .textarea {
    width: 3.59rem;
    height: 1.75rem;
    background: url("../../../../public/img/banner05-02.png");
    background-size: contain;
  }

  .push .textarea .tips {
    font-size: .16rem;
    color: #252525;
    position: absolute;
    top: .35rem;
    left: 1.2rem;
  }

  .push .textarea textarea {
    font-size: .16rem;
    color: #252525;
    position: absolute;
    top: .72rem;
    left: .2rem;
    width: 3.3rem;
    height: .9rem;
    resize: none;
    border: none;
    outline: none;
    line-height: .22rem;
  }

  .push .textarea textarea::placeholder {
    font-size: 15px;
    color: #646464;
    line-height: .22rem;
  }

  .push .textarea .ok, .push .textarea .no {
    display: block;
    width: 1.5rem;
    height: .5rem;
    color: #FFFFFF;
    font-size: .16rem;
    line-height: .5rem;
    text-align: center;
    text-decoration: none;
    position: absolute;
  }

  .push .textarea .ok {
    background: url("../../../../public/img/banner05-05.png");
    background-size: contain;
    top: 2.18rem;
    left: 1.95rem;
  }

  .push .textarea .no {
    background: url("../../../../public/img/banner05-06.png");
    background-size: contain;
    top: 2.18rem;
    left: .3rem;
  }
</style>
