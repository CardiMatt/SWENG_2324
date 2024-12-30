import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SalutoComponent from '@/components/SalutoComponent.vue'
import LoginComponent from '@/components/LoginComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/homeUtente',
      name: 'homeUtente',
      component: HomeView,
    },
    {
      path: '/saluto',
      name: 'saluto',
      component: SalutoComponent, 
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent, // Aggiunta della rotta per SalutoComponent
    },
  ],
})

export default router
