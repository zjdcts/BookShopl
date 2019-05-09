<template>
    <div>
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
                        <van-icon slot="icon" name="alipay" color="blue" size="30px"/>
                        <van-icon slot="right-icon" name="checked" :color="aliColor" size="30px"/>
                        <span slot="title" class="chooseFontStyle">支付宝</span>
                    </van-cell>
                    <van-cell is-link center @click="weiXinActive">
                        <van-icon slot="icon" name="wechat" color="green" size="30px"/>
                        <van-icon slot="right-icon" name="checked" :color="weiXinColor" size="30px"/>
                        <span slot="title" class="chooseFontStyle">微信支付</span>
                    </van-cell>
                    <van-cell :border="otherCellshow" ></van-cell>
                    <van-cell :border="otherCellshow" ></van-cell>
                    <van-cell :border="otherCellshow" ></van-cell>
                    <van-cell :border="otherCellshow" ></van-cell>
                    <van-cell :border="otherCellshow" ></van-cell>
                    <van-cell :border="otherCellshow" ></van-cell>
                    <van-cell :border="otherCellshow" ></van-cell>
                    <van-cell :border="otherCellshow" ></van-cell>
                </van-cell-group>
            </van-popup>
        </van-cell-group>
        <van-submit-bar
                :price="3050"
                button-text="确认支付"
                button-type="primary"
        />
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
                payStyle: "支付宝"
            }
        },
        methods: {
            showPayStyle() {
                this.show = true;
            },
            closePopUp() {
                this.show = false;
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
                if(this.payStyle == "支付宝") {
                    this.aliColor = "green"
                    this.weiXinColor = "grey"
                }
                else {
                    this.aliColor = "grey"
                    this.weiXinColor = "green"
                }
            }
        }
    }
</script>

<style scoped>
    .payFontStyle{
        font-size: medium;
        font-family: "Microsoft YaHei";
    }
    .chooseFontStyle{
        font-family: "Microsoft YaHei";
        padding-left: 10px;
    }
</style>