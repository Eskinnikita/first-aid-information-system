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
            const res = await apiService.getPatients()
            commit('SET_PATIENTS', res.data)
        } catch (e) {
            console.log(e)
        }
    },
    async getPatientById({commit}, id) {
        try {
            const res = await apiService.getPatientById(id)
            commit('SET_PATIENT_BY_ID', res.data)
        } catch (e) {
            console.log(e)
        }
    },
    async addPatient({commit}, patient) {
        try {
            const res = await apiService.addPatient(patient)
            console.log(res)
            commit('ADD_PATIENT', patient)
        } catch (e) {
            console.log(e)
        }
    },
    async deletePatient({commit}, id) {
        try {
            const res = await apiService.deletePatient(id)
            console.log(res)
            commit('SET_EMPTY_PATIENT')
        } catch (e) {
            console.log(e)
        }
    },
    async getPatientToUpdate({commit}, id) {
        try {
            const res = await apiService.getPatientById(id)
            commit('SET_PATIENT_TO_UPDATE', res.data)
        } catch (e) {
            console.log(e)
        }
    },
    async updatePatient({commit}, patient) {
        try {
            const res = await apiService.updatePatient(patient)
            console.log(res)
            commit('EMPTY_PATIENT_TO_UPDATE')
        } catch (e) {
            console.log(e)
        }
    }
}
export const getters = {}