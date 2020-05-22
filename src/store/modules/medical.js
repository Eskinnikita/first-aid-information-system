import apiService from "../../services/apiService"

const route = 'medical'

export const state = {
    medicals: null
}
export const mutations = {
    SET_MEDICALS(state, medicals) {
        state.medicals = medicals
    },
    DELETE_MEDICAL(state, id) {
        const medicalIndex = state.medicals.findIndex(el => el.id === id)
        state.medicals.splice(medicalIndex, 1)
    },
}
export const actions = {
    async getMedicals({commit}) {
        commit('SET_LOADER', true)
        try {
            const res = await apiService.getAll(route)
            commit('SET_MEDICALS', res.data)
            commit('SET_LOADER', false)
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
            commit('SET_LOADER', false)
        }
    },
    async addMedical({commit}, medicalItem) {
        try {
            const res = await apiService.post(route, medicalItem)
            console.log(res)
            commit('SET_TOAST', {message: 'Медикамент успешно добавлен!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async deleteMedical({commit}, id) {
        try {
            const res = await apiService.delete(route, id)
            console.log(res)
            commit('DELETE_MEDICAL', id)
            commit('SET_TOAST', {message: 'Медикамент успешно удален!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async updateMedical({commit}, medicalItem) {
        try {
            const res = await apiService.update(route, medicalItem)
            console.log(res)
            commit('SET_TOAST', {message: 'Медикамент успешно обновлен!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    }
}