<template>
    <van-tabbar v-model="newTitle" active-color="#fed76f">
        <van-tabbar-item icon="home-o" :to="{name:'announcement',params:{id:0}}">首页</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" :to="{name:'dish',params:{id:1}}">点餐</van-tabbar-item>
        <van-tabbar-item icon="orders-o" :to="{name:'order',params:{id:2}}">订单</van-tabbar-item>
        <van-tabbar-item icon="user-o" :to="{name:'user',params:{id:3}}">我的</van-tabbar-item>
    </van-tabbar>
</template>


<script>
    export default {
        name: "TabBar",
        data() {
            return {
                newTitle:0,
            }
        },
        created() {
            this.newTitle = this.$route.params.id;
        }
    }
</script>

<style scoped>

</style>