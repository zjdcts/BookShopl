<template>
    <div class="">
        <router-view></router-view>
        <TabBar></TabBar>
    </div>
</template>

<script>
    import TabBar from "./components/base/TabBar";
    export default {
        name: 'app',
        components: {
            TabBar,
        }
    }
</script>

<style>

</style>
