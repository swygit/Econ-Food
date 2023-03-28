import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Marketplace from "../views/Marketplace.vue";
// import Profile from "../views/Profile.vue";
import IndividualMarketplace from "../views/IndividualMarketplace.vue";
import IndividualProductPage from "../views/IndividualProductPage.vue";
import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";

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
    path: "/marketplace",
    name: "marketplace",
    component: Marketplace,
  },
  {
    //Filter by item id
    path: "/IndividualProductPage",
    name: "IndividualProductPage",
    component: IndividualProductPage,
  },
  {
    //Filter by customer id
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    //Filter by merchant id
    path: "/merchant/:id",
    name: "Individual Marketplace",
    component: IndividualMarketplace,
  },
  {
    //Filter by merchant id
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
