import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';
import router from '@/router';
import pinia from '@/plugins/pinia';
import i18n from '@/plugins/i18n';
import firebaseApp from '@/plugins/firebase';
import App from '@/App.vue';
import '@/styles/_lycui.scss';
import register from '@/components/global-register';

const app = createApp(App);
register(app).then(() => {
  app.use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  });
  app.use(router);
  app.use(pinia);
  app.use(i18n);

  app.mount('#app');
});
