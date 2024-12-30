import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SalutoComponent from '@/components/SalutoComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/saluto',
      name: 'saluto',
      component: SalutoComponent, // Aggiunta della rotta per SalutoComponent
    },
  ],
})

export default router
