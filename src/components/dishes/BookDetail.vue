<template>
    <div>
        <van-nav-bar
                title="书籍详情"
                fixed
                left-arrow
                @click-left="onClickLeft"
        >
        </van-nav-bar>
        <van-row style="padding-top: 60px">
            <van-col>
                <div style="width: 35vw; padding-left: 10px">
                    <img :src="bookDetail.picture" style="width: 100%;"/>
                </div>
            </van-col>
            <van-col span="14" style="padding-left: 10px;">
                <van-row>
                <span style="font-family: Consolas,serif; font-size: x-large; font-weight: bold">{{bookDetail.name}}</span>
                </van-row>
                <van-row style="padding-top: 10px">
                    <span style="font-family: Consolas,serif;">Author: {{bookDetail.author}}</span>
                </van-row>
                <van-row style="padding-top: 10px">
                    <span style="font-family: Consolas,serif;">Publish Year: {{bookDetail.year}}</span>
                </van-row>
                <van-row style="padding-top: 10px">
                    <span style="font-family: Consolas,serif;">Language: {{bookDetail.language}}</span>
                </van-row>
                <van-row style="padding-top: 10px">
                    <span style="font-family: Consolas,serif;">Category: {{bookDetail.category}}</span>
                </van-row>
                <van-row style="padding-top: 10px">
                    <span style="font-family: Consolas,serif;">ISBN: {{bookDetail.ISBN}}</span>
                </van-row>
            </van-col>
        </van-row>
        <van-row type="flex" justify="center" style="padding-top: 20px">
            <van-col span="22">
                <span style="font-family: Consolas,serif; font-size: x-large; font-weight: bold">Description</span>
            </van-col>
        </van-row>
        <van-row type="flex" justify="center" style="padding-top: 20px">
            <van-col span="22">
                <span>
                   {{bookDetail.description}}
                </span>
            </van-col>
        </van-row>
        <van-row type="flex" justify="center" style="padding-top: 10px">
            <van-col span="22">
            <van-row type="flex" justify="space-between">
                <van-col >
                    <span>Price: {{bookDetail.price}}</span>
                </van-col>
                <van-col >
                    <span>Pages: {{bookDetail.pages}}</span>
                </van-col>
            </van-row>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: "BookDetail",
        data() {
            return {
                bookDetail: Object
            }
        },
        created() {
            if (localStorage.getItem('bookDetail') === null) {
                this.bookDetail = this.$route.params.data;
                localStorage.setItem('bookDetail', JSON.stringify(this.bookDetail));
            } else {
                this.bookDetail = JSON.parse(localStorage.getItem('bookDetail'));
            }
        },
        destroyed() {
            localStorage.removeItem('bookDetail');
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>