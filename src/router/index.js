import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Patients from "../views/Patients/Patients"
import PatientView from "../views/Patients/PatientView"
import PatientForm from "../views/Patients/PatientForm"
import Visits from "../views/Visits/Visits"
import VisitForm from "../views/Visits/VisitForm"
import VisitView from "../views/Visits/VisitView"
import Doctors from "../views/Doctors/Doctors"
import NoteForm from "../views/Notes/NoteForm"
import DoctorForm from "../views/Doctors/DoctorForm"
import Medical from "../views/Medical/Medical"
import MedicalForm from "../views/Medical/MedicalForm"

import store from '../store'


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
        name: 'Patient-Form',
        component: PatientForm,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/patient-view/:id',
        name: 'Patient-View',
        props: true,
        component: PatientView,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/visits',
        name: 'Visits',
        component: Visits,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/visit-form',
        name: 'Visit-Form',
        component: VisitForm,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/visit-view/:id',
        name: 'Visit-View',
        props: true,
        component: VisitView,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/doctors',
        name: 'Doctors',
        component: Doctors,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/doctor-form',
        name: 'DoctorForm',
        component: DoctorForm,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/note-form',
        name: 'NoteForm',
        component: NoteForm,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/medical-supplies',
        name: 'MedicalSupplies',
        component: Medical,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/medical-form',
        name: 'MedicalForm',
        component: MedicalForm,
        beforeEnter: ifAuthenticated
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
