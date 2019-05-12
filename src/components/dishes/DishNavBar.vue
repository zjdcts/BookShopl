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
            <van-icon name="shopping-cart-o" size="25px" :info="$store.state.commdityNum"
                      style="line-height: 50px; padding-left: 20px" @click="showShopCart"/>
        </van-submit-bar>
        <van-popup v-model="show" class="popUp">
            <van-cell :title="'已选'+$store.state.commdityNum+'件商品'"></van-cell>
            <div v-for="dishItem in $store.state.dishList" :key="dishItem.dishId">
                <div v-show="$store.state.orders[dishItem.dishId]!=0">
                    <van-cell-group>
                        <van-cell :title="dishItem.dishName">
                            <div slot="right-icon">
                                <van-stepper disable-input
                                             integer
                                             min="0"
                                             :value="$store.state.orders[dishItem.dishId]"
                                             @plus="addNum(dishItem.dishId, dishItem.dishPrice)"
                                             @minus="subNum(dishItem.dishId, dishItem.dishPrice)"
                                >
                                </van-stepper>
                            </div>
                        </van-cell>
                    </van-cell-group>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
    export default {
        name: "dishNavBar",
        data() {
            return {
                dishType: Array,
                activeKey: 0,
                nowDishType: String,
                host: this.$store.state.host,
                show: false
            }
        },
        created() {
            this.$axios.get(this.host + "/dishlist")
                .then(response => {
                    this.$store.state.dishList = response.data;
                })
            this.$axios.get(this.host + "/dishType")
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
                //console.log(this.$store.state.orders);
            },
            subNum: function (index, price) {
                if (this.$store.state.orders[index] > 0) {
                    this.$store.state.commdityNum -= 1;
                    this.$store.state.orders[index] -= 1;
                    this.$store.state.commdityPrice -= price * 100;
                }
                if (this.$store.state.commdityNum == 0)
                    this.show = false
                // eslint-disable-next-line no-console
                //console.log(this.$store.state.orders);
            },
            onChange(key) {
                this.activeKey = key;
                this.nowDishType = this.dishType[key];
                // eslint-disable-next-line no-console
                //console.log(this.activeKey)
            },
            goToOrderInfo() {
                if (this.$store.state.commdityNum != 0)
                    this.$router.push({name: 'orderinfo'});
                else {
                    this.$dialog.alert({
                        message: '你还没有选择商品！'
                    })
                }
            },
            showShopCart() {
                if (this.$store.state.commdityNum != 0)
                    this.show = true;
                else {
                    this.$dialog.alert({
                        message: '你还没有选择商品！'
                    })
                }
            }
        }
    }
</script>

<style scoped>
    html {
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

    .popUp {
        width: 100vw;
    }
</style>