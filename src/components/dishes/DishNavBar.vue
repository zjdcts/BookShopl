<template>
    <div>
        <van-row>
            <van-col span="5" style="font-family: 'Microsoft YaHei',serif; font-size: 30px">
                <van-badge-group :active-key="activeKey" @change="onChange" id="badge-group" :style="style">
                    <van-badge v-for="index in dishType" :title="index" :key="index">
                    </van-badge>
                </van-badge-group>
            </van-col>
            <van-col span="19">
                <div v-for="(dishItem,index) in dishList" :key="index">
                    <div v-if="nowDishType === dishItem.dish_type">
                        <van-card style="background-color: white"
                                  :num="$store.state.orders[dishItem.dish_id]"
                                  :price="dishItem.dish_price"
                                  :desc="dishItem.dish_description"
                        >
                            <div slot="title" class="dishTitle">
                                {{dishItem.dish_name}}
                            </div>
                            <div slot="thumb" style="width: 90px; height: 90px;">
                                <img class="imgStyle" :src="dishItem.dish_picture" alt="dish_picture">
                            </div>
                            <div slot="footer">
                                <van-stepper disable-input
                                             integer
                                             min="0"
                                             :value="$store.state.orders[dishItem.dish_id]"
                                             @plus="addNum(dishItem.dish_id, dishItem.dish_price)"
                                             @minus="subNum(dishItem.dish_id, dishItem.dish_price)"
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
            <div v-for="(dishItem,index) in dishList" :key="index">
                <div v-show="$store.state.orders[dishItem.dish_id] !== 0">
                    <van-cell-group>
                        <van-cell :title="dishItem.dish_name">
                            <div slot="right-icon">
                                <van-stepper disable-input
                                             integer
                                             min="0"
                                             :value="$store.state.orders[dishItem.dish_id]"
                                             @plus="addNum(dishItem.dish_id, dishItem.dish_price)"
                                             @minus="subNum(dishItem.dish_id, dishItem.dish_price)"
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
                activeKey: Number,
                nowDishType: String,
                show: Boolean,
                temp: Number,
                isFixed: String,
                style: {
                    paddingTop: '0px',
                    //position: 'relative',
                },
                host: this.$store.state.host,
                dishList: this.$store.state.dishList
            }
        },
        created() {
            this.activeKey = 0;
            this.show = false;
            this.temp = '';
            this.$axios.get(this.host + "/dishes/types/")
                .then(response => {
                    this.dishType = response.data;
                    this.nowDishType = this.dishType[0];
                });
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
            this.temp = document.querySelector('#badge-group').offsetTop;
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll)
        },
        methods: {
            addNum: function (index, price) {
                this.$store.state.commdityNum += 1;
                this.$store.state.orders[index] += 1;
                this.$store.state.commdityPrice += price * 100;
            },
            subNum: function (index, price) {
                if (this.$store.state.orders[index] > 0) {
                    this.$store.state.commdityNum -= 1;
                    this.$store.state.orders[index] -= 1;
                    this.$store.state.commdityPrice -= price * 100;
                }
                if (this.$store.state.commdityNum === 0)
                    this.show = false
            },
            onChange(key) {
                this.activeKey = key;
                this.nowDishType = this.dishType[key];
            },
            goToOrderInfo() {
                if (this.$store.state.commdityNum !== 0)
                    this.$router.push({name: 'orderinfo'});
                else {
                    this.$dialog.alert({
                        message: '你还没有选择商品！'
                    })
                }
            },
            showShopCart() {
                if (this.$store.state.commdityNum !== 0)
                    this.show = true;
                else {
                    this.$dialog.alert({
                        message: '你还没有选择商品！'
                    })
                }
            },
            handleScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > this.temp) {
                    this.style.paddingTop = scrollTop - 237.1 + 'px';
                } else {
                    this.style.paddingTop = 0;
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
        font-family: "Microsoft YaHei",serif;
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