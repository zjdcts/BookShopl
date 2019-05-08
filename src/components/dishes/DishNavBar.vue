<template>
    <div>
        <van-nav-bar
                title="标题"
                left-text="返回"
                fixed
                left-arrow
                @click-left="onClickLeft"
        />
        <van-tabs v-model="active" sticky swipeable>
            <van-tab v-for="item in dishType" :title="item" :key="item">
                <div v-for="(value, name) in dishList" :key="name">
                    <div v-if="item==name">
                        <div v-for="dishItem in value" :key="dishItem.dishName">
                            <van-card
                                    :num="orders[dishItem.dishId]"
                                    :price="dishItem.dishPrice"
                                    :desc="dishItem.dishDescription"
                                    :title="dishItem.dishName"
                                    :thumb="dishItem.dishPicture"
                            >
                                <div slot="title" class="dishTitle">
                                    {{dishItem.dishName}}
                                </div>
                                <div class="dishButton" slot="footer">
                                    <van-button @click="addNum(dishItem.dishId, dishItem.dishPrice)" round size="mini"
                                                type="info">添加
                                    </van-button>
                                    <van-button @click="subNum(dishItem.dishId, dishItem.dishPrice)" round size="mini"
                                                type="warning">删除
                                    </van-button>
                                </div>
                            </van-card>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <van-submit-bar
                :price="commdityPrice"
                button-text="提交订单"

        >
            <span class="dishNum">共选{{commdityNum}}件菜品</span>
        </van-submit-bar>
    </div>
</template>
<script>
    //import DishCard from "./DishCard";

    export default {
        name: "dishNavBar",
        //components: {DishCard},
        data() {
            return {
                active: 2,
                dishType: null,
                dishList: null,
                orders: {},
                xx: 0,
                commdityNum: 0,
                commdityPrice: 0,
                scrollTop: 0
            }
        },
        created() {
            this.$axios.get("http://localhost:3000/dishlist")
                .then(response => {
                    this.dishList = response.data;
                    for (var i = 1; i < 100; i++) {
                        this.orders[i] = 0
                    }
                })
            this.$axios.get("http://localhost:3000/dishType")
                .then(response => (this.dishType = response.data))
        },
        methods: {
            addNum: function (index, price) {
                this.orders[index] += 1;
                this.commdityNum += 1;
                this.commdityPrice += price * 100;
                // eslint-disable-next-line no-console
                console.log(this.orders[index]);
            },
            subNum: function (index, price) {
                if (this.orders[index] > 0) {
                    this.orders[index] -= 1;
                    this.commdityPrice -= price * 100;
                    this.commdityNum -= 1;
                }
                // eslint-disable-next-line no-console
                console.log(this.orders[index]);
            },
            onClickLeft: function () {
                this.$router.go(-1);
                // eslint-disable-next-line no-console
                console.log(1);
            }
        }
    }
</script>

<style scoped>
    .dishCard {
        padding: 5px;
        font-style: italic;
    }

    .dishTitle {
        font-size: large;
        font-style: oblique;
    }

    .dishNum {
        padding-left: 30px;
        font-size: larger;
    }
</style>