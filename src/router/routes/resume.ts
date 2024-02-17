export default [
  {
    path: 'resume',
    name: 'resume',
    component: () => import('@/views/front/resume/ResumeView.vue'),
    children: [],
    meta: {
      icon: 'mdiCardAccountDetails',
    },
  },
];
