import Vue from 'vue'
import Vuex from 'vuex'
import apiService from "../services/apiService"
import createPersistedState from "vuex-persistedstate";

import * as patientsStore from "./modules/patients"
import * as visitsStore from "./modules/visits"
import * as notesStore from "./modules/notes"
import * as doctorsStore from './modules/doctors'
import * as medicalsStore from './modules/medical'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user-token') || null,
    loadingStatus: false
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_EMPTY_USER(state) {
      state.user = null
    },
    SET_LOADER(state, status) {
      state.loadingStatus = status
    },
    SET_TOAST(state, toastInfo) {
      this._vm.$toast.open(
          {
            message: toastInfo.message,
            type: toastInfo.status
          }
      );
    }
  },
  actions: {
    async loginUser({commit}, user) {
      try {
        const res = await apiService.post('login', user)
        if(res.data[0] === undefined) {
          commit('SET_TOAST', {message: 'Ошибка входа. Проверьте ФИО или пароль', status: 'error'})
        }
        else {
          localStorage.setItem('user', JSON.stringify(res.data[0]))
          commit('SET_USER', res.data[0])
          commit('SET_TOAST', {message: 'Вход выполнен успешно!', status: 'success'})
        }
      }
      catch(e) {
        console.log(e)
        commit('SET_TOAST', {message: 'Ошибка входа', status: 'error'})
      }
    },
    async logoutUser({commit}) {
      localStorage.removeItem('user')
      commit('SET_EMPTY_USER')
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    isAdmin: state => state.user.isAdmin
  },
  plugins: [createPersistedState(
      {
        storage: window.sessionStorage
      }
  )],
  modules: {
    patientsStore,
    visitsStore,
    notesStore,
    doctorsStore,
    medicalsStore
  }
})
