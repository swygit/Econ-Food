import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import AboutCustomer from '../views/AboutCustomer.vue'
import AboutMerchant from '../views/AboutMerchant.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/aboutCustomer',
    name: 'AboutCustomer',
    component: AboutCustomer
  },
  {
    path: '/aboutMerchant',
    name: 'AboutMerchant',
    component: AboutMerchant
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
