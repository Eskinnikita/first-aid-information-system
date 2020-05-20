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
        console.log('DELETEE', id)
        return apiClient.delete(`/patients/${id}`)
    }
}