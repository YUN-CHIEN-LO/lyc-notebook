export default [
  {
    path: 'projects',
    name: 'projects',
    component: () => import('@/views/front/projects/ProjectsView.vue'),
    children: [],
    meta: {
      icon: 'mdiCodeBracesBox',
    },
  },
];
