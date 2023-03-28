import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Marketplace from "../views/Marketplace.vue";
import Dashboard from "../views/Dashboard.vue";
import CustomerProfile from "../views/CustomerProfile.vue";
import MerchantProfile from "../views/MerchantProfile.vue";
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
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: ForgotPassword,
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
    //Filter by customer id (DONE)
    path: "/cart/:id",
    name: "Cart",
    component: Cart,
  },
  {
    //Filter by customer id (unsure)
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    //Filter by merchant id (DONE)
    path: "/merchant/:id",
    name: "Individual Marketplace",
    component: IndividualMarketplace,
  },
  {
    //Filter by merchant id
    path: "/dashboard:id",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/customerprofile",
    name: "CustomerProfile",
    component: CustomerProfile,
  },
  {
    path: "/merchantprofile",
    name: "MerchantProfile",
    component: MerchantProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
