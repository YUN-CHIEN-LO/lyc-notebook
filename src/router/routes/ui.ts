export default [
  // 元件庫展示
  {
    path: 'ui',
    name: 'ui',
    component: () => import('@/views/front/ui/UiView.vue'),
    meta: {
      icon: 'mdiPuzzle',
    },
  },
];
