import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Marketplace from "../views/Marketplace.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/Marketplace",
    name: "Marketplace",
    component: Marketplace,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
