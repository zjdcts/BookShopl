<template>
    <div>
        <van-nav-bar
                right-text="帮助"
                left-arrow
                border
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        <div style="padding-top: 3rem">
            <van-row type="flex" justify="center">
                <span style="font-family: 'Microsoft YaHei';font-size: xx-large">欢迎登录！</span>
            </van-row>
        </div>
        <div style="padding-top: 4rem; font-family: 'Microsoft YaHei'">
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <van-cell-group>
                        <van-field
                                label="手机号"
                                placeholder="请输入手机号"
                                size="large"
                                @input="phoneNumberblur"
                        ></van-field>
                        <van-field
                                center
                                clearable
                                label="短信验证码"
                                placeholder="请输入短信验证码"
                                size="large"
                                @input="checkCodeblur"
                        >
                            <van-button v-if="isCheckCode" slot="button" size="small" type="primary" @click="cendCheckCode">发送验证码</van-button>
                            <van-button v-else slot="button" size="small" disabled style="background-color: lightgrey;">重新发送({{checkcodeTime}}s)</van-button>
                        </van-field>
                    </van-cell-group>
                    <van-row type="flex" justify="end">
                        <a style="color: lightgrey; padding-top: 5px; text-decoration: underline; font-family: 'Microsoft YaHei'" @click="goToRegister">新用户请点这:)</a>
                    </van-row>
                    <div style="padding-top: 2rem">
                        <van-button style="background-color: green; color: white" round size="large" @click="login">登录
                        </van-button>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                phoneNumber: String,
                checkCode: String,
                isLegal: Boolean,
                dialogMessage: String,
                isCheckCode:Boolean,
                checkcodeTime:Number,
                timer: null
            }
        },
        created() {
            this.phoneNumber = '';
            this.checkCode = '';
            this.dialogMessage = '';
            this.isLegal = false;
            this.checkCode = '';
            this.checkcodeTime = 60;
            this.isCheckCode=true;
        },
        methods: {
            onClickLeft() {
                this.$router.push({name: 'announcement'});
            },
            onClickRight() {

            },
            phoneNumberblur(value) {
                this.phoneNumber = value;
                // eslint-disable-next-line no-console
                //console.log(this.phoneNumber);
                if (this.phoneNumber.length == 11) {
                    this.isLegal = true;
                    for (var i = 0; i < this.phoneNumber.length; i++) {
                        if (this.phoneNumber[i] < '0' || this.phoneNumber[i] > '9') {
                            this.isLegal = false;
                            break;
                        }
                    }
                }
            },
            checkCodeblur(value) {
                this.checkCode = value;
            },
            cendCheckCode(){
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.checkcodeTime = TIME_COUNT;
                    this.isCheckCode = false;
                    this.timer = setInterval(() => {
                        if (this.checkcodeTime > 0 && this.checkcodeTime <= TIME_COUNT) {
                            this.checkcodeTime--;
                        } else {
                            this.isCheckCode = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
            login() {
                if (this.phoneNumber == '' && this.checkCode == '') {
                    this.dialogMessage = '手机号和验证码不能为空';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else if (this.phoneNumber == '') {
                    this.dialogMessage = '手机号不能为空';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else if (!this.isLegal) {
                    this.dialogMessage = '手机号格式不正确';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else if (this.checkCode == '') {
                    this.dialogMessage = '验证码不能为空';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else {
                    this.$router.push({name:'announcement'});
                }
            },
            goToRegister(){
                this.$router.push({name:'register'});
            }
        }
    }
</script>

<style scoped>
    html {
        font-size: calc(100vw);
    }
</style>