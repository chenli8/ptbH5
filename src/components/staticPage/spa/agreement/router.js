import Vue from 'vue'
import Router from 'vue-router'
import ServiceAgreement from './ServiceAgreement.vue'
import UserAgreement from './UserAgreement.vue'
import DemandGuarantee from './DemandGuarantee.vue'
import ServiceGuarantee from './ServiceGuarantee.vue'
import ThirdAgreementTemplate from './ThirdAgreementTemplate.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ServiceAgreement',
      component: ServiceAgreement
    },
    {
      path: '/UserAgreement',
      component: UserAgreement
    },
    {
      path: '/DemandGuarantee',
      component: DemandGuarantee
    },
    {
      path: '/ServiceGuarantee',
      component: ServiceGuarantee
    },
    {
      path: '/ThirdAgreementTemplate',
      component: ThirdAgreementTemplate
    }
  ]
})
