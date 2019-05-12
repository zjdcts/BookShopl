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
                totalData: null
            }
        },
        created() {
            for (var i = 0; i < 100; i++)
                this.$store.state.orders[i] = 0;
            this.$axios.get(this.$store.state.host + "/tableList").then(
                response => {
                    this.totalData = response.data;
                    this.$store.state.tableCount = this.totalData.count;
                }
            )
        },
        components: {},
        methods: {}
    }
</script>

<style>
</style>
