<template>
    <div class="xx">
        <van-row span="24">
            <van-nav-bar
                    title="书籍列表"
                    fixed
                    left-arrow
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
            >
                <van-icon name="home-o" slot="right" size="20px"/>
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
                this.$router.push({name:'announcement',params:{id:0}});
            },
            onClickRight: function () {
                this.$router.push({name:'announcement',params:{id:0}});
            }
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
        font-family: "iconfont",serif;
        font-size: 24px;
        font-style: normal;
        line-height: 46px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
