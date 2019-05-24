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
                <span style="font-family: 'Microsoft YaHei',serif;font-size: xx-large">欢迎注册！</span>
            </van-row>
        </div>
        <div style="padding-top: 4rem">
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
                                v-model="$store.state.checkCode"
                                center
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
                                label="密码"
                                v-model="$store.state.password"
                                placeholder="请输入密码（不少于6位）"
                                size="large"
                                type="password"
                                @input="passwordblur"
                        ></van-field>
                    </van-cell-group>
                    <div style="padding-top: 2rem">
                        <van-button style="background-color: #fed76f;" round size="large" @click="register">注册
                        </van-button>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                isLegal: Boolean,
                dialogMessage: String,
                isCheckCode: Boolean,
                checkcodeTime: Number,
                host: this.$store.state.host,
                noUse: null
            }
        },
        created() {
            this.dialogMessage = '';
            this.isLegal = false;
            this.isCheckCode = true;
            this.checkcodeTime = 60;
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
                // eslint-disable-next-line no-console
                //console.log(this.$store.state.phoneNumber);
                if (this.$store.state.phoneNumber.length === 11) {
                    this.isLegal = true;
                    for (let i = 0; i < this.$store.state.phoneNumber.length; i++) {
                        if (this.$store.state.phoneNumber[i] < '0' || this.$store.state.phoneNumber[i] > '9') {
                            this.isLegal = false;
                            break;
                        }
                    }
                }
                // eslint-disable-next-line no-console
                //console.log(this.isLegal);
            },
            checkCodeblur(value) {
                this.$store.state.checkCode = value;
            },
            passwordblur(value) {
                this.$store.state.password = value;
            },
            register() {
                if (this.$store.state.phoneNumber === '' && this.checkCode === '' && this.password === '') {
                    this.dialogMessage = '手机号、验证码和密码不能为空';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else if (this.$store.state.phoneNumber === '') {
                    this.dialogMessage = '手机号不能为空';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else if (!this.isLegal) {
                    this.dialogMessage = '手机号格式不正确';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else if (this.$store.state.checkCode === '') {
                    this.dialogMessage = '验证码不能为空';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else if (this.$store.state.password === '') {
                    this.dialogMessage = '密码不能为空';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else if (this.$store.state.password.length < 6) {
                    this.dialogMessage = '密码不能少于6位';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else {
                    this.$axios.post(this.host + '/users/register/', {
                        phone_number: this.$store.state.phoneNumber,
                        code: this.$store.state.checkCode,
                        password: this.$store.state.password
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
                        .catch(function (error) {
                            // eslint-disable-next-line no-console
                            //console.log(error);
                            this.noUse = error;
                            /*this.$dialog.alert({
                                message: '此手机号已注册,请直接登录！'
                            });
                            this.$store.phoneNumber = '未登录'*/
                        })
                }
            },
            cendCheckCode() {
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
                        "purpose": 0
                    })
                        .then(data => {
                            // eslint-disable-next-line no-console
                            //console.log(data);
                            this.noUse = data;
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
                        .catch(error => {
                            // eslint-disable-next-line no-console
                            console.log(error);
                            this.noUse = error;
                            this.$dialog.alert({
                                message: '此手机号已注册,请直接登录！'
                            })
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
</style>