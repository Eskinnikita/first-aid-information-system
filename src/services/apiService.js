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
    }
}