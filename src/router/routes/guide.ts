import type { RouteRecordRaw } from 'vue-router';
import GuideIntroductionView from '@/features/guide/views/GuideIntroductionView.vue';
import GuideQuickstartView from '@/features/guide/views/GuideQuickstartView.vue';

export const guideRoutes: RouteRecordRaw[] = [
  {
    path: '/guide/introduction',
    name: 'guide-introduction',
    component: GuideIntroductionView,
  },
  {
    path: '/guide/quickstart',
    name: 'guide-quickstart',
    component: GuideQuickstartView,
  },
];
