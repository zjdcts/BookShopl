<template>
    <div>
        <div>
            <van-nav-bar
                    left-arrow
                    border
                    @click-left="onClickLeft"
            />
            <div style="padding-top: 3rem">
                <van-row type="flex" justify="center">
                    <span style="font-family: 'Microsoft YaHei';font-size: xx-large">欢迎预定！</span>
                </van-row>
            </div>
            <div style="padding-top: 4rem; font-family: 'Microsoft YaHei'">
                <van-row type="flex" justify="center">
                    <van-col span="22">
                        <div>
                            <van-cell-group>
                                <van-field
                                        v-model="tableId"
                                        label="餐桌编号"
                                        size="large"
                                        @input="getTableId"
                                ></van-field>
                                <van-field
                                        v-model="bookDate"
                                        label="预定时间"
                                        size="large"
                                        @click="chooseTime"
                                ></van-field>
                                <van-popup v-model="show" position="bottom" @click-overlay="closePopUp">
                                    <van-datetime-picker
                                            v-model="currentDate"
                                            type="date"
                                            :min-date="minDate"
                                            :max-date="maxDate"
                                            @cancel="closePopUp"
                                            @change="getNowChoose"
                                            @confirm="confirmChoose"
                                    />
                                </van-popup>
                            </van-cell-group>
                        </div>
                        <div>
                            <van-col span="10">
                                <van-radio-group v-model="radio">
                                    <van-cell-group>
                                        <van-cell title="上午" clickable border @click="changeRadio('1')">
                                            <van-radio name="1"/>
                                        </van-cell>
                                        <van-cell title="中午" clickable border @click="changeRadio('2')">
                                            <van-radio name="2"/>
                                        </van-cell>
                                        <van-cell title="下午" clickable border @click="changeRadio('3')">
                                            <van-radio name="3"/>
                                        </van-cell>
                                        <van-cell title="晚上" clickable border @click="changeRadio('4')">
                                            <van-radio name="4"/>
                                        </van-cell>
                                    </van-cell-group>
                                </van-radio-group>
                            </van-col>
                        </div>
                        <div style="padding-top: 50px">
                            <van-button style="background-color: green; color: white" round size="large"
                                        @click="bookTable">确认
                            </van-button>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SubmmitBook",
        data() {
            return {
                tableId: '',
                show: false,
                currentDate: '',
                minDate: '',
                maxDate: '',
                bookDate: '',
                nowChoose: '',
                radio: '1',
                tableCount: 0
            }
        },
        created() {
            this.tableCount = this.$route.params.id;
            this.currentDate = new Date();
            this.minDate = new Date();
            this.maxDate = new Date(2021, 1, 1);
        },
        methods: {
            onClickLeft() {
                this.$router.push({name: 'choosetable'});
            },
            bookTable() {
                if (this.bookDate == '') {
                    this.$dialog.alert({
                        message: '请先选择日期'
                    })
                } else if (this.tableId == '') {
                    this.$dialog.alert({
                        message: '请先填写餐桌号'
                    })
                } else if (this.tableId.valueOf(Number) <= 0 || this.tableId.valueOf(Number) > this.tableCount) {
                    this.$dialog.alert({
                        message: '餐桌号不存在！'
                    })
                } else {
                    this.$router.push({name: 'table'});
                }
            },
            chooseTime() {
                this.show = true;
                this.nowChoose = ''
            },
            closePopUp() {
                this.show = false;
            },
            getNowChoose(picker) {
                // eslint-disable-next-line no-console
                //console.log(picker.getValues())
                var value = picker.getValues();
                this.nowChoose += value[0];
                for (var i = 1; i < value.length; i++)
                    this.nowChoose = this.nowChoose + '/' + value[i];
            },
            confirmChoose() {
                this.bookDate = this.nowChoose;
                this.show = false;
            },
            changeRadio(index) {
                this.radio = index;
            },
            getTableId(value) {
                this.tableId = value;
                // eslint-disable-next-line no-console
                console.log(this.tableId);
            }
        }
    }
</script>

<style scoped>

</style>