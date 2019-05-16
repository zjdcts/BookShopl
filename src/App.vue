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
                totalData: null,
                host: this.$store.state.host
            }
        },
        created() {
            this.$axios.get(this.host + "/tables/").then(
                response => {
                    this.totalData = response.data;
                    this.$store.state.tableCount = this.totalData.count;
                }
            );
            this.$store.commit("setUser", {
                "user_name": '',
                "user_token": '',
                "refresh_token": ''
            });
            this.$store.state.userPhoneNumber = '未登录';
            this.$store.state.commdityNum = 0;
            this.$store.state.commdityPrice = 0;
            this.$axios.get(this.host + "/dishes/lists/?page_size=500")
                .then(response => {
                    this.$store.state.dishList = response.data.results;
                    this.$store.state.dishCount = response.data.count;
                    for (let i = 0; i <= this.$store.state.dishCount; i++)
                        this.$store.state.orders[i] = 0;
                });
            this.$axios.get(this.host + "/tables/").then(
                response => {
                    this.totalData = response.data;
                    this.$store.state.tableList = this.totalData.results;
                    this.$store.state.tableCount = this.totalData.count;
                    for (let i = 0; i < this.$store.state.tableCount; i++)
                        this.cellDirection[i] = 0;
                }
            );
        }
    }
</script>

<style>
</style>
