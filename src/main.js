<<<<<<< HEAD
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

createApp(App).use(router).mount('#app')
=======
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import CustomerNavBar from "./components/CustomerNavBar.vue";

createApp(App)
  .use(router)
  .component("CustomerNavBar", CustomerNavBar)
  .mount("#app");
>>>>>>> 53b592d6eaae8a6ddc2933685ab6e5c3eb73e1c7
