import apiService from "../../services/apiService"

const route = 'doctors'
export const state = {
    doctors: null,
    doctorToUpdate: null
}
export const mutations = {
    SET_DOCTORS(state, doctors) {
        state.doctors = doctors
    },
    DELETE_DOCTOR(state, id) {
        const doctorIndex = state.doctors.findIndex(el => el.id === id)
        state.doctors.splice(doctorIndex, 1)
    },
    SET_DOCTOR_TO_UPDATE(state, doctor) {
        state.doctorToUpdate = doctor
    },
    EMPTY_DOCTOR_TO_UPDATE(state) {
        state.doctorToUpdate = null
    }
}
export const actions = {
    async getDoctors({commit}) {
        try {
            const res = await apiService.getAll(route)
            commit('SET_DOCTORS', res.data)
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async addDoctor({commit}, doctor) {
        try {
            const res = await apiService.post(route, doctor)
            console.log(res)
            commit('SET_TOAST', {message: 'Врач успешно добавлен!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async deleteDoctor({commit}, id) {
        try {
            const res = await apiService.delete(route, id)
            console.log(res)
            commit('DELETE_DOCTOR', id)
            commit('SET_TOAST', {message: 'Доктор успешно удален!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async getDoctorToUpdate({commit}, id) {
        try {
            console.log(id)
            const res = await apiService.getById(route, id)
            commit('SET_DOCTOR_TO_UPDATE', res.data)
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async updateDoctor({commit}, doctor) {
        try {
            const res = await apiService.update(route, doctor)
            console.log(res)
            commit('SET_TOAST', {message: 'Врач успешно обновлен!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    }
}