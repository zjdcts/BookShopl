<template>
    <div>
        <van-row>
            <van-col span="5" style="font-family: 'Microsoft YaHei'; font-size: 30px">
                <van-badge-group :active-key="activeKey" @change="onChange">
                    <van-badge v-for="item in dishType" :title="item" :key="item">
                    </van-badge>
                </van-badge-group>
            </van-col>
            <van-col span="19">
                <div v-for="dishItem in $store.state.dishList" :key="dishItem.dishId">
                    <div v-if="nowDishType==dishItem.dishType">
                        <van-card style="background-color: white"
                                :num="$store.state.orders[dishItem.dishId]"
                                :price="dishItem.dishPrice"
                                :desc="dishItem.dishDescription"
                        >
                            <div slot="title" class="dishTitle">
                                {{dishItem.dishName}}
                            </div>
                            <div slot="thumb" style="width: 90px; height: 90px;">
                                <img class="imgStyle" :src="dishItem.dishPicture">
                            </div>
                            <div slot="footer">
                                <van-stepper disable-input
                                             integer
                                             min="0"
                                             :value="$store.state.orders[dishItem.dishId]"
                                             @plus="addNum(dishItem.dishId, dishItem.dishPrice)"
                                             @minus="subNum(dishItem.dishId, dishItem.dishPrice)"
                                >
                                </van-stepper>
                            </div>
                        </van-card>
                    </div>
                </div>
            </van-col>
        </van-row>

        <van-submit-bar
                :price="$store.state.commdityPrice"
                button-text="提交订单"
                @submit="goToOrderInfo"
        >
            <span class="dishNum">共选{{$store.state.commdityNum}}件菜品</span>
        </van-submit-bar>
    </div>
</template>
<script>
    export default {
        name: "dishNavBar",
        data() {
            return {
                dishType: Array,
                activeKey: 0,
                nowDishType: String
            }
        },
        created() {
            this.$axios.get("http://localhost:3000/dishlist")
                .then(response => {
                    this.$store.state.dishList = response.data;
                })
            this.$axios.get("http://localhost:3000/dishType")
                .then(response => {
                    this.dishType = response.data
                    this.nowDishType = this.dishType[0];
                });
        },
        methods: {
            addNum: function (index, price) {
                this.$store.state.commdityNum += 1;
                this.$store.state.orders[index] += 1;
                this.$store.state.commdityPrice += price * 100;
                //eslint-disable-next-line no-console
                console.log(this.$store.state.orders);
            },
            subNum: function (index, price) {
                if (this.$store.state.orders[index] > 0) {
                    this.$store.state.commdityNum -= 1;
                    this.$store.state.orders[index] -= 1;
                    this.$store.state.commdityPrice -= price * 100;
                }
                // eslint-disable-next-line no-console
                console.log(this.$store.state.orders);
            },
            onChange(key) {
                this.activeKey = key;
                this.nowDishType = this.dishType[key];
                // eslint-disable-next-line no-console
                //console.log(this.activeKey)
            },
            goToOrderInfo() {
                this.$router.push({name: 'orderinfo'});
            }
        }
    }
</script>

<style scoped>
    html{
        font-size: calc(100vw);
    }
    .dishTitle {
        font-size: 20px;
        font-style: normal;
        font-family: "Microsoft YaHei";
        font-weight: bold;
    }
    .dishNum {
        height: 100%;
        padding-left: 0.8rem;
        font-size: 0.9rem;
        line-height: 50px;
    }
    .imgStyle {
        height: 100%;
        width: 100%;
        border-radius: 5px;
    }
</style>