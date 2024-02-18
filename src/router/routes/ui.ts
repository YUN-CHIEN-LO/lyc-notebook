export default [
  // 元件庫展示
  {
    path: 'ui',
    name: 'ui',
    component: () => import('@/views/front/ui/UiView.vue'),
    meta: {
      icon: 'mdiPuzzle',
    },
    children: [
      {
        path: 'color',
        name: 'color',
        component: () => import('@/views/front/ui/ColorView.vue'),
        meta: {
          parent: 'ui',
          sidebar: true,
        },
      },
    ],
  },
];
