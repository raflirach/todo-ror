import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../components/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../components/Register.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !localStorage.access_token) next({ name: 'Login' })
  else if (to.path === '/login' && localStorage.access_token) next({ name: 'Home' })
  else next()
})

export default router
