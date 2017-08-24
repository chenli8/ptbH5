import Vue from 'vue'
import Router from 'vue-router'
import Banner01 from './Banner01'
import Banner02 from './Banner02'
import Banner03 from './Banner03'
import Banner04 from './Banner04'
import Banner05 from './banner05/Index.vue'
import Banner05Push from './banner05/Push.vue'
import Banner05Success from './banner05/Success.vue'
import Banner06 from './Banner06'
import Banner07 from './Banner07'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Banner01',
      component: Banner01
    },
    {
      path: '/Banner02',
      component: Banner02
    },
    {
      path: '/Banner03',
      component: Banner03
    },
    {
      path: '/Banner04',
      component: Banner04
    },
    {
      path: '/Banner05',
      component: Banner05,
    },
    {
      path: '/Banner05/Push',
      component: Banner05Push,
    },
    {
      path: '/Banner05/Success',
      component: Banner05Success,
    },
    {
      path: '/Banner06',
      component: Banner06,
    },
    {
      path: '/Banner07',
      component: Banner07,
    }
  ]
})
