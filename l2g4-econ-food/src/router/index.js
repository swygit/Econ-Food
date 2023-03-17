import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CustomerLandingTest from '../views/CustomerLandingTest.vue'

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
    path: '/CustomerLandingTest',
    name: 'CustomerLandingTest',
    component: CustomerLandingTest
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
