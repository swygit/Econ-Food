import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import CustomerNavBar from "./components/CustomerNavBar.vue";

createApp(App)
  .use(router)
  .component("CustomerNavBar", CustomerNavBar)
  .mount("#app");
