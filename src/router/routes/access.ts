import { getEnumKeyByValue } from '@/utils';

export enum AccessRoute {
  'root',
  'dashboard'
}

export function getAccessName(key: AccessRoute): string {
  return `access${getEnumKeyByValue(AccessRoute, key)}`
}

export function getAccessPath(key: AccessRoute): string {
  return getEnumKeyByValue(AccessRoute, key)
}

export const accessRoutes = [
  // 主面板
  {
    path: getAccessPath(AccessRoute.dashboard),
    name: getAccessName(AccessRoute.dashboard),
    component: () => import('@/views/access/DashboardView.vue'),
    children: [],
    meta: {
      title: 'accessDashboardView.title',
    },
  },
];
