<template>
    <div class="note" :style="note">
        <div>
        <van-nav-bar
                right-text="帮助"
                left-arrow
                border
                @click-left="onClickLeft"
                @click-right="onClickRight"
                style="opacity: 0.5"
        />
        <div style="padding-top: 3rem; opacity: 0.7">
            <van-row type="flex" justify="center">
                <span style="font-family: 'Microsoft YaHei',serif;font-size: xx-large">欢迎登录！</span>
            </van-row>
        </div>
        <div style="padding-top: 4rem; font-family: 'Microsoft YaHei',serif">
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <van-cell-group style="opacity: 0.7">
                        <van-field
                                v-model="$store.state.phoneNumber"
                                label="手机号"
                                placeholder="请输入手机号"
                                size="large"
                                @input="phoneNumberblur"
                        ></van-field>
                        <van-field
                                v-model="$store.state.checkCode"
                                v-if="!isPasswordLogin"
                                center
                                clearable
                                label="短信验证码"
                                placeholder="请输入短信验证码"
                                size="large"
                                @input="checkCodeblur"
                        >
                            <van-button v-if="isCheckCode" slot="button" size="small" type="primary"
                                        @click="sendCheckCode">发送验证码
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
                    <van-row type="flex" justify="space-around" style="opacity: 0.7;">
                        <van-col span="15">
                            <a v-if="!isPasswordLogin"
                               class="fontStyle"
                               @click="changeLoginWay">密码登录请点这:)</a>
                            <a v-else
                               class="fontStyle"
                               @click="changeLoginWay">验证码登录请点这:)</a>
                        </van-col>
                        <van-col span="7">
                            <a class="fontStyle" @click="goToRegister">新用户请点这:)</a>
                        </van-col>
                    </van-row>
                    <div style="padding-top: 2rem; opacity: 0.7">
                        <van-button style="background-color: green; color: white" round size="large" @click="login">登录
                        </van-button>
                    </div>
                </van-col>
            </van-row>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                isLegal: Boolean,
                isCheckCode: Boolean,
                checkcodeTime: Number,
                timer: null,
                isPasswordLogin: Boolean,
                host: this.$store.state.host,
                note: {
                    backgroundImage: "url(" + require("../dishes/picture/background.jpg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "25px auto",
                    height: '100vh'
                }
            }
        },
        created() {
            this.isLegal = false;
            this.isPasswordLogin = false;
            this.checkcodeTime = 60;
            this.isCheckCode = true;
            this.$store.state.phoneNumber = '';
            this.$store.state.password = '';
            this.$store.state.checkCode = '';
        },
        methods: {
            onClickLeft() {
                this.$router.push({name: 'announcement'});
            },
            onClickRight() {

            },
            phoneNumberblur(value) {
                this.isLegal = false;
                this.$store.state.phoneNumber = value;
                if (this.$store.state.phoneNumber.length === 11) {
                    this.isLegal = true;
                    for (let i = 0; i < this.$store.state.phoneNumber.length; i++) {
                        if (this.$store.state.phoneNumber[i] < '0' || this.$store.state.phoneNumber[i] > '9') {
                            this.isLegal = false;
                            break;
                        }
                    }
                }
            },
            passwordblur(value) {
                this.$store.state.password = value;
            },
            checkCodeblur(value) {
                this.$store.state.checkCode = value;
            },
            sendCheckCode() {
                if (this.$store.state.phoneNumber === '') {
                    this.$dialog.alert({
                        message: '未填写手机号！'
                    })
                } else if (!this.isLegal) {
                    this.$dialog.alert({
                        message: '手机号不合法！'
                    })
                } else {
                    this.$axios.post(this.host + '/users/code/', {
                        "phone_number": this.$store.state.phoneNumber,
                        "purpose": 1
                    })
                        .then(data => {
                            // eslint-disable-next-line no-console
                            console.log(data);
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
                        })
                }
            },
            login() {
                if (this.$store.state.phoneNumber === '') {
                    this.dialogMessage = '手机号不能为空';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else if (!this.isLegal) {
                    this.dialogMessage = '手机号格式不正确';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else if (!this.isPasswordLogin && this.$store.state.checkCode === '') {
                    this.dialogMessage = '验证码不能为空';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else if (this.isPasswordLogin && this.$store.state.password === '') {
                    this.dialogMessage = '密码不能为空';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else {
                    if (this.isPasswordLogin) {
                        this.$axios.post(this.host + '/users/login/password/', {
                            phone_number: this.$store.state.phoneNumber,
                            password: this.$store.state.password
                        })
                            .then(data => {
                                // eslint-disable-next-line no-console
                                console.log(data);
                                this.$store.commit("setUser", {
                                        "user_name": data.data.username,
                                        "user_token": data.data.access,
                                        "refresh_token": data.data.refresh
                                    },
                                    this.$store.state.userPhoneNumber = data.data.username
                                );
                                this.$router.push({name: 'announcement'});
                            })
                            .catch(error => {
                                // eslint-disable-next-line no-console
                                console.log(error);
                                this.$dialog.alert({
                                    message: '密码错误！'
                                })
                            })
                    } else {
                        this.$axios.post(this.host + '/users/login/code/', {
                            phone_number: this.$store.state.phoneNumber,
                            code: this.$store.state.checkCode
                        })
                            .then(data => {
                                this.$store.commit("setUser", {
                                        "user_name": data.data.username,
                                        "user_token": data.data.access,
                                        "refresh_token": data.data.refresh
                                    },
                                    this.$store.state.userPhoneNumber = data.data.username
                                );
                                this.$router.push({name: 'announcement'});
                            })
                            .catch(error => {
                                // eslint-disable-next-line no-console
                                console.log(error);
                                this.$dialog.alert({
                                    message: '密码错误！'
                                })
                            })
                    }
                }
            },
            goToRegister() {
                this.$router.push({name: 'register'});
            },
            changeLoginWay() {
                this.isPasswordLogin = !this.isPasswordLogin;
            }
        }
    }
</script>

<style scoped>
    html {
        font-size: calc(100vw);
    }

    .fontStyle {
        color: #fed76f;
        padding-top: 5px;
        text-decoration: underline;
        font-family: 'Microsoft YaHei',serif;
    }
</style>