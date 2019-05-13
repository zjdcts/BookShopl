import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        orders: Array(100),
        dishList: null,
        commdityPrice: 0,
        commdityNum: 0,
        tableCount: 0,
        userId: '未登录',
        userPhoneNumber: '未登录',
        host:'http://localhost:3000',
        phoneNumber: '',
        password: ''
    },
    getters: {

    },
    mutations: {

    }
})