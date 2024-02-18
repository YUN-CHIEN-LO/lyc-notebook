export default [
  {
    path: 'notebook',
    name: 'notebook',
    component: () => import('@/views/front/notebook/NotebookView.vue'),
    children: [],
    meta: {
      icon: 'mdiFileDocumentEdit',
    },
  },
];
