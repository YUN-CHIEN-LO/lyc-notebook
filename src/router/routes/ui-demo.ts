export default [
  {
    path: 'ui-demo',
    name: 'ui-demo',
    children: [
      // 色票
      {
        path: 'color',
        name: 'color',
        component: () => import('@/views/ui-demo/ColorView.vue'),
        children: [],
      },
    ],
  },
];
