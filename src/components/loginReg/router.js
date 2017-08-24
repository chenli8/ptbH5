import Vue from 'vue'
import Router from 'vue-router'
import Login from './Login'
import Reg from './Reg'
import LoginPn from './loginPn'
import ForgotPw from './ForgotPw'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Reg',
      component: Reg
    },
    {
      path: '/LoginPn',
      component: LoginPn
    },
    {
      path: '/ForgotPw',
      component: ForgotPw
    }
  ]
})
