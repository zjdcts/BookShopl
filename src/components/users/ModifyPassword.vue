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
                <span style="font-family: 'Microsoft YaHei',serif;font-size: xx-large">修改密码</span>
            </van-row>
        </div>
        <div style="padding-top: 4rem; font-family: 'Microsoft YaHei',serif">
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <van-cell-group>
                        <van-field
                                v-model="$store.state.oldPassword"
                                label="原密码"
                                placeholder="请输入原密码"
                                type="password"
                                size="large"
                                @input="passwordblur"
                        ></van-field>
                        <van-field
                                v-model="$store.state.newPassword"
                                label="新密码"
                                placeholder="请输入新密码"
                                type="password"
                                size="large"
                                @input="newPasswordblur"
                        ></van-field>
                        <van-field
                                v-model="$store.state.checkCode"
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
                    </van-cell-group>

                    <div style="padding-top: 2rem">
                        <van-button style="background-color: green; color: white" round size="large"
                                    @click="modifyPassword">确认
                        </van-button>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ModifyPassword",
        data() {
            return {
                isCheckCode: true,
                host: this.$store.state.host,
                checkcodeTime: Number
            }
        },
        created() {
            this.$store.state.oldPassword = '';
            this.$store.state.newPassword = '';
            this.$store.state.checkCode = '';
        },
        methods: {
            passwordblur(value) {
                this.$store.state.oldPassword = value;
            },
            newPasswordblur(value) {
                this.$store.state.newPassword = value;
            },
            checkCodeblur(value) {
                this.$store.state.checkCode = value;
            },
            sendCheckCode() {
                if (this.$store.state.oldPassword === '') {
                    this.$dialog.alert({
                        message: '原密码为空！'
                    })
                } else if (this.$store.state.newPassword === '') {
                    this.$dialog.alert({
                        message: '新密码为空！'
                    })
                } else if (this.$store.state.newPassword.length < 6) {
                    this.$dialog.alert({
                        message: '新密码长度不能少于6位！'
                    })
                } else {
                    this.$axios.post(this.host + '/users/code/', {
                        "phone_number": this.$store.state.phoneNumber,
                        "purpose": 2
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
            onClickLeft() {
                this.$router.go(-1);
            },
            modifyPassword() {
                this.$axios({
                    url: this.host + '/users/changepassword/' + this.$store.state.phoneNumber + '/',
                    hearts: {
                        "Authorization": "Bearer " + localStorage.getItem('currentUser_token')
                    },
                    data: {
                        "old_password": this.$store.state.oldPassword,
                        "new_password": this.$store.state.newPassword,
                        "code": this.$store.state.checkCode
                    }
                })
                    .then(response => {
                        // eslint-disable-next-line no-console
                        console.log(response);
                        this.$dialog.alert({
                            message: '修改成功！'
                        });
                        this.$router.push({name: 'user'});
                    })
                    .catch(error => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        this.$dialog.alert({
                            message: '原密码错误！'
                        });
                    })
            }
        }
    }
</script>

<style scoped>

</style>