<template>
  <div id="ForgotPw" class="loginReg">
    <div class="nav">
      <div>
        <router-link to="Login">
          <i class="ico-back"></i>
        </router-link>
      </div>
      <div>忘记密码</div>
      <div></div>
    </div>
    <section class="login_main forgotPw">
      <form class="login_cntr" style="margin-top: .1rem">
        <div class="form_line cf">
          <label>手机号</label>
          <input class="phone_num" type="text" maxlength="11"
                 placeholder="请输入手机号码" v-model="phoneForgot">
          <i v-show="phoneForgot.length>0" class="btn_clear" v-on:click="phoneForgot=''"></i>
        </div>
        <div class="form_line cf">
          <label>验证码</label>
          <input class="input_pwd" type="text" placeholder="请输入验证码" maxlength="4" v-model="phoneForgotValidateCode">
          <i v-show="phoneForgotValidateCode.length>0" class="btn_clear code"
             v-on:click="phoneForgotValidateCode=''"></i>
          <template v-if="phoneForgot.length>=11">
            <a class='fgtpwd on' v-on:click="getPhoneForgotCode" id="getPhoneForgotQr" data-id="1">｜获取动态验证码</a>
          </template>
          <template v-else>
            <a class='fgtpwd'>｜获取动态验证码</a>
          </template>
        </div>
        <div class="form_line cf">
          <label>新密码</label>
          <input type="password" placeholder="设置新密码" maxlength="25" v-model="phoneForgotPassword">
          <i v-show="phoneForgotPassword.length>0" class="btn_clear" id="phoneForgotPasswordClear"
             v-on:click="phoneForgotPassword=''"></i>
        </div>
        <template v-if="phoneForgot.length==11 && phoneForgotValidateCode.length==4 && phoneForgotPassword.length>=6">
          <a class="btn_login on" v-on:click="phoneForgotPw">进入品推宝</a>
        </template>
        <template v-else>
          <a class="btn_login">进入品推宝</a>
        </template>
      </form>
    </section>
    <Layer :layerMsg="layerMsg"></Layer>
  </div>
</template>

<script>
  import $ from 'n-zepto'
  import userService from '../../service/userService'
  import utils from '../../public/js/utils'
  import Layer from '../../components/common/Layer'
  export default {
    name: 'ForgotPw',
    components: {Layer},
    data () {
      return {
        phoneForgot: '',
        phoneForgotValidateCode: '',
        phoneForgotPassword: '',
        layerMsg: ''
      }
    },
    methods: {
      /* 忘记密码获取验证码 */
      getPhoneForgotCode () {
        var $element = $('#getPhoneForgotQr');
        var id = $element.data('id');
        if (!utils.isMobile(this.phoneForgot)) {
          this.layerMsg = '请输入正确的手机号';
          setTimeout(() => {
            this.layerMsg = ''
          }, 2000);
          return;
        }
        if (interval != 60) return;
        var data = {phone: this.phoneForgot};
        if (id == 1) {
          userService.fvCode(data, (data) => {
            secondCount($element);
          }, (data) => {
            $element.data('id', 1);
            this.layerMsg = data.message;
            setTimeout(() => {
              this.layerMsg = ''
            }, 2000);
          });
        }
      },
      /*找回密码*/
      phoneForgotPw: function () {
        if (!utils.isMobile(this.phoneForgot)) {
          this.layerMsg = '手机号码错误';
          setTimeout(() => {
            this.layerMsg = ''
          }, 2000);
          return;
        }
        var data = {
          phone: this.phoneForgot,
          validateCode: this.phoneForgotValidateCode,
          newPassword: this.phoneForgotPassword
        };
        var THIS = this;
        userService.findPassword(data, (data) => {
          userService.login({username: THIS.phoneForgot, password: THIS.phoneForgotPassword}, (data) => {
            var data = data.userInfo;
            utils.cookie.set('pintui-nickName', encodeURIComponent(data.nickName), 7);
            utils.cookie.set('pintui-headImage', data.headImage, 7);
            utils.cookie.set('pintui-token', data.token, 7);
            utils.cookie.set('pintui-userId', data.userId, 7);
            utils.goReturnUrl();
          }, (data) => {
            this.layerMsg = data.message;
            setTimeout(() => {
              this.layerMsg = ''
            }, 2000);
          })
        }, (data) => {
          this.layerMsg = data.message;
          setTimeout(() => {
            this.layerMsg = ''
          }, 2000);
        });
      }
    }
  }
  var interval = 60;
  var intervalId;
  var secondCount = ($code) => {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
