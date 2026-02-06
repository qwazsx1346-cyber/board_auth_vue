import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '../views/SignIn.vue'
import BoardWriteMod from '@/views/BoardWriteMod.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/signup',
      component: () => import('../views/SignUp.vue'),
    },
    {
      path: '/signin',
      component: SignIn,
    },
    {
      path: '/board/write',
      component: BoardWriteMod,
    },
  ],
})

export default router
