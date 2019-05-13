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
                <span style="font-family: 'Microsoft YaHei';font-size: xx-large">欢迎注册！</span>
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
                checkCode: String,
                password: String,
                isLegal: Boolean,
                dialogMessage: String,
                isCheckCode: Boolean,
                checkcodeTime: Number
            }
        },
        created() {
            this.checkCode = '';
            this.password = ''
            this.dialogMessage = '';
            this.isLegal = false;
            this.isCheckCode = true;
            this.checkcodeTime = 60;
            this.$store.state.phoneNumber = '';
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
                if (this.$store.state.phoneNumber == 11) {
                    this.isLegal = true;
                    for (var i = 0; i < this.$store.state.phoneNumber.length; i++) {
                        if (this.$store.state.phoneNumber[i] < '0' || this.$store.state.phoneNumber[i] > '9') {
                            this.isLegal = false;
                            break;
                        }
                    }
                }
            },
            checkCodeblur(value) {
                this.checkCode = value;
            },
            passwordblur(value) {
                this.password = value;
            },
            register() {
                if (this.$store.state.phoneNumber == '' && this.checkCode == '' && this.password == '') {
                    this.dialogMessage = '手机号、验证码和密码不能为空';
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
                } else if (this.password == '') {
                    this.dialogMessage = '密码不能为空';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else if (this.password.length < 6) {
                    this.dialogMessage = '密码不能少于6位';
                    this.$dialog.alert({
                        message: this.dialogMessage
                    })
                } else {
                    this.$router.push({name: 'announcement'});
                }
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
            }
        }
    }
</script>

<style scoped>
    html {
        font-size: calc(100vw);
    }
</style>