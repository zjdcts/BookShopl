<template>
    <div>
        <van-nav-bar
                title="搜你想搜"
                left-arrow
                @click-left="onClickLeft"
        />
        <van-search
                v-model="content"
                placeholder="请输入搜索关键词"
                use-action-slot
                show-action
                shape="round"
                @clear="clear"
                @cancel="cancel"
                @search="onSearch"
        >
            <span v-if="!isSearch" slot="action" style="line-height: 34px; height: 100%; width: 100px;"
                  @click="onSearch">
                <van-row type="flex" justify="center">
                    <van-col>
                        <span>搜索</span>
                    </van-col>
                </van-row>
            </span>
        </van-search>
        <div style="padding-top: 20px"></div>
        <van-row type="flex" justify="center" v-if="!isHaveResult">
            <span style="font-size: x-large; color: lightgray">暂无相关结果</span>
        </van-row>
        <van-row type="flex" justify="center" v-if="isSearch">
            <van-col span="23">
                <van-row>
                    <div v-for="(dishItem,index) in dishList" :key="index">
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
                                        <span style="font-family: 'Microsoft YaHei', serif;font-size: 15px;line-height: 30px;color: #0086b3;"
                                              @click="goToDetail(dishItem)">查看详情</span>
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
                </van-row>
            </van-col>
        </van-row>
        <van-row type="flex" justify="center" v-if="totalItems > 0" style="padding-top: 20px">
            <van-col span="22">
                <van-pagination
                        v-model="currentPage"
                        :total-items="totalItems"
                        :show-page-size="3"
                        force-ellipses
                        @change="changePage"
                />
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: "search",
        data() {
            return {
                content: String,
                isSearch: Boolean,
                dishList: Array,
                isHaveResult: Boolean,
                currentPage: Number,
                totalItems: Number,
                userDishNum: [],
                chooseDish: [],
                commdityNum: Number,
                commdityPrice: Number
            }
        },
        created() {
            this.isSearch = false;
            this.currentPage = 1;
            this.isHaveResult = true;
            this.totalItems = 0;
            if(localStorage.getItem('content') === null || localStorage.getItem('content') === ''){
                this.content = '';
                localStorage.setItem('content','');
                localStorage.setItem('current_page','1');
            } else {
                this.content = localStorage.getItem('content');
                this.isSearch = true;
                if(localStorage.getItem('current_page') !== null)
                    this.currentPage = Number(localStorage.getItem('current_page'));
                this.$axios.get('/books/list/?page='+this.currentPage+'&search='+this.content)
                    .then(response => {
                        if (response.data.count === 0)
                            this.isHaveResult = false;
                        else {
                            this.isHaveResult = true;
                            this.totalItems = response.data.count;
                            this.dishList = response.data.results;
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
                                    if (this.userDishNum[this.dishList[i].id] >= 0)
                                        continue;
                                    this.userDishNum[this.dishList[i].id] = 0;
                                    this.chooseDish[this.dishList[i].id] = '';
                                }
                                localStorage.setItem('user_dish_num', JSON.stringify(this.userDishNum));
                                localStorage.setItem('choose_dish', JSON.stringify(this.chooseDish));
                            }
                        }
                    });
            }
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
        updated() {
            if (this.content === "") {
                this.isSearch = false;
                this.totalItems = 0;
                this.totalItems = 0;
            }
            localStorage.setItem('content',this.content);
        },
        methods: {
            onClickLeft() {
                localStorage.removeItem('content');
                localStorage.removeItem('current_page');
                this.$router.push({name: 'announcement',params:{id:0}});
            },
            onSearch() {
                localStorage.setItem('content',this.content);
                this.isSearch = true;
                this.currentPage = 1;
                this.$axios.get('/books/list/?search=' + this.content)
                    .then(response => {
                        if (response.data.count === 0)
                            this.isHaveResult = false;
                        else {
                            this.isHaveResult = true;
                            this.totalItems = response.data.count;
                            this.dishList = response.data.results;
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
                                    if (this.userDishNum[this.dishList[i].id] !== null && this.userDishNum[this.dishList[i].id] !== undefined) {
                                        continue;
                                    }
                                    this.userDishNum[this.dishList[i].id] = 0;
                                    this.chooseDish[this.dishList[i].id] = '';
                                }
                                localStorage.setItem('user_dish_num', JSON.stringify(this.userDishNum));
                                localStorage.setItem('choose_dish', JSON.stringify(this.chooseDish));
                            }
                        }
                    });
            },
            clear() {
                this.content = '';
                this.totalItems = 0;
                this.isSearch = false;
            },
            cancel() {
                this.isSearch = false;
            },
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
                if (this.chooseDish[index.id] === '')
                    this.chooseDish[index.id] = index;
                localStorage.setItem('choose_dish', JSON.stringify(this.chooseDish));
                this.$toast.success('加入购物车');
            },
            subNum: function (index) {
                this.commdityNum -= 1;
                localStorage.setItem('commidity_num', String(this.commdityNum));
                this.commdityPrice -= index.price * 100;
                localStorage.setItem('commidity_price', String(this.commdityPrice));
                this.$set(this.userDishNum, index.id, this.userDishNum[index.id]-1);
                localStorage.setItem('user_dish_num', JSON.stringify(this.userDishNum));
                if (this.chooseDish[index.id] !== '')
                    this.chooseDish[index.id] = '';
                localStorage.setItem('choose_dish', JSON.stringify(this.chooseDish));
                if (this.commdityNum === 0)
                    this.show = false;
                this.$toast.fail('从购物车移除');
            },
            goToDetail(value){
                this.$router.push({name:'bookdetail',params:{data:value}});
            },
            changePage() {
                localStorage.setItem('current_page',String(this.currentPage));
                this.$axios.get('/books/list/?page='+this.currentPage+'&search='+this.content)
                    .then(response => {
                        this.dishList = response.data.results;
                        for (let i in this.dishList) {
                            if (this.userDishNum[this.dishList[i].id] >= 0)
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
            }
        }
    }
</script>

<style scoped>

</style>