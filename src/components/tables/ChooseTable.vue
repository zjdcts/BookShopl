<template>
    <div>
        <van-nav-bar
                title="餐桌预定情况"
                left-arrow
                @click-left="onClickLeft"
                right-text="餐桌预定"
                @click-right="bookTable"
        />
        <van-row type="flex" justify="center">
            <van-col span="22">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div v-for="(item,index) in tableList" :key="index">
                        <van-cell is-link :arrow-direction="cellDirection[item.table_id-1]==0?'':'down'"
                                  @click="changeDirection(item.table_id-1)"
                        >
                            <span slot="title" style="padding-left: 20px; line-height: 50px">餐桌{{item.table_id}}</span>
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
                        <div v-show="cellDirection[item.table_id-1] == 1">
                            <van-row type="flex" justify="end">
                                <van-col span="16">
                                    <van-cell-group>
                                        <van-cell border v-for="(bookTimes,index2) in item.book_times" :key="index2"
                                                  :title="bookTimes.book_date+' '+getTime(bookTimes.book_time)"
                                                  style="font-family: 'Microsoft YaHei';"
                                        >
                                        </van-cell>
                                    </van-cell-group>
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                </van-list>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: "ChooseTable",
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                host: this.$store.state.host,
                tableList: null,
                tableCount: 0,
                totalData: null,
                cellDirection: []
            };
        },
        created() {
            this.$axios.get(this.host + "/tableList").then(
                response => {
                    this.totalData = response.data;
                    this.tableList = this.totalData.results;
                    this.tableCount = this.totalData.count;
                    for (var i = 0; i < this.tableCount; i++)
                        this.cellDirection[i] = 0;
                }
            )
        },
        computed: {},
        methods: {
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 5; i++) {
                        this.list.push(1);
                    }
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= this.tableCount) {
                        this.finished = true;
                    }
                }, 500);
            },
            onClickLeft() {
                this.$router.push({name: 'table'})
            },
            bookTable() {
                this.$router.push({name: 'booktable', params:{id:this.tableCount}});
            },
            changeDirection(index) {
                // eslint-disable-next-line no-console
                //console.log(index);
                if (this.cellDirection[index] == 0)
                    this.cellDirection.splice(index, 1, 1);
                else
                    this.cellDirection.splice(index, 1, 0);
                // eslint-disable-next-line no-console
                //console.log(this.cellDirection[index]);
            },
            getTime(index) {
                if (index == 1)
                    return '上午';
                else if (index == 2)
                    return '中午';
                else if (index == 3)
                    return '下午';
                else
                    return '晚上';
            }
        }
    }
</script>

<style scoped>

</style>