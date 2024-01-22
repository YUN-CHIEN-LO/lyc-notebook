import { createRouter, createWebHistory } from 'vue-router';
import lg from '@/plugins/local-storage';
import { StorageEnum } from '@/types';
import useLayoutStore from '@/stores/layout';
import useUserStore from '@/stores/user';
import {
  AccessRoute, accessRoutes, getAccessName, getAccessPath,
} from '@/router/routes/access';
import {
  FrontRoute, frontRoutes, getFrontName, getFrontPath,
} from '@/router/routes/front';
import i18n from '@/plugins/i18n';

const baseUrl = import.meta.env.VITE_BASE_URL;

// 路由清單
const routes = [
  {
    path: '/',
    redirect: `/${baseUrl}`,
    children: [],
  },
  {
    path: `/${baseUrl}/access`,
    name: getAccessName(AccessRoute.root),
    component: () => import('@/views/layout/LayoutView.vue'),
    redirect: `/${baseUrl}/access/${getAccessPath(AccessRoute.dashboard)}`,
    children: [
      // 權限路由
      ...accessRoutes,
    ],
  },
  {
    path: `/${baseUrl}`,
    name: getFrontName(FrontRoute.root),
    component: () => import('@/views/layout/LayoutView.vue'),
    redirect: `/${baseUrl}/${getFrontPath(FrontRoute.dashboard)}`,
    children: [
      // 白名單路由
      ...frontRoutes,
      // 錯誤頁面
      {
        path: 'error/:code?',
        name: 'Error',
        component: () => import('@/views/ErrorPage.vue'),
        meta: {
          title: 'errorPage.title',
        },
        children: [],
      },
    ],
  },
  // 錯誤路由捕獲
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    redirect: `${baseUrl}/error/404`,
    children: [],
  },
];

// 建立路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const layoutStore = useLayoutStore();
  const saveTheme = lg.get(StorageEnum.THEME);
  if (!layoutStore.$state.theme) layoutStore.setTheme(Number(saveTheme) ?? 0);

  const saveLang = lg.get(StorageEnum.LANG);
  if (!layoutStore.$state.lang) layoutStore.setLang(Number(saveLang) ?? 0);

  layoutStore.setShowDrawer(false);

  const userStore = useUserStore();
  userStore.setUser();
  next();
});

router.afterEach((to) => {
  const { title } = to.meta ?? {};
  const documentTitle = to.meta?.title ? i18n.global.t(title as string) : '';
  Object.assign(document, {
    title: `${i18n.global.t('system.projectName')} | ${documentTitle}`,
  });
});

export default router;

export * from '@/router/routes/access';
export * from '@/router/routes/front';
export * from '@/router/route-helper';
