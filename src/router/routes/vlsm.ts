import type { RouteRecordRaw } from 'vue-router';

export const guideVlsmRoutes: RouteRecordRaw[] = [
  {
    path: '/guide/vlsm/introduction',
    name: 'introduction',
    component: () => import('@/features/vlsm/views/IntroductionView.vue'),
  },
  {
    path: '/guide/vlsm/quickstart',
    name: 'quickstart',
    component: () => import('@/features/vlsm/views/QuickstartView.vue'),
  },
  {
    path: '/guide/vlsm/visualization',
    name: 'visualization',
    component: () => import('@/features/vlsm/views/VisualizationView.vue'),
  },
];
