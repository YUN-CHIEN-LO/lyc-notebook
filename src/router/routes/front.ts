import uiDemoRoutes from '@/router/routes/ui-demo';

const frontRoutes = [
  ...uiDemoRoutes,
  // 主面板
  {
    path: 'home',
    name: 'home',
    component: () => import('@/views/front/HomeView.vue'),
  },
  // 登入頁面
  {
    path: 'login',
    name: 'login',
    component: () => import('@/views/front/LoginView.vue'),
  },
];

export default frontRoutes;
