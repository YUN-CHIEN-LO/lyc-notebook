export default [
  {
    path: 'tutor',
    name: 'tutor',
    component: () => import('@/views/front/tutor/TutorView.vue'),
    children: [],
    meta: {
      icon: 'mdiBookOpenVariant',
    },
  },
];
