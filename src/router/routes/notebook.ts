export default [
  {
    path: 'notebook',
    name: 'notebook',
    component: () => import('@/views/front/notebook/NotebookView.vue'),
    children: [
      {
        path: ':filename',
        name: 'notebookPage',
        component: () => import('@/views/components/MarkdownFile.vue'),
        children: [],
        meta: {
          icon: 'mdiFile',
          parent: 'notebook',
        },
      },
    ],
    meta: {
      icon: 'mdiFileDocumentEdit',
    },
  },

];
