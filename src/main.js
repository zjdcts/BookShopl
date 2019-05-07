import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueRouter from 'vue-router'
import Announcement from "./components/announcements/Announcement";
import Dish from "./components/dishes/Dish";
import Order from "./components/orders/Order";
import User from "./components/users/User";
import Vant from 'vant'
import 'vant/lib/index.css';
import axios from 'axios';

Vue.config.productionTip = false


Vue.use(Vant)
Vue.use(VueRouter)
Vue.prototype.$axios=axios

const routes = [
    {path: '/', component: Announcement},
    {path: '/dishes', component: Dish},
    {path: '/orders', component: Order},
    {path: '/profile', component: User},
]

const router = new VueRouter({
    routes,
    mode:"history"// (缩写) 相当于 routes: routes
})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
