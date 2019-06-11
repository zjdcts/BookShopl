<template>
    <van-tabbar v-model="newTitle" active-color="#fed76f">
        <van-tabbar-item icon="home-o" :to="{name:'announcement',params:{id:0}}">首页</van-tabbar-item>
        <van-tabbar-item :to="{name:'dish',params:{id:1}}">
            书城
            <span class="iconfont" slot="icon">&#xe60c;</span>
        </van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" :to="{name:'shopcart',params:{id:2}}">购物车</van-tabbar-item>
        <van-tabbar-item icon="orders-o" :to="{name:'order',params:{id:3}}">订单</van-tabbar-item>
        <van-tabbar-item icon="user-o" :to="{name:'user',params:{id:4}}">我的</van-tabbar-item>
    </van-tabbar>
</template>


<script>
    export default {
        name: "TabBar",
        data() {
            return {
                newTitle: 0,
            }
        },
        created() {
            this.newTitle = this.$route.params.id;
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
        font-family: "iconfont",serif;
        font-size: 18px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>