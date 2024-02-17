export default [
  {
    path: 'projects',
    name: 'projects',
    component: () => import('@/views/front/projects/ProjectsView.vue'),
    meta: {
      icon: 'mdiCodeBracesBox',
    },
  },
];
