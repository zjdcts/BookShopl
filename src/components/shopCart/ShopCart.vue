<template>
    <div>
        <van-nav-bar title="购物车" fixed></van-nav-bar>
        <div style="padding-top: 60px;"></div>
        <van-row v-for="(dishItem,index) in temp" :key="index">
            <div v-if="dishItem > 0">
                <van-card style="padding-top: 5px; padding-bottom: 5px; background-color: white; "
                          :num="Number(dishItem)"
                          :price="Number(dishList[index].price)"
                          :desc="dishList[index].description"
                >
                    <div slot="title" class="dishTitle">
                        {{dishList[index].name}}
                    </div>
                    <div slot="thumb" style="width: 80%;height: 80%">
                        <img class="imgStyle" :src="dishList[index].picture">
                    </div>
                    <div slot="footer">
                        <van-row type="flex" justify="space-between">
                            <van-col>
                                <span style="font-family: 'Microsoft YaHei', serif;font-size: 15px;line-height: 30px;color: #0086b3;" @click="goToDetail(dishItem)">查看详情</span>
                            </van-col>
                            <van-col>
                                <van-stepper disable-input
                                             integer
                                             min="0"
                                             max="1"
                                             :value="Number(dishItem)"
                                             @minus="subNum(index)"
                                >
                                </van-stepper>
                            </van-col>
                        </van-row>
                    </div>
                </van-card>
            </div>
        </van-row>
        <van-row>
            <TabBar></TabBar>
        </van-row>
        <van-row>
        <van-submit-bar
                :price="Number(commdityPrice)"
                button-text="提交订单"
                @submit="onSubmit"
                style="z-index: -1;padding-bottom: 50px"
        />
        </van-row>
    </div>
</template>

<script>
    import TabBar from "../base/TabBar";

    export default {
        name: "ShopCart",
        components: {TabBar},
        data() {
            return {
                dishList: Array,
                temp: Array,
                commdityPrice: Number,
                commdityNum:Number
            }
        },
        created(){
            this.dishList = JSON.parse(localStorage.getItem('choose_dish'));
            this.temp = JSON.parse(localStorage.getItem('user_dish_num'));
            this.commdityPrice = Number(localStorage.getItem('commidity_price'));
            this.commdityNum = Number(localStorage.getItem('commidity_num'));
        },
        methods: {
            onSubmit(){
                if (this.commdityNum !== 0)
                    this.$router.push({name: 'orderinfo'});
                else {
                    this.$dialog.alert({
                        message: '你还没有选择商品！'
                    })
                }
            },
            subNum(index){
                this.commdityNum--;
                localStorage.setItem('commidity_num',String(this.commdityNum));
                this.commdityPrice -= this.dishList[index].price * 100;
                localStorage.setItem('commidity_price', String(this.commdityPrice));
                this.$set(this.temp, index, this.temp[index]-1);
                localStorage.setItem('user_dish_num', JSON.stringify(this.temp));
                if(this.dishList[index] !== '')
                    this.dishList[index] = '';
                localStorage.setItem('choose_dish', JSON.stringify(this.dishList));
            }
        }
    }
</script>

<style scoped>

</style>