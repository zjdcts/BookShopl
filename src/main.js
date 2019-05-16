import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vant from 'vant'
import 'vant/lib/index.css';
import axios from 'axios';
import {store} from './store/store'

import './assets/IconFont/iconfont'
import './assets/IconFont/iconfont.css'

import Announcement from "./components/announcements/Announcement";
import Dish from "./components/dishes/Dish";
import Order from "./components/orders/Order";
import User from "./components/users/User";
import OrderInfo from "./components/orders/OrderInfo";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import ChooseTable from "./components/tables/ChooseTable";
import SubmmitBook from "./components/tables/SubmmitBook";
import Table from "./components/tables/table"
import ChangeBook from "./components/tables/ChangeBook";
import OrderDetail from "./components/orders/OrderDetail";

Vue.config.productionTip = false;

Vue.use(Vant);
Vue.use(VueRouter);
Vue.prototype.$axios = axios;

const routes = [
    {path: '/', name: 'announcement', component: Announcement},
    {path: '/dishes', name: 'dish', component: Dish},
    {path: '/orders', name: 'order', component: Order},
    {path: '/orderinfo', name: 'orderinfo', component: OrderInfo},
    {path: '/profile', name: 'user', component: User},
    {path: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register},
    {path: '/choosetable', name: 'choosetable', component: ChooseTable},
    {path: '/booktable', name: 'booktable', component: SubmmitBook},
    {path: '/table', name: 'table', component: Table},
    {path: '/changebook', name: 'changebook', component: ChangeBook},
    {path: '/orderdetail', name: 'orderdetail', component: OrderDetail},
    {path: '*', redirect: '/'},
];

const router = new VueRouter({
    routes,
    mode: "history"// (缩写) 相当于 routes: routes
});

router.beforeEach((to, from, next) => {
    // ...
    var token = localStorage.getItem("currentUser_token");
    // eslint-disable-next-line no-console
    //console.log(token,to.name);
    if (to.name === 'login' || to.name === 'register' || to.name === 'announcement' || to.name === 'dish') {
        next();
    } else {
        if (token === '') {
            next('/login');
        }
        else {
            next();
        }
    }
    next();
});

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        localStorage.setItem("currentUser_token",'');
        this.$store.state.userPhoneNumber = '未登录';
        this.$router.push({name:'login'});
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        localStorage.setItem("currentUser_token",'');
        this.$store.state.userPhoneNumber = '未登录';
        this.$router.push({name:'login'});
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

new Vue({
    store: store,
    router,
    render: h => h(App)
}).$mount('#app');

