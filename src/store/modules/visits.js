import apiService from "../../services/apiService"

const route = 'visits'

export const state = {
    visit: null,
    visitToUpdate: null,
    backStatus: null
}

export const mutations = {
    SET_STATUS() {
        console.log('success')
    },
    SET_VISIT(state, visit) {
        state.visit = visit
    },
    SET_VISITS(state, visits) {
        state.visits = visits
    },
    SET_EMPTY_VISIT(state) {
        state.visit = null
    },
    SET_VISIT_TO_UPDATE(state, visit) {
        state.visitToUpdate = visit
    },
    SET_EMPTY_VISIT_TO_UPDATE(state) {
        state.visitToUpdate = null
    },
    SET_BACK_STATUS(state, status) {
        state.backStatus = status
    },
    DELETE_NOTE(state, id) {
        const noteIndex = state.visit.notes.findIndex(el => el.id === id)
        state.visit.notes.splice(noteIndex, 1)
    }
}
export const actions = {
    async getVisits({commit}) {
        commit('SET_LOADER', true)
        try {
            const res = await apiService.getAll(route)
            console.log(res)
            commit('SET_VISITS', res.data)
            commit('SET_LOADER', false)
        }
        catch(e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
            commit('SET_LOADER', false)
        }
    },
    async addVisit({commit}, visit) {
        try {
            const res = await apiService.post(route, visit)
            console.log(res)
            commit('SET_TOAST', {message: 'Посещение успешно добавлено!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async getVisitById({commit}, id) {
        commit('SET_LOADER', true)
        try {
            const res = await apiService.getById(route, id)
            console.log(res.data)
            commit('SET_VISIT', res.data)
            commit('SET_LOADER', false)
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
            commit('SET_LOADER', false)
        }
    },
    async getVisitToUpdate({commit}, id) {
        try {
            const res = await apiService.getById(route, id)
            commit('SET_VISIT_TO_UPDATE', res.data)
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async updateVisit({commit}, visit) {
        try {
            const res = await apiService.update(route, visit)
            console.log(res)
            commit('SET_STATUS')
            commit('SET_TOAST', {message: 'Посещение успешно обновлено!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async deleteVisit({commit}, id) {
        try {
            const res = await apiService.delete(route, id)
            console.log(res)
            commit('SET_TOAST', {message: 'Посещение успешно удалено!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async deleteNote({commit}, id) {
        try {
            const res = await apiService.delete('notes', id)
            console.log(res)
            commit('DELETE_NOTE', id)
            commit('SET_TOAST', {message: 'Направление успешно удалено!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
}
export const getters = {}