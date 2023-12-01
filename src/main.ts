import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { VueFire, VueFireAuth } from "vuefire";

// the file we created above with `database`, `firestore` and other exports
import { firebaseApp } from "./plugins/firebase";

const app = createApp(App);
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
});

app.mount("#app");
