<template>
    <div>
        <van-nav-bar
                title="我的预订"
                left-arrow
                @click-left="onClickLeft"
        />
        <div v-if="!isHaveBook">
            <van-row type="flex" justify="center">
                <span style="padding-top: 20px; color: lightgrey">暂无预定记录</span>
            </van-row>
            <div style="padding-top: 20px">
                <van-row type="flex" justify="center">
                    <van-col span="22">
                        <van-button style="background-color: #fed76f;" size="large" round @click="goToChooseTable">餐桌预定</van-button>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div v-else>

        </div>
    </div>
</template>

<script>
    export default {
        name: "table",
        data() {
            return {
                isHaveBook: false
            }
        },
        methods: {
            onClickLeft() {
                this.$router.push({name: 'announcement'});
            },
            goToChooseTable(){
                this.$router.push({name:'choosetable'})
            }
        }
    }
</script>

<style scoped>

</style>