import request from "../helpers/request";

const URL = {
    REGISTER: '/auth/regiter',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    GET_INTO: '/auth'
}

export default {
    register({ username, password }) {
        return request(URL.REGISTER, 'POST', { username, password })
    },

    login({ username, password }) {
        return request(URL.LOGIN, 'POST', { username, password })
    },

    logout() {
        return request(URL.LOGOUT)
    },

    getInfo() {
        return request(URL.GET_INFO)
    }
}