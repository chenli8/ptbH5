<template>
  <div>
    <img src="../../../../public/img/spaPush01.png" alt="品推宝">
  </div>
</template>

<script>
export default {
  name: 'spaPush01',
  beforeRouteEnter (to, from, next) {
    document.title = '致用户';
    next();
  }
}
</script>

<style>
  body{ margin:0; padding:0}
  img{ width:100%; border:none;float: left;}
</style>
