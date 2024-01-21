import { getEnumKeyByValue } from '@/utils';

export enum AccessRoute {
  'root',
  'dashboard',
  'userAccount'
}

export function getAccessName(key: AccessRoute): string {
  return `access-${getEnumKeyByValue(AccessRoute, key)}`
}

export function getAccessPath(key: AccessRoute): string {
  return `/access-${getEnumKeyByValue(AccessRoute, key)}`
}

export const accessRoutes = [
  // 主面板
  {
    path: getAccessPath(AccessRoute.dashboard),
    name: getAccessName(AccessRoute.dashboard),
    component: () => import('@/views/access/DashboardView.vue'),
  },
  // 使用者設定
  {
    path: getAccessPath(AccessRoute.userAccount),
    name: getAccessName(AccessRoute.userAccount),
    component: () => import('@/views/access/UserAccountView.vue'),
  }
]
