<template>
    <div class="">
<!--        <LeadBar></LeadBar>-->
        <router-view></router-view>
        <TabBar></TabBar>
    </div>
</template>

<script>
    // import LeadBar from "./components/base/LeadBar";
    import TabBar from "./components/base/TabBar";

    export default {
        name: 'app',
        components: {
            TabBar,
            // LeadBar
        }
    }
</script>

<style>

</style>
