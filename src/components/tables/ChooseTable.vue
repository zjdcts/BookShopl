<template>
    <div>
        <van-nav-bar
                title="餐桌预定情况"
                left-arrow
                @click-left="onClickLeft"
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
                        <van-cell is-link :arrow-direction="cellDirection[item.table_id-1]===0?'':'down'"
                                  @click="changeDirection(item.table_id-1)"
                        >
                            <span slot="title" style="padding-left: 20px; line-height: 50px">餐桌{{item.table_id}}</span>
                            <span slot="title" style="padding-left: 10px">
                                <van-tag color="#ffa631" text-color="white">
                                    <span v-if="item.table_category === 0">小号</span>
                                    <span v-else-if="item.table_category === 1">中号</span>
                                    <span v-else>大号</span>
                                </van-tag>
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
                        <div v-show="cellDirection[item.table_id-1] === 1">
                            <van-row type="flex" justify="end">
                                <van-col span="16">
                                    <van-cell-group>
                                        <van-cell is-link title="点此预定:)" @click="bookTable(item.table_id)"></van-cell>
                                        <van-cell title="已预定列表"></van-cell>
                                        <van-cell border v-for="(bookTimes,index2) in item.book_times" :key="index2"
                                                  :title="bookTimes.book_date+' '+getTime(bookTimes.book_time)"
                                                  style="font-family: 'Microsoft YaHei',serif;"
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
                tableList: this.$store.state.tableList,
                totalData: null,
                cellDirection: [],
                host: this.$store.state.host
            };
        },
        created() {
            for (let i = 0; i < this.$store.state.tableCount; i++)
                this.cellDirection[i] = 0;
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
                    if (this.list.length >= this.$store.state.tableCount) {
                        this.finished = true;
                    }
                }, 500);
            },
            onClickLeft() {
                this.$router.push({name: 'table'})
            },
            bookTable(index) {
                this.$router.push({name: 'booktable', params: {id: index}});
            },
            changeDirection(index) {
                if (this.cellDirection[index] === 0)
                    this.cellDirection.splice(index, 1, 1);
                else
                    this.cellDirection.splice(index, 1, 0);
            },
            getTime(index) {
                if (index === 1)
                    return '上午';
                else if (index === 2)
                    return '中午';
                else if (index === 3)
                    return '下午';
                else
                    return '晚上';
            }
        }
    }
</script>

<style scoped>

</style>