import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        orders: Array(100),
        dishList: null,
        commdityPrice: 0,
        commdityNum: 0,
    },
    getters: {

    },
    mutations: {

    }
})