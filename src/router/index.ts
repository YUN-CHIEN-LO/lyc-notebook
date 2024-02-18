import { createRouter, createWebHashHistory as createWebHistory } from 'vue-router';
import lg from '@/plugins/local-storage';
import { StorageBool, StorageEnum } from '@/types';
import useLayoutStore from '@/stores/layout';
import useUserStore from '@/stores/user';
import accessRoutes, { isAccessRoute } from '@/router/routes/access';
import frontRoutes from '@/router/routes/front';
import i18n from '@/plugins/i18n';
import layout from '@/views/layout/LayoutView.vue';

// 路由清單
const routes = [
  {
    path: '/',
    name: 'root',
    component: layout,
    redirect: '/home',
    children: [
      // 主面板
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/front/home/HomeView.vue'),
        meta: {
          icon: 'mdiHome',
        },
      },
      // 權限路由
      ...accessRoutes,
      // 白名單路由
      ...frontRoutes,
      // 登入頁面
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/front/LoginView.vue'),
        meta: {
          icon: 'mdiLogin',
        },
      },
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
    return { name: 'login' };
  }

  // const saveSidebar = lg.get(StorageEnum.SIDEBAR) === `${StorageBool.true}`;

  // layoutStore.setShowDrawer(false);
  // layoutStore.setShowSidebar(layoutStore.getIsMobile ? false : saveSidebar);

  layoutStore.setShowSidebar(!layoutStore.getIsMobile);

  const userStore = useUserStore();

  userStore.setUser();
  return true;
});

router.afterEach((to) => {
  const { name } = to;
  const documentTitle = name ? i18n.global.t(`${name as string}.title`) : 'x';
  Object.assign(document, {
    title: `${i18n.global.t('system.projectName')} | ${documentTitle}`,
  });
});

export default router;

export * from '@/router/routes/access';
export * from '@/router/routes/front';
