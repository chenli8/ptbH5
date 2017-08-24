/**
 * Created by Kirk liu on 2017/5/26.
 */
<template>
  <div class="tips" v-show="layerMsg">
    {{this.layerMsg}}11111
  </div>
</template>
<script>
export default {
  props: ['layerMsg']
}
</script>
<style scoped>
  .tips{
    width: auto;
    padding:.22rem .2rem;
    position: fixed;
    font-size:.15rem;
    line-height: .20rem;
    top:35%;
    left:50%;
    color:#fff;
    border-radius: .06rem;
    text-align: center;
    background-color: #000;
    -webkit-transform:translate(-50%,-50%);
    -webkit-transform:-webkit-translate(-50%,-50%);
    z-index: 1001;
    opacity: 0.8;
  }
</style>
