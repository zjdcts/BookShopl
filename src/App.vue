<template>
    <div>
        <router-view></router-view>
        <TabBar></TabBar>
    </div>
</template>

<script>
    import TabBar from "./components/base/TabBar";

    export default {
        name: 'app',
        data() {
            return {
                nowTitle: null,
            }
        },
        created(){
            for(var i=0;i<100;i++)
                this.$store.state.orders[i]=0;
        },
        components: {
            TabBar
        },
        methods: {

        }
    }
</script>

<style>

</style>
