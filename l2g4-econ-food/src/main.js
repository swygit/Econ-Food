import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/index.js";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css"; // this! Ensure you are using css-loader

// Vue Chart Kick
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

// Global variable to store the order id to diaplay
app.config.globalProperties.$orderIdDisplay = 1000;

app.use(vuetify).use(VueChartkick).use(router).mount("#app");
