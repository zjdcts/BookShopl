<template>
    <div style="">
        <van-row type="flex" justify="center" style="padding-top: 46px">
            <van-col span="18">
                <van-row>
                    <span style="font-family: 'Microsoft YaHei';font-size: 2rem">{{$store.state.userId}}</span>
                </van-row>
                <van-row>
                    <span v-if="$store.state.userId != '未登录'" style="color: lightgrey;">再忙，也要记得吃饭哟~</span>
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
                <van-cell title="我的收藏" icon="like-o" is-link to="index" />
                <van-cell title="我的客服" icon="service-o" is-link to="index" />
                <van-cell title="推荐有奖" icon="point-gift-o" is-link to="index" />
                <van-cell title="商务合作" icon="fire-o" is-link to="index" />
                <van-cell title="设置" icon="setting-o" is-link to="index" />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "user"
    }
</script>

<style scoped>
    html {
        font-size: calc(100vw);
    }
</style>