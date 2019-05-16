import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        orders: Array,
        dishList: Array,
        commdityPrice: Number,
        commdityNum: Number,
        tableCount: Number,
        tableList: Array,
        dishCount: Number,
        userPhoneNumber: String,
        host: 'http://120.24.91.195:8000',
        phoneNumber: String,
        password: String,
        checkCode: String,
        currentUser: {
            get UserName() {
                return localStorage.getItem("currentUser_name");
            },
            get UserToken() {
                return localStorage.getItem("currentUser_token");
            },
            get Refresh() {
                return localStorage.getItem("refresh_token");
            }
        }
    },
    getters: {},
    mutations: {
        setUser(state, {user_name, user_token, refresh_token}) {
            localStorage.setItem("currentUser_name", user_name);
            localStorage.setItem("currentUser_token", user_token);
            localStorage.setItem("refresh_token", refresh_token);
        }
    }
})