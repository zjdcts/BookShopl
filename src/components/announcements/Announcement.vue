<template>
    <div style="background-color: #f7f7f9">
        <DishSwipe></DishSwipe>
        <van-row type="flex" justify="center" style="padding-top: 2px; height: 9rem;">
            <van-col span="24" style="background-color: #fec427">
                <div @click="goToDish" style="height: 100%; width: 100%">
                <van-row type="flex" justify="center">
                    <span class="iconfont" style="padding-top: 2rem">&#xe63c;</span>
                </van-row>
                <van-row type="flex" justify="center">
                    <span>点餐</span>
                </van-row>
                </div>
            </van-col>
        </van-row>
        <van-row type="flex" justify="space-around" style="padding-top: 5px; height: 9rem">
            <van-col span="10" style="background-color: #fed76f">
                <div @click="goToChooseTable" style="height: 100%; width: 100%">
                <van-row type="flex" justify="center">
                    <span class="iconfont" style="padding-top: 2rem">&#xe615;</span>
                </van-row>
                <van-row type="flex" justify="center">
                    <span>预定</span>
                </van-row>
                </div>
            </van-col>
            <van-col span="14" style="background-color: #fec427;" @click="goToOrder">
                <div @click="goToOrder" style="height: 100%; width: 100%">
                <van-row type="flex" justify="center" style="padding-top: 2rem">
                    <span class="iconfont">&#xe67c;</span>
                </van-row>
                <van-row type="flex" justify="center">
                    <span>订单详情</span>
                </van-row>
                </div>
            </van-col>
        </van-row>
        <van-row type="flex" justify="space-around" style="padding-top: 5px; height: 9rem">
            <van-col span="14" style="background-color: #feebb3" @click="goToUser">
                <div @click="goToUser" style="height: 100%; width: 100%">
                <van-row type="flex" justify="center" style="padding-top: 2rem">
                    <span class="iconfont">&#xe651;</span>
                </van-row>
                <van-row type="flex" justify="center">
                    <span>个人中心</span>
                </van-row>
                </div>
            </van-col>
            <van-col span="10" style="background-color: #fed76f" @click="goToLogin">
                <div @click="goToLogin" style="height: 100%; width: 100%">
                <van-row type="flex" justify="center" style="padding-top: 2rem">
                    <span class="iconfont">&#xe642;</span>
                </van-row>
                <van-row type="flex" justify="center">
                    <span v-if="$store.state.userPhoneNumber != '未登录'">欢迎您，{{$store.state.userPhoneNumber}}！</span>
                    <span v-else>未登录</span>
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
        methods: {
            goToDish(){
                this.$router.push({name:'dish',params:{id:1}});
            },
            goToOrder(){
                this.$router.push({name:'order',params:{id:2}});
            },
            goToUser(){
                this.$router.push({name:'user',params:{id:3}});
            },
            goToLogin(){
                this.$router.push({name:'login'});
            },
            goToChooseTable(){
                this.$router.push({name:'table'})
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
        font-family: "iconfont";
        font-size: 3rem;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>