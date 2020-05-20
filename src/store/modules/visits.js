import apiService from "../../services/apiService"

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
    SET_VISIT_TO_UPDATE(state, visit) {
        state.visitToUpdate = visit
    },
    SET_EMPTY_VISIT_TO_UPDATE(state) {
        state.visitToUpdate = null
    },
    SET_BACK_STATUS(state, status) {
        state.backStatus = status
    }
}
export const actions = {
    async addVisit({commit}, visit) {
        try {
            const res = await apiService.addVisit(visit)
            console.log(res)
            commit('SET_STATUS')
        } catch (e) {
            console.log(e)
        }
    },
    async getVisitById({commit}, id) {
        try {
            const res = await apiService.getVisitById(id)
            console.log(res.data)
            commit('SET_VISIT', res.data)
        } catch (e) {
            console.log(e)
        }
    },
    async getVisitToUpdate({commit}, id) {
        try {
            const res = await apiService.getVisitById(id)
            commit('SET_VISIT_TO_UPDATE', res.data)
        } catch (e) {
            console.log(e)
        }
    },
    async updateVisit({commit}, visit) {
        try {
            const res = await apiService.updateVisit(visit)
            console.log(res)
            commit('SET_STATUS')
        } catch (e) {
            console.log(e)
        }
    },
    async deleteVisit({commit}, id) {
        try {
            const res = await apiService.deleteVisit(id)
            console.log(res)
            commit('SET_STATUS')
        } catch (e) {
            console.log(e)
        }
    }
}
export const getters = {}