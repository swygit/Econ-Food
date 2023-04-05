import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import AboutCustomer from "../views/AboutCustomer.vue";
import AboutMerchant from "../views/AboutMerchant.vue";

import Marketplace from "../views/Marketplace.vue";
import IndividualMarketplace from "../views/IndividualMarketplace.vue";
import IndividualProduct from "../views/IndividualProduct.vue";
import CustomerProfile from "../views/CustomerProfile.vue";
import Cart from "../views/Cart.vue";
import IndividualCart from "../views/IndividualCart.vue";
import OrderSummary from "../views/OrderSummary.vue";
import CustomerOrders from "../views/CustomerOrders.vue";
import OrderChat from "../views/OrderChat.vue";

import Dashboard from "../views/Dashboard.vue";
import AddListing from "../views/AddListing.vue";
import MerchantListings from "../views/MerchantListings.vue";
import MerchantProfile from "../views/MerchantProfile.vue";

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
    path: "/aboutCustomer",
    name: "AboutCustomer",
    component: AboutCustomer,
  },
  {
    path: "/aboutMerchant",
    name: "AboutMerchant",
    component: AboutMerchant,
  },
  {
    path: "/marketplace",
    name: "Marketplace",
    component: Marketplace,
  },
  {
    //Filter by merchant id (DONE)
    path: "/merchant/:id",
    name: "Individual Marketplace",
    component: IndividualMarketplace,
  },
  {
    //Filter by item id (DONE)
    path: "/individualproduct/:id",
    name: "IndividualProduct",
    component: IndividualProduct,
  },
  {
    //Filter by customer id (DONE)
    path: "/cart/:id",
    name: "Cart",
    component: Cart,
  },
  {
    //Filter by customer id
    path: "/individualcart/:id",
    name: "IndividualCart",
    component: IndividualCart,
  },
  {
    path: "/orders/:id",
    name: "CustomerOrders",
    component: CustomerOrders,
  },
  {
    //Filter by customer id (unsure)
    path: "/order/:id",
    name: "OrderSummary",
    component: OrderSummary,
  },
  {
    path: "/customerprofile",
    name: "CustomerProfile",
    component: CustomerProfile,
  },
  {
    //Filter by merchant id
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/merchantprofile",
    name: "MerchantProfile",
    component: MerchantProfile,
  },
  {
    path: "/addlisting",
    name: "AddListing",
    component: AddListing,
  },
  {
    path: "/merchantlistings",
    name: "MerchantListings",
    component: MerchantListings,
  },
  {
    path: "/orders/:orderId/chat",
    name: "OrderChat",
    component: OrderChat,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
