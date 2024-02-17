import type { RouteRecordName } from 'vue-router';

const accessRoutes = [
  // 主面板
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/views/access/DashboardView.vue'),
    meta: {
      icon: 'mdiPencil',
    },
  },
  // 使用者設定
  {
    path: 'user',
    name: 'user',
    component: () => import('@/views/access/UserAccountView.vue'),
    meta: {
      icon: 'mdiUser',
    },
  },
];

/**
 * 是否為權限路由
 * @param {RouteRecordName} name - 路由名稱
 * @returns {boolean} - 是否為權限路由
 */
export function isAccessRoute(name: RouteRecordName | null | undefined) {
  return accessRoutes.some((route) => route.name === (name as string));
}

export default accessRoutes;
