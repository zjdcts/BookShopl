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
        <div style="padding-top: 4rem">
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <van-cell-group>
                        <van-field
                                v-model="phone"
                                label="手机号"
                                placeholder="请输入手机号"
                                size="large"
                        ></van-field>
                        <van-field
                                v-model="sms"
                                center
                                clearable
                                label="短信验证码"
                                placeholder="请输入短信验证码"
                                size="large"
                        >
                            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
                        </van-field>
                    </van-cell-group>
                    <div style="padding-top: 2rem">
                        <van-button style="background-color: green; color: white" round size="large">登录</van-button>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        methods: {
            onClickLeft(){
                this.$router.push({name:'announcement'});
            }
        }
    }
</script>

<style scoped>
    html {
        font-size: calc(100vw);
    }
</style>