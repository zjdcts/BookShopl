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
                                v-model="$store.state.phoneNumber"
                                label="手机号"
                                placeholder="请输入手机号"
                                size="large"
                                @input="phoneNumberblur"
                        ></van-field>
                        <van-field
                                v-if="!isPasswordLogin"
                                center
                                clearable
                                label="短信验证码"
                                placeholder="请输入短信验证码"
                                size="large"
                                @input="checkCodeblur"
                        >
                            <van-button v-if="isCheckCode" slot="button" size="small" type="primary"
                                        @click="cendCheckCode">发送验证码
                            </van-button>
                            <van-button v-else slot="button" size="small" disabled style="background-color: lightgrey;">
                                重新发送({{checkcodeTime}}s)
                            </van-button>
                        </van-field>
                        <van-field
                                v-else
                                label="密码"
                                placeholder="请输入密码"
                                type="password"
                                size="large"
                                @input="passwordblur"
                        ></van-field>
                    </van-cell-group>
                    <van-row type="flex" justify="space-around">
                        <van-col span="15">
                            <a v-if="!isPasswordLogin"
                               style="color: lightgrey; padding-top: 5px; text-decoration: underline; font-family: 'Microsoft YaHei'"
                               @click="changeLoginWay">密码登录请点这:)</a>
                            <a v-else
                               style="color: lightgrey; padding-top: 5px; text-decoration: underline; font-family: 'Microsoft YaHei'"
                               @click="changeLoginWay">验证码登录请点这:)</a>
                        </van-col>
                        <van-col span="7">
                            <a style="color: lightgrey; padding-top: 5px; text-decoration: underline; font-family: 'Microsoft YaHei'"
                               @click="goToRegister">新用户请点这:)</a>
                        </van-col>
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
                checkCode: String,
                isLegal: Boolean,
                dialogMessage: String,
                isCheckCode: Boolean,
                checkcodeTime: Number,
                timer: null,
                isPasswordLogin: false,
                password: String
            }
        },
        created() {
            this.checkCode = '';
            this.dialogMessage = '';
            this.isLegal = false;
            this.checkCode = '';
            this.checkcodeTime = 60;
            this.isCheckCode = true;
            this.$store.state.phoneNumber = '';
            this.password = ''
        },
        methods: {
            onClickLeft() {
                this.$router.push({name: 'announcement'});
            },
            onClickRight() {

            },
            phoneNumberblur(value) {
                this.$store.state.phoneNumber = value;
                // eslint-disable-next-line no-console
                //console.log(this.$store.state.phoneNumber);
                if (this.$store.state.phoneNumber.length == 11) {
                    this.isLegal = true;
                    for (var i = 0; i < this.$store.state.phoneNumber.length; i++) {
                        if (this.$store.state.phoneNumber[i] < '0' || this.$store.state.phoneNumber[i] > '9') {
                            this.isLegal = false;
                            break;
                        }
                    }
                }
            },
            passwordblur(value) {
                this.password = value;
            },
            checkCodeblur(value) {
                this.checkCode = value;
            },
            cendCheckCode() {
                if (this.$store.state.phoneNumber == '') {
                    this.$dialog.alert({
                        message: '未填写手机号！'
                    })
                } else if (!this.isLegal) {
                    this.$dialog.alert({
                        message: '手机号不合法！'
                    })
                } else {
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
                }
            },
            login() {
                if (this.$store.state.phoneNumber == '' && this.checkCode == '') {
                    this.dialogMessage = '手机号和验证码不能为空';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else if (this.$store.state.phoneNumber == '') {
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
                    this.$router.push({name: 'announcement'});
                }
            },
            goToRegister() {
                this.$router.push({name: 'register'});
            },
            changeLoginWay() {
                if (this.isPasswordLogin) {
                    this.isPasswordLogin = false;
                } else {
                    this.isPasswordLogin = true;
                }
            }
        }
    }
</script>

<style scoped>
    html {
        font-size: calc(100vw);
    }
</style>