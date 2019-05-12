<template>
    <div>
        <van-row type="flex" justify="center">
            <van-col span="23">
                <van-icon name="arrow-left" class="iconStyle" size="20px" @click="goBack"></van-icon>
                <van-cell-group>
                    <van-cell title="上菜时间" center value="内容"/>
                    <van-cell title="支付方式" center is-link :value="payStyle" @click="showPayStyle"/>
                    <van-popup v-model="show" position="bottom" @click-overlay="closePopUp" @open="choosePayStyle">
                        <van-cell-group>
                            <van-cell is-link center @click="closePopUp">
                                <van-icon slot="right-icon" name="cross" size="20px"/>
                                <span slot="title" class="payFontStyle">选择支付方式</span>
                            </van-cell>
                            <van-cell is-link center @click="aliActive">
                                <van-icon slot="icon" name="alipay" color="#03a1e9" size="30px"/>
                                <van-icon slot="right-icon" name="checked" :color="aliColor" size="15px"/>
                                <span slot="title" class="chooseFontStyle">支付宝</span>
                            </van-cell>
                            <van-cell is-link center @click="weiXinActive">
                                <van-icon slot="icon" name="wechat" color="green" size="30px"/>
                                <van-icon slot="right-icon" name="checked" :color="weiXinColor" size="15px"/>
                                <span slot="title" class="chooseFontStyle">微信支付</span>
                            </van-cell>
                            <van-cell :border="otherCellshow"></van-cell>
                            <van-cell :border="otherCellshow"></van-cell>
                            <van-cell :border="otherCellshow"></van-cell>
                            <van-cell :border="otherCellshow"></van-cell>
                            <van-cell :border="otherCellshow"></van-cell>
                            <van-cell :border="otherCellshow"></van-cell>
                            <van-cell :border="otherCellshow"></van-cell>
                            <van-cell :border="otherCellshow"></van-cell>
                        </van-cell-group>
                    </van-popup>
                </van-cell-group>
                <div style="padding-top: 20px; padding-bottom: 10px; font-family: 'Microsoft YaHei'; ">
                    <van-cell title="菜品列表" center/>
                </div>
                <div v-for="dishItem in $store.state.dishList" :key="dishItem.dishId">
                    <div v-if="$store.state.orders[dishItem.dishId]!=0">
                        <van-card style="padding-top: 5px; padding-bottom: 5px; background-color: white; height: 50%"
                                  :num="$store.state.orders[dishItem.dishId]"
                                  :price="dishItem.dishPrice"
                                  :desc="dishItem.dishDescription"
                                  :thumb="dishItem.dishPicture"
                        >
                            <div slot="title" class="dishTitle">
                                {{dishItem.dishName}}
                            </div>
                            <div slot="thumb" style="width: 70%; height: 70%;">
                                <img class="imgStyle" :src="dishItem.dishPicture">
                            </div>
                        </van-card>
                    </div>
                </div>
                <van-cell>
                    <span slot="title">小计 <span
                            style="font-size: large">￥{{$store.state.commdityPrice/100}}</span></span>
                </van-cell>
                <div style="padding-top: 20px">
                    <van-cell-group>
                        <van-cell title="订单备注" is-link value="口味、偏好" @click="goToFav"></van-cell>
                        <van-cell title="餐具份数" is-link :value="dishNumValue" @click="showDishNum"></van-cell>
                        <van-popup v-model="dishNum" position="bottom" @click-overlay="closeDishNum">
                            <van-picker
                                    show-toolbar
                                    title="餐具份数"
                                    :columns="columns"
                                    @cancel="closeDishNum"
                                    @confirm="updateDishNum"
                            />
                        </van-popup>
                        <van-cell title="发票信息" is-link value="未选择"></van-cell>
                    </van-cell-group>
                </div>
                <van-cell-group>
                    <van-cell :border="otherCellshow"></van-cell>
                    <van-cell :border="otherCellshow"></van-cell>
                    <van-cell :border="otherCellshow"></van-cell>
                    <van-cell :border="otherCellshow"></van-cell>
                </van-cell-group>
            </van-col>
        </van-row>
        <van-submit-bar
                :price="$store.state.commdityPrice"
                button-text="确认支付"
                button-type="primary"
        >
        </van-submit-bar>
    </div>
</template>

<script>
    export default {
        name: "OrderInfo",
        data() {
            return {
                show: false,
                otherCellshow: false,
                aliColor: "grey",
                weiXinColor: "grey",
                payStyle: "支付宝",
                dishNum: false,
                columns: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '更多'],
                dishNumValue: "未选择",
            }
        },
        methods: {
            showPayStyle() {
                this.show = true;
            },
            closePopUp() {
                this.show = false;
            },
            showDishNum() {
                this.dishNum = true;
            },
            closeDishNum() {
                this.dishNum = false
            },
            updateDishNum(value) {
                this.dishNumValue = value;
                this.dishNum = false;
            },
            aliActive() {
                this.payStyle = "支付宝";
                this.show = false;
            },
            weiXinActive() {
                this.payStyle = "微信";
                this.show = false;
            },
            choosePayStyle() {
                if (this.payStyle == "支付宝") {
                    this.aliColor = "green"
                    this.weiXinColor = "grey"
                } else {
                    this.aliColor = "grey"
                    this.weiXinColor = "green"
                }
            },
            goBack() {
                this.$router.push({name: 'dish'});
            },
            goToFav() {

            }
        }
    }
</script>

<style scoped>
    .payFontStyle {
        font-size: medium;
        font-family: "Microsoft YaHei";
    }

    .chooseFontStyle {
        font-family: "Microsoft YaHei";
        padding-left: 10px;
    }

    .iconStyle {
        padding-top: 20px;
        padding-bottom: 50px;
    }

    .dishTitle {
        font-size: 20px;
        font-style: normal;
        font-family: "Microsoft YaHei";
        font-weight: bold;
    }

    .imgStyle {
        height: 100%;
        width: 100%;
        border-radius: 5px;
    }
</style>