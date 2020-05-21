import apiService from "../../services/apiService"

export const state = {

}
export const mutations = {

}
export const actions = {
    async addNote({commit}, note) {
        try {
            const res = await apiService.addNote(note)
            console.log(res)
            commit('SET_TOAST', {message: 'Направление успешно добавлено!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    }
}