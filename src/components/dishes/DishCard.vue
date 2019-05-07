<template>
    <van-card v-for="item in dishInfo" :key="item"
            :num="item.num"
            :price="item.price"
            :desc="item.desc"
            :title="item.title"
    >
    </van-card>
</template>

<script>
    export default {
        name: "DishCard",
        props: {
            dishInfo: Object
        },
        data() {
        }
    }
</script>

<style scoped>

</style>