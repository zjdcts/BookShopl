<template>
    <div>
        <van-row type="flex" justify="center">
            <van-col span="23">
                <van-icon name="arrow-left" class="iconStyle" size="20px" @click="goBack"></van-icon>
                <van-cell-group>
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
                            <van-cell :border="otherCellshow" v-for="i in 8" :key="i"></van-cell>
                        </van-cell-group>
                    </van-popup>
                </van-cell-group>
                <div style="padding-top: 20px; padding-bottom: 10px; font-family: 'Microsoft YaHei'; ">
                    <van-cell title="书籍列表" center/>
                </div>
                <div v-for="(dishItem,index) in temp" :key="index">
                    <div v-if="dishItem > 0">
                        <van-card style="padding-top: 5px; padding-bottom: 5px; background-color: white; height: 50%"
                                  :num="Number(dishItem)"
                                  :price="Number(dishList[index].price)"
                                  :desc="dishList[index].description"
                        >
                            <div slot="title" class="dishTitle">
                                {{dishList[index].name}}
                            </div>
                            <div slot="thumb" style="width: 70%; height: 70%;">
                                <img class="imgStyle" :src="dishList[index].picture">
                            </div>
                        </van-card>
                    </div>
                </div>
                <van-cell>
                    <span slot="title">小计 <span
                            style="font-size: large">￥{{commdityPrice/100}}</span></span>
                </van-cell>
                <div style="padding-top: 20px">
                    <van-cell-group>
                        <van-cell title="发票信息" is-link value="未选择"></van-cell>
                    </van-cell-group>
                </div>
                <van-cell-group>
                    <van-cell :border="otherCellshow" v-for="i in 4" :key="i"></van-cell>
                </van-cell-group>
            </van-col>
        </van-row>
        <van-submit-bar
                :price="Number(commdityPrice)"
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
                payStyle: Number,
                dishNum: false,
                dishNumValue: Number,
                tableId: String,
                message: String,
                order_detail: [],
                noUse: null,
                dishList: Array,
                commdityPrice: Number,
                temp:[]
            }
        },
        created() {
            this.dishList = JSON.parse(localStorage.getItem('choose_dish'));
            this.temp = JSON.parse(localStorage.getItem('user_dish_num'));
            this.commdityPrice = localStorage.getItem('commidity_price');
            if(localStorage.getItem('payStyle') === null){
                this.payStyle = 0;
                localStorage.setItem('payStyle','0');
            } else{
                this.payStyle = Number(localStorage.getItem('payStyle'));
            }
            for(let i in this.temp){
                if(this.temp[i] > 0){
                    this.order_detail.push({book_id:this.dishList[i].id});
                }
            }
        },
        destroyed(){
            this.clearInfo(0);
        },
        methods: {
            getDishNum(index) {
                return this.temp[index];
            },
            showPayStyle() {
                this.show = true;
            },
            closePopUp() {
                this.show = false;
            },
            aliActive() {
                this.payStyle = 0;
                localStorage.setItem('payStyle','0');
                this.show = false;
            },
            weiXinActive() {
                this.payStyle = 1;
                localStorage.setItem('payStyle','1');
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
                this.clearInfo(0);
                this.$router.push({name: 'dish'});
            },
            confirmPay() {
                this.$axios({
                    method: 'post',
                    url: '/orders/create/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('user_token')
                    },
                    data: {
                        order_price: Number(this.commdityPrice / 100),
                        order_status: 1,
                        order_detail: this.order_detail,
                        pay_method: this.payStyle
                    }
                })
                    .then(response => {
                        this.clearInfo(1);
                        localStorage.setItem('payUrl',response.data.pay_url);
                        this.$router.push({name: 'confirmPay'});
                    })
                    .catch(error => {
                        if (error.response.status === 401) {
                            this.$dialog.alert({
                                message: '登录已过期，请重新登录！'
                            });
                            localStorage.setItem('user_name','');
                            this.$router.push({name: 'login'});
                        } else if(error.response.status === 400){
                            this.$dialog.alert({
                                message: '请输入订单备注！'
                            });
                        }
                    })
            },
            clearInfo(index) {
                if(index === 0){
                    localStorage.removeItem('payStyle');
                } else {
                    localStorage.removeItem('user_dish_num');
                    localStorage.removeItem('commidity_num');
                    localStorage.removeItem('commidity_price');
                    localStorage.removeItem('choose_dish');
                    localStorage.removeItem('payStyle');
                }
            }
        },
    }
</script>

<style scoped>
    .payFontStyle {
        font-size: medium;
        font-family: "Microsoft YaHei", serif;
    }

    .chooseFontStyle {
        font-family: "Microsoft YaHei", serif;
        padding-left: 10px;
    }

    .iconStyle {
        padding-top: 20px;
        padding-bottom: 50px;
    }

    .dishTitle {
        font-size: 20px;
        font-style: normal;
        font-family: "Microsoft YaHei", serif;
        font-weight: bold;
    }

    .imgStyle {
        height: 100%;
        width: 100%;
        border-radius: 5px;
    }
</style>