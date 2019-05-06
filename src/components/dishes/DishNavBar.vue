<template>
    <div>
        <van-tree-select
                :items="items"
                :main-active-index="mainActiveIndex"
                :active-id="activeId"
                @navclick="onNavClick"
                @itemclick="onItemClick"
        />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // 左侧高亮元素的index
                mainActiveIndex: 0,
                // 被选中元素的id
                activeId: 1,
                dishList: [{
                    // 导航名称
                    text: 'hotdish',
                    // 该导航下所有的可选项
                    children: [
                        {
                            // 名称
                            text: './picture/1.jpg',
                            // id，作为匹配选中状态的标识
                            id: 1,
                            image: '/home/cosmos/Projects/DindonFrontend/src/components/dishes/picture/1.jpg'
                            // 禁用选项
                        },
                        {
                            text: 'hongshaopaigu',
                            id: 2
                        }
                    ]
                },
                    {
                        // 导航名称
                        text: 'liangcai',
                        // 该导航下所有的可选项
                        children: [
                            {
                                // 名称
                                text: 'liangbanzhuerduo',
                                // id，作为匹配选中状态的标识
                                id: 1,
                                // 禁用选项
                            },
                            {
                                text: '杭州',
                                id: 2
                            }
                        ]
                    }]
            };
        },
        computed: {
            items() {
                return [{
                    text: this.dishList[0].text,
                    children: this.dishList[0].children
                },
                    {
                        text: this.dishList[1].text,
                        children: this.dishList[1].children
                    }]
            }
        },
        methods: {
            onNavClick(index) {
                this.mainActiveIndex = index;
            },
            onItemClick(data) {
                this.activeId = data.id;
            }
        }
    }
</script>

<style scoped>
</style>