import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/features/home/views/HomeView.vue'

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
]
