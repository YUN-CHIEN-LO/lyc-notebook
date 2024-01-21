import uiDemoRoutes from '@/router/routes/ui-demo';
import { getEnumKeyByValue } from '@/utils';

export enum FrontRoute {
  'root',
  'dashboard',
  'login'
}

export function getFrontName(key: FrontRoute): string {
  return `${getEnumKeyByValue(FrontRoute, key)}`
}

export function getFrontPath(key: FrontRoute): string {
  return getEnumKeyByValue(FrontRoute, key)
}

export const frontRoutes = [
  ...uiDemoRoutes,
  // 主面板
  {
    path: getFrontPath(FrontRoute.dashboard),
    name: getFrontName(FrontRoute.dashboard),
    component: () => import('@/views/front/DashboardView.vue'),
  },
  // 登入頁面
  {
    path: getFrontPath(FrontRoute.login),
    name: getFrontName(FrontRoute.login),
    component: () => import('@/views/LoginView.vue'),
  },
];
