/**
* Created by Kirk liu on 2017/5/26.
*/
<template>
  <div class="tips" v-show="content">
    {{this.content}}
  </div>
</template>
<script>
  export default {
    computed: {
      content () {
        return this.$store.state.msg
      }
    }
  }
</script>
<style scoped>
  .tips {
    width: auto;
    padding: .22rem .2rem;
    position: fixed;
    font-size: .15rem;
    line-height: .20rem;
    top: 35%;
    left: 50%;
    color: #fff;
    border-radius: .06rem;
    text-align: center;
    background: rgba(0,0,0,0.8);
    -webkit-transform: translate(-50%, -50%);
    -webkit-transform: -webkit-translate(-50%, -50%);
    z-index: 1001;
  }
</style>
