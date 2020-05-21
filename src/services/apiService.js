import axios from "axios"

const apiClient = axios.create({
    baseURL:'http://localhost:8081',
    withCredentials: false,
    headers: {
        Accept:'application/json',
        'Content-Type':'application/json',
        "Access-Control-Allow-Origin": "*"
    },
    timeout: 10000
})

export default {
    login(user) {
        return apiClient.post(`/login`, user)
    },
    //patients
    getPatients() {
        return apiClient.get(`/patients`)
    },
    getPatientById(id) {
        return apiClient.get(`/patients/${id}`)
    },
    addPatient(patient) {
        return apiClient.post('/patients', patient)
    },
    deletePatient(id) {
        return apiClient.delete(`/patients/${id}`)
    },
    updatePatient(newPatient) {
        return apiClient.put('/patients', newPatient)
    },
    //visits
    getVisits() {
        return apiClient.get(`/visits`)
    },
    addVisit(visit) {
        return apiClient.post('/visits', visit)
    },
    getVisitById(id) {
        return apiClient.get(`/visits/${id}`)
    },
    updateVisit(newVisit) {
        return apiClient.put('/visits', newVisit)
    },
    deleteVisit(id) {
        return apiClient.delete(`/visits/${id}`)
    },
    //notes
    getNotesByVisitId(visitId) {
        return apiClient.get(`/notes/${visitId}`)
    },
    deleteNote(id) {
        return apiClient.delete(`/notes/${id}`)
    },
    addNote(note) {
        return apiClient.post('/notes', note)
    }
}