<template>
    <div>
        <router-view></router-view>
        <TabBar @titleChanged="updateTitle($event)" :newTitle="nowTitle"></TabBar>
    </div>
</template>

<script>
    import TabBar from "./components/base/TabBar";
    export default {
        name: 'app',
        data(){
            return {
                nowTitle:null
            }
        },
        components: {
            TabBar
        },
        methods: {
            updateTitle(title){
                this.nowTitle = title
            }
        }
    }
</script>

<style>

</style>
