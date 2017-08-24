<template>
  <div id="LoginPn" class="loginReg">
    <section class="login_main loginPn">
      <div class="nav">
        <div><i class="ico-close"></i></div>
        <div>免密登录</div>
        <div class="button">
          <router-link to="Reg">注册</router-link>
        </div>
      </div>
      <div class="logo"></div>
      <form class="login_cntr">
        <div class="form_line cf">
          <label>手机号</label>
          <input class="phone_num" type="text" maxlength="11"
                 placeholder="请输入手机号码" v-model="phonePn">
          <i v-show="phonePn.length>0" class="btn_clear" v-on:click="phonePn = ''"></i>
        </div>
        <div class="form_line cf">
          <label>验证码</label>
          <input class="input_pwd" type="text" maxlength="4"
                 placeholder="请输入验证码" v-model="phonePnValidateCode">
          <i v-show="phonePnValidateCode.length>0" class="btn_clear code"
             v-on:click="phonePnValidateCode = ''"></i>
          <template v-if="phonePn.length>=11">
            <a class='fgtpwd on' v-on:click="getPnCode" id="getPnQr" data-id="1">｜获取动态验证码</a>
          </template>
          <template v-else>
            <a class='fgtpwd'>｜获取动态验证码</a>
          </template>
        </div>
      </form>
      <template v-if="phonePn.length>=11 && phonePnValidateCode.length>=4">
        <a class="btn_login on" v-on:click="loginPn">进入品推宝</a>
      </template>
      <template v-else>
        <a class="btn_login">进入品推宝</a>
      </template>
      <router-link to="Login" class='login_type'>账号密码登录</router-link>
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
  import Layer from '../../components/common/Layer'
  import userService from '../../service/userService'
  import utils from '../../public/js/utils'
  import weChatLogin from '../../public/js/weChatLogin.js'
  export default {
    name: 'LoginPn',
    components: {Layer},
    data () {
      return {
        phonePn: '',
        phonePnValidateCode: '',
        layerMsg: '',
        WeChatLogin: utils.isWeiXin()
      }
    },
    methods: {
      loginWeChat(){
        weChatLogin()
      },
      /*无密登录 获取验证码*/
      getPnCode(){
        var $element = $('#getPnQr');
        var id = $element.data('id');
        if (!utils.isMobile(this.phonePn)) {
          this.layerMsg = '请输入正确的手机号';
          setTimeout(()=> {
            this.layerMsg = ''
          }, 2000);
          return;
        }
        if (interval != 60) return;
        var data = {phone: this.phonePn};
        if (id == 1) {
          $element.data('id', 0);
          userService.loginWpvCode(data, (data)=> {
            secondCount($element);
          }, (data)=> {
            $element.data('id', 1);
            this.layerMsg = data.message;
            setTimeout(()=> {
              this.layerMsg = ''
            }, 2000);
          })
        }
      },
      /*无密登录*/
      loginPn(){
        if (!utils.isMobile(this.phonePn)) {
          this.layerMsg = '请输入正确的手机号';
          setTimeout(()=> {
            this.layerMsg = ''
          }, 2000);
          return;
        }
        var data = {phone: this.phonePn, code: this.phonePnValidateCode};
        userService.loginWp(data,(data)=>{
          var data = data.userInfo;
          utils.cookie.set('pintui-nickName', encodeURIComponent(data.nickName), 7);
          utils.cookie.set('pintui-headImage', data.headImage, 7);
          utils.cookie.set('pintui-token', data.token, 7);
          utils.cookie.set('pintui-userId', data.userId, 7);
          utils.goReturnUrl();
        },(data)=>{
          this.layerMsg = data.message;
          setTimeout(()=> {
            this.layerMsg = ''
          }, 2000);
        })
      }
    }
  }
  var interval = 60;
  var intervalId;
  var secondCount = ($code)=> {
    intervalId = setInterval(function () {
      if (interval > 0) {
        interval--;
        $code.text('｜验证码已发送' + interval + 's');
        $code.css('color', '#9b9b9b');
      } else {
        interval = 60;
        clearInterval(intervalId);
        $code.text('｜获取动态验证码');
        $code.css('color', '#ff3d00');
        $code.data('id', 1);
      }
    }, 1000)
  }
</script>
<style scoped>

</style>
