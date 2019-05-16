<template>
    <div>
        <van-nav-bar
                title="我的预订"
                left-arrow
                @click-left="onClickLeft"
        />
        <div v-if="!isHaveBook">
            <van-row type="flex" justify="center">
                <span style="padding-top: 20px; color: lightgrey">暂无预定记录</span>
            </van-row>
            <div style="padding-top: 20px">
                <van-row type="flex" justify="center">
                    <van-col span="22">
                        <van-button style="background-color: #fed76f;" size="large" round @click="goToChooseTable">
                            餐桌预定
                        </van-button>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div v-else>
            <van-row type="flex" justify="center">
                <van-col span="22">
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多了"
                            @load="onLoad"
                    >
                        <div v-for="(item,index) in tableList" :key="index">
                            <van-cell is-link :arrow-direction="cellDirection[index]==0?'':'down'"
                                      @click="changeDirection(index)"
                            >
                                <span slot="title"
                                      style="padding-left: 20px; line-height: 50px">{{item.table}}号桌</span>
                                <span slot="title" style="padding-left: 10px">
                            </span>
                                <span style="line-height: 50px; padding-right: 10px">点击查看详细情况</span>
                                <van-icon slot="right-icon" name="arrow" style="line-height: 50px"/>
                                <div slot="icon" style="height: 50px;width: 50px;">
                                <span class="svg-container">
                                    <svg class="icon" aria-hidden="true" style="height: 100%;width: 100%;">
                                        <use xlink:href="#icon-Diningtable"></use>
                                    </svg>
                                </span>
                                </div>
                            </van-cell>
                            <div v-show="cellDirection[index] == 1">
                                <van-row type="flex" justify="end">
                                    <van-col span="16">
                                        <van-cell-group>
                                            <van-cell title="预定时间">
                                                {{item.book_date}}
                                                <span v-show="item.book_time == 0">上午</span>
                                                <span v-show="item.book_time == 1">中午</span>
                                                <span v-show="item.book_time == 2">下午</span>
                                                <span v-show="item.book_time == 3">晚上</span>
                                            </van-cell>
                                            <van-cell is-link title="修改预定"
                                                      @click="changeBookTable(item.table, item.id)"></van-cell>
                                            <van-cell is-link title="删除预定"
                                                      @click="deleteBookTable()"></van-cell>
                                        </van-cell-group>
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
                    </van-list>
                </van-col>
            </van-row>
            <div style="padding-top: 20px">
                <van-row type="flex" justify="center">
                    <van-col span="22">
                        <van-button style="background-color: #fed76f;" size="large" round @click="goToChooseTable">
                            餐桌预定
                        </van-button>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "table",
        data() {
            return {
                isHaveBook: false,
                orderInfo: null,
                list: [],
                loading: false,
                finished: false,
                tableList: null,
                bookCount: 0,
                totalData: null,
                cellDirection: [],
                host: this.$store.state.host
            }
        },
        created() {
            this.$axios({
                method: 'get',
                url: this.host + "/tables/users",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('currentUser_token')
                }
            }).then(
                response => {
                    this.totalData = response.data;
                    this.tableList = this.totalData.results;
                    this.bookCount = this.totalData.count;
                    if (this.bookCount > 0)
                        this.isHaveBook = true;
                    for (let i = 0; i < this.bookCount; i++)
                        this.cellDirection[i] = 0;
                }
            )
        },
        methods: {
            onClickLeft() {
                this.$router.push({name: 'announcement'});
            },
            goToChooseTable() {
                this.$router.push({name: 'choosetable'})
            },
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 5; i++) {
                        this.list.push(1);
                    }
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= this.bookCount) {
                        this.finished = true;
                    }
                }, 500);
            },
            changeDirection(index) {
                if (this.cellDirection[index] === 0)
                    this.cellDirection.splice(index, 1, 1);
                else
                    this.cellDirection.splice(index, 1, 0);
            },
            changeBookTable(index,id) {
                this.$router.push({name: 'changebook', params: {id: index, recordId:id}})
            },
            deleteBookTable(){

            }
        }
    }
</script>

<style scoped>

</style>