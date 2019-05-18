<template>
    <div>
        <van-row type="flex" justify="center" style="padding-top: 46px">
            <van-col span="18">
                <van-row>
                    <span style="font-family: 'Microsoft YaHei';font-size: 2rem">{{$store.state.userPhoneNumber}}</span>
                </van-row>
                <van-row>
                    <span v-if="$store.state.userPhoneNumber !== '未登录'" style="color: lightgrey;">再忙，也要记得吃饭哟~</span>
                </van-row>
            </van-col>
            <van-col span="4">
                <div style="height: 100%; width: 100%">
                    <img src="../../assets/logo.png" style="height: 100%;width: 100%;"/>
                </div>
            </van-col>
        </van-row>
        <div style="padding-top: 20px">
            <van-cell-group>
                <van-cell title="设置" icon="setting-o" is-link
                          :arrow-direction="this.direction[0] === 0 ? 'up' : 'down'" @click="changeDir(0)"/>
                <van-cell-group>
                    <van-cell title="Modify Password" is-link></van-cell>
                    <van-cell title="Logout" is-link></van-cell>
                </van-cell-group>
                <van-cell title="About Us" icon="like-o" is-link
                          :arrow-direction="this.direction[1] === 0 ? 'up' : 'down'" @click="changeDir(1)"/>
            </van-cell-group>
        </div>
        <TabBar></TabBar>
    </div>
</template>

<script>
    import TabBar from "../base/TabBar";

    export default {
        name: "user",
        components: {TabBar},
        data() {
            return {
                direction: Array
            }
        },
        created() {

        },
        methods: {
            changeDir(index) {

            }
        }
    }
</script>

<style scoped>
    html {
        font-size: calc(100vw);
    }
</style>