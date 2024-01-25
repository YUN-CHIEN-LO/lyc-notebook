import { createRouter, createWebHashHistory } from 'vue-router';
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
import { isAccessRoute } from '@/router/route-helper';

// 路由清單
const routes = [
  {
    path: '/access',
    name: getAccessName(AccessRoute.root),
    component: () => import('@/views/layout/LayoutView.vue'),
    redirect: `/access/${getAccessPath(AccessRoute.dashboard)}`,
    children: [
      // 權限路由
      ...accessRoutes,
    ],
  },
  {
    path: '/',
    name: getFrontName(FrontRoute.root),
    component: () => import('@/views/layout/LayoutView.vue'),
    redirect: `/${getFrontPath(FrontRoute.dashboard)}`,
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
    redirect: 'error/404',
    children: [],
  },
];

// 建立路由
const router = createRouter({
  history: createWebHashHistory(),
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
  if (!userStore.getIsLogin && isAccessRoute(to.name)) next(getFrontName(FrontRoute.login));

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
