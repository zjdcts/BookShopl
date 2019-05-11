<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>

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
        },
        methods: {

        }
    }
</script>

<style>
</style>
