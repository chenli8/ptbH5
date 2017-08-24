<template>
  <div id="Login" class="loginReg">
    <section class="login_main">
      <div class="nav">
        <div><a v-on:click="ico_close"><i class="ico-close"></i></a></div>
        <div>账号密码登录</div>
        <div class="button">
          <router-link to="Reg">注册</router-link>
        </div>
      </div>
      <div class="logo"></div>
      <form class="login_cntr">
        <div class="form_line cf">
          <label>手机/邮箱</label>
          <input type="text" maxlength="30"
                 placeholder="请输入手机号码/邮箱" v-model="username">
          <i v-show="username.length>0" class="btn_clear" v-on:click="username = ''"></i>
        </div>
        <div class="form_line cf">
          <label>密码</label>
          <input class="input_pwd" type="password" maxlength="25"
                 placeholder="密码" v-model="password">
          <i v-show="password.length>0" class="btn_clear password" v-on:click="password = ''"></i>
          <router-link to="ForgotPw" class='fgtpwd on'>忘记密码</router-link>
        </div>
      </form>
      <template v-if="username.length>0 && password.length>=6">
        <a class="btn_login on" v-on:click="login">进入品推宝</a>
      </template>
      <template v-else>
        <a class="btn_login">进入品推宝</a>
      </template>
      <router-link to="LoginPn" class='login_type'>免密登录</router-link>
      <div class="login_img" v-show="WeChatLogin">
        <a v-on:click="loginWeChat">
          <div class="login_wx"><img src="../../public/img/icon_wx.png"></div>
          微信登录
        </a>
      </div>
    </section>
    <Layer :layerMsg="layerMsg"></Layer>
  </div>
</template>

<script>
  import $ from 'n-zepto'
  import userService from '../../service/userService'
  import utils from '../../public/js/utils'
  import weChatLogin from '../../public/js/weChatLogin.js'
  import Layer from '../../components/common/Layer'
  export default {
    name: 'Login',
    components: {Layer},
    data () {
      return {
        username: '',
        password: '',
        layerMsg: '',
        WeChatLogin: utils.isWeiXin()
      }
    },
    methods: {
      ico_close(){
        utils.goReturnUrl()
      },
      loginWeChat(){
        weChatLogin()
      },
      login(){
        if (!utils.isMobile(this.username) && !utils.isEmail(this.username)) {
          this.layerMsg = '请正确输入手机号或邮箱';
          setTimeout(()=> {
            this.layerMsg = ''
          }, 2000);
          return;
        }
        var data = {username: this.username, password: this.password};
        userService.login(data, (data) => {
            var data = data.userInfo;
            utils.cookie.set('pintui-nickName', encodeURIComponent(data.nickName), 7);
            utils.cookie.set('pintui-headImage', data.headImage, 7);
            utils.cookie.set('pintui-token', data.token, 7);
            utils.cookie.set('pintui-userId', data.userId, 7);
            utils.goReturnUrl();
          }, (data)=> {
            this.layerMsg = data.message;
            setTimeout(()=> {
              this.layerMsg = ''
            }, 2000)
          }
        )
      }
    }
  }
</script>
<style scoped>
</style>
