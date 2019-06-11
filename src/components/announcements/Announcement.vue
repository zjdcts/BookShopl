<template>
    <div style="background-color: #f7f7f9">
        <DishSwipe></DishSwipe>
        <van-row type="flex" justify="center" style="padding-top: 2px; height: 9rem;">
            <van-col span="24" style="background-color: #bce0b0">
                <div @click="goToDish" style="height: 100%; width: 100%">
                    <van-row type="flex" justify="center">
                        <span class="iconfont" style="padding-top: 2rem">&#xe60c;</span>
                    </van-row>
                    <van-row type="flex" justify="center">
                        <span>随便看看</span>
                    </van-row>
                </div>
            </van-col>
        </van-row>
        <van-row type="flex" justify="space-around" style="padding-top: 5px; height: 9rem">
            <van-col span="10" style="background-color: #ceedc3">
                <div @click="goToSearch" style="height: 100%; width: 100%">
                    <van-row type="flex" justify="center">
                        <span class="iconfont" style="padding-top: 2rem">&#xe611;</span>
                    </van-row>
                    <van-row type="flex" justify="center">
                        <span>搜书</span>
                    </van-row>
                </div>
            </van-col>
            <van-col span="14" style="background-color: #bce0b0;" @click="goToOrder">
                <div @click="goToOrder" style="height: 100%; width: 100%">
                    <van-row type="flex" justify="center" style="padding-top: 2rem">
                        <span class="iconfont">&#xe67d;</span>
                    </van-row>
                    <van-row type="flex" justify="center">
                        <span>订单详情</span>
                    </van-row>
                </div>
            </van-col>
        </van-row>
        <van-row type="flex" justify="space-around" style="padding-top: 5px; height: 9rem">
            <van-col span="14" style="background-color: #dcf0e4" @click="goToShopCart">
                <div @click="goToShopCart" style="height: 100%; width: 100%">
                    <van-row type="flex" justify="center" style="padding-top: 2rem">
                        <van-icon style="font-size: 3rem" name="shopping-cart-o" />
                    </van-row>
                    <van-row type="flex" justify="center">
                        <span>购物车</span>
                    </van-row>
                </div>
            </van-col>
            <van-col span="10" style="background-color: #ceedc3" @click="goToLogin">
                <div @click="goToLogin" style="height: 100%; width: 100%">
                    <van-row type="flex" justify="center" style="padding-top: 2rem">
                        <span class="iconfont">&#xe67c;</span>
                    </van-row>
                    <van-row type="flex" justify="center">
                        <span>{{userName}}</span>
                    </van-row>
                </div>
            </van-col>
        </van-row>
        <TabBar></TabBar>
    </div>
</template>

<script>
    import DishSwipe from "../dishes/DishSwipe.vue";
    import TabBar from "../base/TabBar";

    export default {
        name: "Announcement",
        components: {
            DishSwipe,
            TabBar
        },
        data() {
            return {
                userName: String
            }
        },
        created() {
            if (localStorage.getItem('user_name') === null || localStorage.getItem('user_name') === '') {
                this.userName = '未登录';
                localStorage.setItem('user_name', '');
            } else
                this.userName = localStorage.getItem('user_name');
        },
        methods: {
            goToDish() {
                this.$router.push({name: 'dish'});
            },
            goToOrder() {
                this.$router.push({name: 'order', params: {id: 2}});
            },
            goToUser() {
                this.$router.push({name: 'user', params: {id: 3}});
            },
            goToLogin() {
                if (this.userName === '未登录')
                    this.$router.push({name: 'login'});
                else {
                    this.$router.push({name: 'user', params: {id: 4}});
                }
            },
            goToSearch() {
                this.$router.push({name: 'search'});
            },
            goToShopCart() {
                this.$router.push({name: 'shopcart'});
            }
        }
    }
</script>

<style scoped>
    html {
        font-size: calc(100vw);
    }

    @font-face {
        font-family: 'iconfont';
        src: url('../../assets/IconFont/iconfont.eot');
        src: url('../../assets/IconFont/iconfont.eot?#iefix') format('embedded-opentype'),
        url('../../assets/IconFont/iconfont.woff2') format('woff2'),
        url('../../assets/IconFont/iconfont.woff') format('woff'),
        url('../../assets/IconFont/iconfont.ttf') format('truetype'),
        url('../../assets/IconFont/iconfont.svg#iconfont') format('svg');
    }

    .iconfont {
        font-family: "iconfont", serif;
        font-size: 3rem;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

</style>