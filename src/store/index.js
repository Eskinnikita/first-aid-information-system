import Vue from 'vue'
import Vuex from 'vuex'
import apiService from "../services/apiService"
import createPersistedState from "vuex-persistedstate";

import * as patientsStore from "./modules/patients"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user-token') || null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_EMPTY_USER(state) {
      state.user = null
    }
  },
  actions: {
    async loginUser({commit}, user) {
      try {
        const res = await apiService.login(user)
        localStorage.setItem('user', JSON.stringify(res.data[0]))
        commit('SET_USER', res.data[0])
      }
      catch(e) {
        console.log(e)
      }
    },
    async logoutUser({commit}) {
      localStorage.removeItem('user')
      commit('SET_EMPTY_USER')
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
  },
  plugins: [createPersistedState(
      {
        storage: window.sessionStorage
      }
  )],
  modules: {
    patientsStore
  }
})
