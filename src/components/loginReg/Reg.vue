<template>
  <div id="Reg" class="loginReg">
    <section class="login_main reg">
      <div class="nav">
        <div><i class="ico-close"></i></div>
        <div>注册</div>
        <div class="button">
          <router-link to="Login">登录</router-link>
        </div>
      </div>
      <div class="logo"></div>
      <form class="login_cntr">
        <div class="form_line cf">
          <label>手机号</label>
          <input class="input_account phone_num" type="tel" maxlength="11"
                 placeholder="请输入手机号" v-model="regPhone">
          <i v-show="regPhone.length>0" class="btn_clear" v-on:click="regPhone = ''"></i>
        </div>
        <div class="form_line regQrcode cf">
          <label>验证码</label>
          <input type="number" maxlength="4"
                 placeholder="请输入验证码" v-model="validateCode">
          <i v-show="validateCode.length>0" class="btn_clear code" v-on:click="validateCode = ''"></i>
          <template v-if="regPhone.length>=11">
            <a class='fgtpwd on' v-on:click="getCode" id="getQr" data-id="1">｜获取动态验证码</a>
          </template>
          <template v-else>
            <a class='fgtpwd'>｜获取动态验证码</a>
          </template>
        </div>
        <div class="form_line cf">
          <label>密码</label>
          <input type="password" placeholder="设置密码" maxlength="25"
                 v-model="regPassword">
          <i v-show="regPassword.length>0" class="btn_clear" v-on:click="regPassword = ''"></i>
        </div>
      </form>
      <template v-if="regPhone.length==11 && validateCode.length==4 && regPassword.length>=6">
        <a class="btn_login on" v-on:click="register">进入品推宝</a>
      </template>
      <template v-else>
        <a class="btn_login">进入品推宝</a>
      </template>
      <router-link to="Login" class='login_type'>账号密码登录</router-link>
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
    name: 'Reg',
    components: {Layer},
    data () {
      return {
        regPhone: '',
        regPassword: '',
        validateCode: '',
        layerMsg: ''
      }
    },
    methods: {
      /*注册获取验证码*/
      getCode(){
        var $element = $('#getQr');
        var id = $element.data('id');
        if (!utils.isMobile(this.regPhone)) {
          this.layerMsg = '请输入正确的手机号';
          setTimeout(()=> {
            this.layerMsg = '';
          }, 2000);
          return;
        }
        if (interval != 60) return;
        var data = {phone: this.regPhone};
        if (id == 1) {
          $element.data('id', 0);
          userService.regVCode(data, (data)=> {
            secondCount($element);
          }, (data)=> {
            $element.data('id', 1);
            this.layerMsg = data.message;
            setTimeout(()=> {
              this.layerMsg = '';
            }, 2000);
          })
        }
      },
      register: function () {
        if (!utils.isMobile(this.regPhone)) {
          tip('手机号码错误');
          return;
        }
        var data = {
          phone: this.regPhone,
          validateCode: this.validateCode,
          password: this.regPassword
        };
        userService.register(data, (data)=> {
          this.layerMsg = '注册成功';
          setTimeout(()=> {
            window.location.hash = 'login';
          }, 2000);
        }, (data)=> {
          this.layerMsg = data.message;
          setTimeout(()=> {
            this.layerMsg = '';
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
