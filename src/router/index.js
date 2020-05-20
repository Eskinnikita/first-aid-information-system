import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Patients from "../views/Patients/Patients"
import PatientView from "../views/Patients/PatientView"
import PatientForm from "../views/Patients/PatientForm"

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
    },
    {
        path: '/patients',
        name: 'Patients',
        component: Patients,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/patient-form',
        name: 'PatientForm',
        component: PatientForm,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/patient-view/:id',
        name: 'Patient-View',
        props: true,
        component: PatientView,
        beforeEnter: ifAuthenticated
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
