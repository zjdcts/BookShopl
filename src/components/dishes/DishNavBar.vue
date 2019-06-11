<template>
    <div>
        <van-row>
            <van-col span="7" style="font-family: 'Microsoft YaHei',serif; font-size: 30px; padding-bottom: 60px">
                <van-badge-group :active-key="activeKey" @change="onChange" id="badge-group">
                    <van-badge v-for="index in dishType" :title="index" :key="index">
                    </van-badge>
                </van-badge-group>
            </van-col>
            <van-col span="17">
                <van-row>
                    <div v-for="(dishItem,index) in dishList" :key="index">
                        <div v-if="nowDishType === dishItem.category">
                            <van-card style="background-color: white"
                                      :num="getDishNum(dishItem.id)"
                                      :price="dishItem.price"
                                      :desc="dishItem.description"
                            >
                                <div slot="title" class="dishTitle">
                                    {{dishItem.name}}
                                </div>
                                <div slot="thumb" style="width: 90px; height: 90px;">
                                    <img class="imgStyle" :src="dishItem.picture" alt="dish_picture">
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
                                                         :value="getDishNum(dishItem.id)"
                                                         @plus="addNum(dishItem)"
                                                         @minus="subNum(dishItem)"
                                            >
                                            </van-stepper>
                                        </van-col>
                                    </van-row>
                                </div>
                            </van-card>
                        </div>
                    </div>
                </van-row>
                <van-row type="flex" justify="center" style="padding-top: 10px" v-show="totalItems > 0">
                        <van-pagination
                                v-model="currentPage"
                                :total-items="totalItems"
                                :show-page-size="3"
                                force-ellipses
                                @change="changePage"
                        />
                </van-row>
            </van-col>
        </van-row>
        <van-submit-bar
                :price="Number(commdityPrice)"
                button-text="提交订单"
                @submit="goToOrderInfo"
        >
            <van-icon name="shopping-cart-o" size="25px" :info="Number(commdityNum)"
                      style="line-height: 50px; padding-left: 20px" @click="showShopCart"/>
        </van-submit-bar>
        <van-popup v-model="show" class="popUp">
            <van-cell :title="'已选'+commdityNum+'件商品'"></van-cell>
            <div v-for="(dishItem,index) in userDishNum" :key="index">
                <div v-if="dishItem > 0">
                    <van-cell-group>
                        <van-cell :title="chooseDish[index].name">
                            <div slot="right-icon">
                                <van-stepper disable-input
                                             integer
                                             min="0"
                                             :value="dishItem"
                                             @plus="addNum(index)"
                                             @minus="subNum(index)"
                                >
                                </van-stepper>
                            </div>
                        </van-cell>
                    </van-cell-group>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
    export default {
        name: "dishNavBar",
        data() {
            return {
                dishType: [],
                activeKey: Number,
                nowDishType: String,
                show: Boolean,
                temp: Number,
                isFixed: String,
                dishList: Array,
                userDishNum: [],
                dishCount: Number,
                commdityNum: Number,
                commdityPrice: Number,
                chooseDish: [],
                currentPage: Number,
                totalItems: Number,
                show_page_size: Number,
                test: Number,
            }
        },
        created() {
            this.activeKey = 0;
            this.show = false;
            this.temp = '';
            this.currentPage = 1;
            this.totalItems = 0;
            this.$axios.get('/books/category/')
                .then(response => {
                    for(let i in response.data){
                        if(response.data[i].indexOf('&')>=1)
                            continue;
                        this.dishType.push(response.data[i]);
                    }
                    this.nowDishType = this.dishType[0];
                    this.$axios.get('/books/list/?category=' + this.dishType[0])
                        .then(response => {
                            this.dishList = response.data.results;
                            this.totalItems = response.data.count;
                            if (localStorage.getItem('user_dish_num') === null) {
                                for (let i in this.dishList) {
                                    if (this.userDishNum[this.dishList[i].id] !== null && this.userDishNum[this.dishList[i].id] !== undefined)
                                        continue;
                                    this.userDishNum[this.dishList[i].id] = 0;
                                    this.chooseDish[this.dishList[i].id] = '';
                                }
                                localStorage.setItem('user_dish_num', JSON.stringify(this.userDishNum));
                                localStorage.setItem('choose_dish', JSON.stringify(this.chooseDish));
                            } else {
                                this.userDishNum = JSON.parse(localStorage.getItem('user_dish_num'));
                                this.chooseDish = JSON.parse(localStorage.getItem('choose_dish'));
                                for (let i in this.dishList) {
                                    if (this.userDishNum[this.dishList[i].id] !== null && this.userDishNum[this.dishList[i].id] !== undefined)
                                        continue;
                                    this.userDishNum[this.dishList[i].id] = 0;
                                    this.chooseDish[this.dishList[i].id] = '';
                                }
                                localStorage.setItem('user_dish_num', JSON.stringify(this.userDishNum));
                                localStorage.setItem('choose_dish', JSON.stringify(this.chooseDish));
                            }
                        })
                        .catch(error => {
                            // eslint-disable-next-line no-console
                            console.log(error);
                        });
                });
            if (localStorage.getItem('commidity_num') === null) {
                this.commdityNum = 0;
                localStorage.setItem('commidity_num', '0');
            } else {
                this.commdityNum = Number(localStorage.getItem('commidity_num'));
            }
            if (localStorage.getItem('commidity_price') === null) {
                this.commdityPrice = 0;
                localStorage.setItem('commidity_price', '0');
            } else {
                this.commdityPrice = Number(localStorage.getItem('commidity_price'));
            }
        },
        methods: {
            getDishNum(index) {
                return this.userDishNum[index];
            },
            addNum: function (index) {
                this.commdityNum += 1;
                localStorage.setItem('commidity_num', String(this.commdityNum));
                this.commdityPrice += index.price * 100;
                localStorage.setItem('commidity_price', String(this.commdityPrice));
                this.$set(this.userDishNum, index.id, this.userDishNum[index.id]+1);
                localStorage.setItem('user_dish_num', JSON.stringify(this.userDishNum));
                if(this.chooseDish[index.id] === '')
                    this.chooseDish[index.id] = index;
                localStorage.setItem('choose_dish', JSON.stringify(this.chooseDish));
            },
            subNum: function (index) {
                this.commdityNum -= 1;
                localStorage.setItem('commidity_num', String(this.commdityNum));
                this.commdityPrice -= index.price * 100;
                localStorage.setItem('commidity_price', String(this.commdityPrice));
                this.$set(this.userDishNum, index.id, this.userDishNum[index.id]-1);
                localStorage.setItem('user_dish_num', JSON.stringify(this.userDishNum));
                if(this.chooseDish[index.id] !== '')
                    this.chooseDish[index.id] = '';
                localStorage.setItem('choose_dish', JSON.stringify(this.chooseDish));
                if (this.commdityNum === 0)
                    this.show = false;
            },
            onChange(key) {
                this.activeKey = key;
                this.nowDishType = this.dishType[key];
                this.currentPage = 1;
                this.$axios.get('/books/list/?category=' + this.nowDishType)
                    .then(response => {
                        this.dishList = response.data.results;
                        for (let i in this.dishList) {
                            if (this.userDishNum[this.dishList[i].id] !== null && this.userDishNum[this.dishList[i].id] !== undefined)
                                continue;
                            this.userDishNum[this.dishList[i].id] = 0;
                            this.chooseDish[this.dishList[i].id] = '';
                        }
                        localStorage.setItem('user_dish_num', JSON.stringify(this.userDishNum));
                        localStorage.setItem('choose_dish', JSON.stringify(this.chooseDish));
                    })
                    .catch(error => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    });
            },
            goToOrderInfo() {
                if (this.commdityNum !== 0)
                    this.$router.push({name: 'orderinfo'});
                else {
                    this.$dialog.alert({
                        message: '你还没有选择商品！'
                    })
                }
            },
            showShopCart() {
                if (this.commdityNum !== 0)
                    this.show = true;
                else {
                    this.$dialog.alert({
                        message: '你还没有选择商品！'
                    })
                }
            },
            changePage() {
                this.$axios.get('/books/list/?page=' + this.currentPage + '&category=' + this.nowDishType)
                    .then(response => {
                        this.dishList = response.data.results;
                        for (let i in this.dishList) {
                            if (this.userDishNum[this.dishList[i].id] !== null && this.userDishNum[this.dishList[i].id] !== undefined)
                                continue;
                            this.userDishNum[this.dishList[i].id] = 0;
                            this.chooseDish[this.dishList[i].id] = '';
                        }
                        localStorage.setItem('user_dish_num', JSON.stringify(this.userDishNum));
                        localStorage.setItem('choose_dish', JSON.stringify(this.chooseDish));
                    })
                    .catch(error => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    });
            },
            goToDetail(value){
                this.$router.push({name:'bookdetail',params:{data:value}});
            }
        }
    }
</script>

<style scoped>
    html {
        font-size: calc(100vw);
    }

    .dishTitle {
        font-size: 15px;
        font-style: normal;
        font-family: Consolas, serif;
        font-weight: bold;
    }

    .dishNum {
        height: 100%;
        padding-left: 0.8rem;
        font-size: 0.9rem;
        line-height: 50px;
    }

    .imgStyle {
        height: 100%;
        width: 100%;
        border-radius: 5px;
    }

    .popUp {
        width: 100vw;
    }
</style>