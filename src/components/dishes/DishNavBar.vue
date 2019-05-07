<template>
    <div>
        <van-tabs v-model="active" sticky swipeable>
            <van-tab v-for="item in dishType" :title="item" :key="item">
                <div v-for="(value, name) in dishList" :key="name">
                    <div v-if="item==name">
                        <div v-for="dishItem in value" :key="dishItem.dishName">
                            <van-card
                                    :num="dishItem.dishStock"
                                    :price="dishItem.dishPrice"
                                    :desc="dishItem.dishDescription"
                                    :title="dishItem.dishName"
                                    :thumb="dishItem.dishPicture"
                            >
                                <div slot = "title" class="dishTitle">
                                    {{dishItem.dishName}}
                                </div>
                                <div class="dishButton" slot="footer">
                                    <van-button @onClick="addNum(dishItem.dishId)" round size="mini" type="info">添加</van-button>
                                    <span>{{orders[dishItem.dishId]}}</span>
                                    <van-button round size="mini" type="warning">删除</van-button>
                                </div>
                            </van-card>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
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
                sns: null,
                orders:{

                }
            }
        },
        created() {
            this.$axios.get("http://localhost:3000/dishlist")
                .then(response => (this.dishList = response.data))
            this.$axios.get("http://localhost:3000/dishType")
                .then(response => (this.dishType = response.data))
        },
        methods: {
            addNum: function(index) {
                this.orders[index]++;
            }
        }
    }
</script>

<style scoped>
    .dishCard {
        padding: 5px;
        font-style: italic;
    }
    .dishTitle{
        font-size: large;
        font-style: oblique;
    }
</style>