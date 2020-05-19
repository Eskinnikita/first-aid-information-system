import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'

import store from '../store/index'


Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: ifNotAuthenticated
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
