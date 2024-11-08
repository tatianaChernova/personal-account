import { createRouter, createWebHistory } from 'vue-router'
import PersonalAccount from '../components/pages/PersonalAccountPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'personal-account',
      component: PersonalAccount,
    },
    
    {
      path: '/preview',
      name: 'preview',
      component: () => import('../components/pages/PreviewPage.vue'),
    },
  ],
})

export default router
