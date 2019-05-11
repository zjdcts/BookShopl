<template>
    <div class="xx">
        <van-row span="24">
            <van-nav-bar
                    title="菜品列表"
                    left-text="返回"
                    right-text="回首页"
                    fixed
                    left-arrow
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
            >
                <span class="iconfont" slot="right">&#xe70c;</span>
            </van-nav-bar>
            <DishSwipe style="padding-top: 46px"></DishSwipe>
            <DishNavBar></DishNavBar>
        </van-row>
    </div>
</template>

<script>
    import DishSwipe from "./DishSwipe.vue";
    import DishNavBar from "./DishNavBar";

    export default {
        name: "Dish",
        components: {
            DishNavBar,
            DishSwipe
        },
        methods: {
            onClickLeft: function () {
                this.$router.push({name:'announcement'});
                // eslint-disable-next-line no-console
                //console.log(1);
            },
            onClickRight: function () {
                this.$router.push('/');
                // eslint-disable-next-line no-console
                //console.log(1);
            },
        }
    };
</script>

<style scoped>
    @font-face {
        font-family: 'iconfont';
        src: url('../../assets/IconFont/iconfont.eot');
        src: url('../../assets/IconFont/iconfont.eot?#iefix') format('embedded-opentype'),
        url('../../assets/IconFont/iconfont.woff2') format('woff2'),
        url('../../assets/IconFont/iconfont.woff') format('woff'),
        url('../../assets/IconFont/iconfont.ttf') format('truetype'),
        url('../../assets/IconFont/iconfont.svg#iconfont') format('svg');
    }

    .iconfont {
        font-family: "iconfont";
        font-size: 24px;
        font-style: normal;
        line-height: 46px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
