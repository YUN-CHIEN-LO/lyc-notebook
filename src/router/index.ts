import { createRouter, createWebHistory } from 'vue-router';
import lg from '@/plugins/local-storage';
import { StorageBool, StorageEnum } from '@/types';
import useLayoutStore from '@/stores/layout';
import useUserStore from '@/stores/user';
import { accessRoutes } from '@/router/routes/access';
import {
  FrontRoute, frontRoutes, getFrontName, getFrontPath,
} from '@/router/routes/front';
import i18n from '@/plugins/i18n';
import { isAccessRoute } from '@/router/route-helper';
import layout from '@/views/layout/LayoutView.vue';

// 路由清單
const routes = [
  {
    path: '/',
    name: 'root',
    component: layout,
    redirect: `/${getFrontPath(FrontRoute.dashboard)}`,
    children: [
      // 權限路由
      ...accessRoutes,
      // 白名單路由
      ...frontRoutes,
      // 錯誤頁面
      {
        path: 'error',
        name: 'error',
        component: () => import('@/views/ErrorPage.vue'),
      },
    ],
  },
  // 錯誤路由捕獲
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    redirect: 'error',
  },
];

// 建立路由
const router = createRouter({
  history: createWebHistory(process.env.VITE_BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const layoutStore = useLayoutStore();
  const saveTheme = lg.get(StorageEnum.THEME);
  if (!layoutStore.$state.theme) layoutStore.setTheme(Number(saveTheme) ?? 0);

  const saveLang = lg.get(StorageEnum.LANG);
  if (!layoutStore.$state.lang) layoutStore.setLang(Number(saveLang) ?? 0);

  const saveLogin = (lg.get(StorageEnum.LOGIN));
  if (saveLogin !== `${StorageBool.true}`
    && isAccessRoute(to.name)) {
    return { name: getFrontName(FrontRoute.login) };
  }

  layoutStore.setShowDrawer(false);

  const userStore = useUserStore();

  userStore.setUser();
  return true;
});

router.afterEach((to) => {
  const { name } = to;
  const documentTitle = name ? i18n.global.t(`${name as string}.title`) : 'x';
  Object.assign(document, {
    title: `${i18n.global.t('system.projectName')} | ${name as string}| ${documentTitle}`,
  });
});

export default router;

export * from '@/router/routes/access';
export * from '@/router/routes/front';
export * from '@/router/route-helper';
