<template>
    <van-tabbar v-model="newTitle" active-color="#fed76f">
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/dishes">点餐</van-tabbar-item>
        <van-tabbar-item icon="orders-o" to="/orders">订单</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
</template>


<script>

    export default {
        name: "TabBar",
        data() {
            return {
                newTitle:0
            }
        }
    }
</script>

<style scoped>

</style>