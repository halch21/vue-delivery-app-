import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vendor/:id',
    name: 'Vendor',
    component: () => import('../views/Vendor.vue'),
  },
  {
    path: '/checkout',
    name: 'Order',
    component: () => import('../views/Order.vue'),
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/Registration.vue'),
  },
  {
      path: '/history',
      name: 'History',
      component: () => import('../views/OrderHistory.vue'),
  },
  {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/Admin/index.vue'),
      // children: [
      //   {
      //     path: ':id',
      //     component: () => import('../views/Admin/AdminEditItem.vue')
      //   },
      // ]
  },
  {
    path: '/admin/:id',
    name: 'EditDish',
    component: () => import('../views/Admin/AdminEditItem.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'History' && !store.getters.isAuthenticated) next({ name: 'Home' })
  else next()
})

export default router
