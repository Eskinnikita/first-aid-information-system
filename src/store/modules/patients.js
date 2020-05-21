import apiService from "../../services/apiService"

export const state = {
    patients: null,
    patient: null,
    patientToUpdate: null
}
export const mutations = {
    SET_PATIENTS(state, patients) {
        state.patients = patients
    },
    SET_PATIENT_BY_ID(state, patient) {
        state.patient = patient
    },
    ADD_PATIENT(state, patient) {
        state.patients.push(patient)
    },
    SET_EMPTY_PATIENT(state) {
        state.patient = null
    },
    SET_PATIENT_TO_UPDATE(state, patient) {
        state.patientToUpdate = patient
    },
    EMPTY_PATIENT_TO_UPDATE(state) {
        state.patientToUpdate = null
    }
}
export const actions = {
    async getPatients({commit}) {
        try {
            const res = await apiService.getAll('patients')
            commit('SET_PATIENTS', res.data)
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async getPatientById({commit}, id) {
        try {
            const res = await apiService.getById('patients', id)
            commit('SET_PATIENT_BY_ID', res.data)
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async addPatient({commit}, patient) {
        try {
            const res = await apiService.post('patients', patient)
            console.log(res)
            commit('ADD_PATIENT', patient)
            commit('SET_TOAST', {message: 'Пациент успешно добавлен!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async deletePatient({commit}, id) {
        try {
            const res = await apiService.delete('patients', id)
            console.log(res)
            commit('SET_TOAST', {message: 'Пациент успешно удален!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async getPatientToUpdate({commit}, id) {
        try {
            const res = await apiService.getById('patients', id)
            commit('SET_PATIENT_TO_UPDATE', res.data)
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    },
    async updatePatient({commit}, patient) {
        try {
            await apiService.update('patients', patient)
            commit('SET_TOAST', {message: 'Пациент успешно обновлен!', status: 'success'})
        } catch (e) {
            commit('SET_TOAST', {message: e.message, status: 'error'})
        }
    }
}
export const getters = {}