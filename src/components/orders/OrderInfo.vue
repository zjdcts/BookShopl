<template>
    <div>
        <van-row type="flex" justify="center">
            <van-col span="23">
                <van-icon name="arrow-left" class="iconStyle" size="20px" @click="goBack"></van-icon>
                <van-cell-group>
                    <van-field v-model="tableId" label="餐桌编号" placeholder="请输入餐桌编号" @input="getTableId"/>
                    <van-cell title="上菜时间" center value="内容"/>
                    <van-cell title="支付方式" center is-link :value="payStyle == 0 ? '支付宝' : '微信'" @click="showPayStyle"/>
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
                <div v-for="(dishItem,index) in $store.state.dishList" :key="index">
                    <div v-if="$store.state.orders[dishItem.dish_id]!=0">
                        <van-card style="padding-top: 5px; padding-bottom: 5px; background-color: white; height: 50%"
                                  :num="$store.state.orders[dishItem.dish_id]"
                                  :price="dishItem.dish_price"
                                  :desc="dishItem.dish_description"
                        >
                            <div slot="title" class="dishTitle">
                                {{dishItem.dish_name}}
                            </div>
                            <div slot="thumb" style="width: 70%; height: 70%;">
                                <img class="imgStyle" :src="dishItem.dish_picture">
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
                        <van-field
                                v-model="message"
                                label="订单备注"
                                type="textarea"
                                placeholder="请输入口味、偏好"
                                rows="1"
                                autosize
                                @input="getFav"
                        />
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
                @submit="confirmPay"
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
                payStyle: 0,
                dishNum: false,
                columns: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '更多'],
                dishNumValue: '',
                tableId: '',
                message: '',
                order_detail: []
            }
        },
        created() {
            for (let i = 0; i <= this.$store.state.dishCount; i++) {
                if (this.$store.state.orders[i] !== 0) {
                    let dish_id = i;
                    let dish_num = this.$store.state.orders[i];
                    this.order_detail.push({"dish_id": dish_id, "dish_num": dish_num});
                }
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
                this.payStyle = 0;
                this.show = false;
            },
            weiXinActive() {
                this.payStyle = 1;
                this.show = false;
            },
            choosePayStyle() {
                if (this.payStyle === 0) {
                    this.aliColor = "green";
                    this.weiXinColor = "grey";
                } else {
                    this.aliColor = "grey";
                    this.weiXinColor = "green";
                }
            },
            goBack() {
                this.$router.push({name: 'dish'});
            },
            getFav(value) {
                this.message = value;
                // eslint-disable-next-line no-console
                //console.log(this.message);
            },
            confirmPay() {
                if (Number(this.tableId) <= 0 || Number(this.tableId) > this.$store.state.tableCount) {
                    this.$dialog.alert({
                        message: '餐桌编号不存在！'
                    })
                } else {
                this.$axios({
                    method: 'post',
                    url: this.$store.state.host + '/orders/create',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('currentUser_token')
                    },
                    data: {
                        order_table: Number(this.tableId),
                        order_price: this.$store.state.commdityPrice / 100,
                        order_script: this.message,
                        order_status: 1,
                        order_detail: this.order_detail,
                        table_ware_num: Number(this.dishNumValue),
                        pay_method: this.payStyle
                    }
                })
                    .then(response => {
                        // eslint-disable-next-line no-console
                        console.log(response);
                        this.$axios({
                            url: response.data.pay_url,
                            method: 'get'
                        })
                            .then(data => {
                                // eslint-disable-next-line no-console
                                console.log(data);
                                this.$dialog.alert({
                                    message: '下单成功！'
                                });
                                this.$router.push({name: 'order'});
                            })
                            .catch(error => {
                                // eslint-disable-next-line no-console
                                console.log(error);
                                this.$dialog.alert({
                                    message: '出现错误！'
                                });
                            })
                    })
                    .catch(error => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        this.$dialog.alert({
                            message: '出现错误！'
                        })
                    })
                }
            },
            getTableId(value) {
                this.tableId = value;
            }
        }
    }
</script>

<style scoped>
    .payFontStyle {
        font-size: medium;
        font-family: "Microsoft YaHei",serif;
    }

    .chooseFontStyle {
        font-family: "Microsoft YaHei",serif;
        padding-left: 10px;
    }

    .iconStyle {
        padding-top: 20px;
        padding-bottom: 50px;
    }

    .dishTitle {
        font-size: 20px;
        font-style: normal;
        font-family: "Microsoft YaHei",serif;
        font-weight: bold;
    }

    .imgStyle {
        height: 100%;
        width: 100%;
        border-radius: 5px;
    }
</style>