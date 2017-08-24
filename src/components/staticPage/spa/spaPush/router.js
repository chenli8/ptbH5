import Vue from 'vue'
import Router from 'vue-router'
import SpaPush01 from './SpaPush01.vue'
import SpaPush02 from './SpaPush02.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/SpaPush01',
      component: SpaPush01
    },
    {
      path: '/SpaPush02',
      component: SpaPush02
    }
  ]
})
