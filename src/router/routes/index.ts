import { aboutRoutes } from './about';
import { guideRoutes } from './guide';
import { homeRoutes } from './home';
import { guideVlsmRoutes } from './vlsm';

export const routes = [
  ...homeRoutes,
  ...aboutRoutes,
  ...guideRoutes,  // Should come before catch-all
  ...guideVlsmRoutes,
  // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound } // at the end
];